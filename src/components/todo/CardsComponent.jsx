import { useState, useEffect } from "react"
import { useAuth } from "./security/AuthContext"
import { Button, Card, Table } from "react-bootstrap"
import { deleteCardApi, retrieveCardsForSetApi } from "./api/FlashcardApiService"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
function Cards() {
    const authContext = useAuth()
    const username = authContext.username
    const [allCards, setCards] = useState([])
    const [currCard, setCurrCard] = useState(0);

    const [side, setSide] = useState(true)
    const {setname, id} = useParams()
    const [studyMode, setStudyMode] = useState('view')
    const navigate = useNavigate()
    function getCards(username, id) {
        retrieveCardsForSetApi(username, id)
        .then(response => {
            console.log(response.data)
            setCards(response.data)
        })
        .catch(error => console.log(error))
    }

    function deleteCard(cardId) {
        deleteCardApi(username, cardId)
        .then(
            () => {
                // 1. display message
                // 2. update flashCardSets list
                getCards(username, id)
            }


        )
        .catch(error => console.log(error))
        console.log(id)
    }

    useEffect(() =>getCards(username, id), [])

    const decrementCard = () => {
        if (currCard == 0)
            setCurrCard(allCards.length-1)
        else{
            const newVal = currCard - 1
            setCurrCard(newVal)
        }
    }

    const incrementCard = () => {
        if (currCard == allCards.length-1)
            setCurrCard(0)
        else{
            const newVal = currCard + 1
            setCurrCard(newVal)
        }
    }

    if (studyMode == 'view')
        return (
            <div>
                <br></br>
                <h1>{setname}</h1>
                <br></br>
                <span style={{ 'width':'20px', 'backgroundColor':'orange', 'color':'white', 'padding':'10px', borderRadius:'5px', 'cursor':'pointer', 'margin':'5px', 'fontSize':'20px'}} onClick={()=>{navigate(`/card-form/-1/${setname}/${id}`)}}>Add Card</span>
                <span style={{ 'width':'20px', 'backgroundColor':'#8ca765', 'color':'white', 'padding':'10px', borderRadius:'5px', 'cursor':'pointer', 'margin':'5px', 'fontSize':'20px'}} onClick={()=>{setStudyMode('test')}}>Review Set</span>
                <br></br>
                <div style={{'display':'flex', 'flex-direction':'row', 'justifyContent':'center'}}>
                    <hr style={{'width':'75%', 'alignContent':'center'}}></hr>
                </div>
                <div style={{'display':'flex','justifyContent':'center'}}>
                    <Table striped bordered hover style={{"width":'80%', 'justifyContent':'center'}}>
                        <thead>
                            <tr>
                            <th></th>
                            <th></th>
                            <th>Word</th>
                            <th>Definition</th>
                            </tr>
                        </thead>
                        <tbody>
                        {allCards.map((card)=> (
                            <tr key={card.id}>
                                <td>
                                <Button variant="danger" onClick={(event)=>{deleteCard(card.id); event.stopPropagation();}}>&#10005;</Button>
                                </td>
                                <td>
                                <Button variant="info" style={{'color':'white'}} onClick={()=>{navigate(`/card-form/${card.id}/${setname}/${id}`)}}>&#9998;</Button>
                                </td>
                                <td style={{'fontSize':'20px'}}>{card.word}</td>
                                <td style={{'fontSize':'20px'}}>{card.definition}</td>
                            </tr>
                            ))}
                        </tbody>
                        </Table>
                    </div>    
    </div>
    )
    else
        return (
            <div>
                <br></br>
                <h1>Test Mode</h1>
                <div style={{'display':'flex', 'flexDirection':'row', 'justifyContent':'center', 'alignItems':'center', 'paddingTop':'100px'}}>
                    <span style={{'fontSize':'40px', 'cursor':'pointer'}} onClick={decrementCard}> &#x3c; </span>
                    <Card className="custom-card" onClick={()=>{setSide(!side)}} style={{'minHeight':'250px'}}>
                        <h9>{currCard+1}/{allCards.length}</h9>
                        <Card.Body>
                            <Card.Title><br></br></Card.Title>
                            {side ? 
                            <Card.Text style={{paddingTop:'0px', 'fontSize':'40px'}}>{allCards[currCard].word}</Card.Text>
                            :
                            <Card.Text style={{paddingTop:'0px', 'fontSize':'40px'}}>{allCards[currCard].definition}</Card.Text>
                            }   
                        </Card.Body>
                    </Card>
                    <span style={{'fontSize':'40px', 'cursor':'pointer'}}  onClick={incrementCard}> &#x3e; </span>


                    {/* <Card className="custom-card" key={card.id}>
                        <Card.Body>
                            <Card.Title><br></br></Card.Title>
                            <Card.Text className="card-title" style={{paddingTop:'0px'}}>{card.definition}</Card.Text>
                        </Card.Body>
                    </Card> */}

                </div>

                <br></br>
                <div>
                    <h6 className="text-secondary">Click the card to see the definition. Go to next or previous card with arrows.</h6>
                    <Button variant="warning m-2" onClick={()=>{setStudyMode('view'); setCurrCard(0)}}>Exit</Button>
                </div>
            </div>
        )
}

export default Cards