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
    return (
        <div>
            <br></br>
            <h1>{setname}</h1>
            <br></br>
            <span style={{ 'width':'20px', 'backgroundColor':'orange', 'color':'white', 'padding':'10px', borderRadius:'5px', 'cursor':'pointer', 'margin':'5px', 'fontSize':'20px'}} onClick={()=>{navigate(`/card-form/-1/${setname}/${id}`)}}>Add Card</span>
            <span style={{ 'width':'20px', 'backgroundColor':'#8ca765', 'color':'white', 'padding':'10px', borderRadius:'5px', 'cursor':'pointer', 'margin':'5px', 'fontSize':'20px'}}>Review Set</span>
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

            {/* <div style={{'display':'flex', 'flex-direction':'row', 'justifyContent':'center', 'minHeight':'200px'}}>

                    <Card className="custom-card3 edit-card" style={{'width':'fitContent', 'height':'200px'}}>
                        <Card.Body style={{"color": "black !important"}}>
                            <div style={{'fontSize':'30px'}} id="x-button" onClick={(event)=>{deleteCard(card.id); event.stopPropagation();}}>&#10005;</div>
                            <hr></hr>
                            <div style={{'fontSize':'30px'}} id="edit-button">&#9998;</div>
                        </Card.Body>
                    </Card>

                    <Card className="custom-card">
                        <Card.Body>
                            <Card.Title><br></br></Card.Title>
                            <Card.Text className="card-title" style={{paddingTop:'0px'}}>{card.word}</Card.Text>
                            </Card.Body>
                            </Card>
        
                            <Card className="custom-card" key={card.id}>
                                <Card.Body>
                                    <Card.Title><br></br></Card.Title>
                                    <Card.Text className="card-title" style={{paddingTop:'0px'}}>{card.definition}</Card.Text>
                                </Card.Body>
                            </Card>
        
                        </div>
                        <div style={{'display':'flex', 'flex-direction':'row', 'justifyContent':'center'}}>
                            <hr style={{'width':'75%', 'alignContent':'center'}}></hr>
                        </div>  */}
            
    </div>
    )
}

export default Cards