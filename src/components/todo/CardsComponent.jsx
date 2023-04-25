import { useState, useEffect } from "react"
import { useAuth } from "./security/AuthContext"
import { Button, Card } from "react-bootstrap"
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
            <span style={{ 'width':'20px', 'backgroundColor':'purple', 'color':'white', 'padding':'10px', borderRadius:'5px'}} onClick={()=>{navigate(`/card-form/-1/${setname}/${id}`)}}>Add Card</span>
            <div style={{'display':'flex', 'flex-direction':'row', 'justifyContent':'center'}}>
                <hr style={{'width':'75%', 'alignContent':'center'}}></hr>
            </div>

        {allCards.map((card)=>{
            
            return (
                // card id is here and can be used for crud operations on card.
            <div key={card.id}>
                <div style={{'display':'flex', 'flex-direction':'row', 'justifyContent':'center', 'minHeight':'200px'}}>

                    <Card className="custom-card2 edit-card" style={{'width':'fitContent'}}>
                        <Card.Body style={{"color": "black !important"}}>
                            <div style={{'fontSize':'30px'}} id="x-button" onClick={(event)=>{deleteCard(card.id); event.stopPropagation();}}>&#10005;</div>
                            <hr></hr>
                            <div style={{'fontSize':'30px'}} id="edit-button">&#9998;</div>
                        </Card.Body>
                    </Card>

                    <Card className="custom-card">
                        <Card.Body>
                            <Card.Title className="card-title" style={{paddingTop:'0px'}}>{card.word}</Card.Title>
                            {/* <td><Button className="btn-danger" onClick={()=>{deleteflashCardSet(flashCardSet.id)}}>&#x2715;</Button></td> */}
                            {/* <td><Button className="btn-primary" onClick={()=>{updateflashCardSet(flashCardSet.id)}}><span style={{fontSize:'20px'}}>&#x27F3;</span></Button></td> */}
                        </Card.Body>
                    </Card>

                    <Card className="custom-card" key={card.id}>
                        <Card.Body>
                            <Card.Title className="card-title" style={{paddingTop:'0px'}}>{card.definition}</Card.Title>
                            {/* <td><Button className="btn-danger" onClick={()=>{deleteflashCardSet(flashCardSet.id)}}>&#x2715;</Button></td> */}
                            {/* <td><Button className="btn-primary" onClick={()=>{updateflashCardSet(flashCardSet.id)}}><span style={{fontSize:'20px'}}>&#x27F3;</span></Button></td> */}
                        </Card.Body>
                    </Card>

                </div>
                <div style={{'display':'flex', 'flex-direction':'row', 'justifyContent':'center'}}>
                    <hr style={{'width':'75%', 'alignContent':'center'}}></hr>
                </div>
            </div>
        // <Card className="custom-card" key={flashCardSet.id} onClick={() => {retrieveAllCards(flashCardSet.id, flashCardSet.setName)}}>
        // <Card.Header className="custom-header">
        // <div className="d-flex justify-content-between">
        //     <Button variant="outline-danger" size="m" onClick={(event)=>{deleteflashCardSet(flashCardSet.id); event.stopPropagation();}}>
        //     &#10006;
        //     </Button>
        //     <Button variant="outline-dark" size="lg" onClick={(event)=>{navigate(`/cardset-form/${flashCardSet.id}`); event.stopPropagation();}}>
        //     &#9998;
        //     </Button>
        // </div>
        // </Card.Header>
        // <Card.Body>
        // <Card.Title>{flashCardSet.setName}</Card.Title>
        // <Card.Text>{flashCardSet.setDescription}</Card.Text>
        // </Card.Body>
        // </Card> 
            )
        }
            
        )

    }
    </div>
    )
}

export default Cards