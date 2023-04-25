import { useEffect, useState } from "react"
import { deleteCardSetApi, retrieveAllCardSetsForUsernameApi, retrieveCardsForSetApi } from "./api/FlashcardApiService"
import { useAuth } from "./security/AuthContext"
import { Button, Card, FormControl, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function FlashcardComponent() {
    const authContext = useAuth()
    const username = authContext.username
    const [cardSets, setFlashCardSets] = useState([])
    const navigate = useNavigate()
    useEffect(
        () => refreshFlashcards(), []
    )
    function refreshFlashcards() {
        console.log('REQUEST')
        retrieveAllCardSetsForUsernameApi(username)
            .then(response => {
                console.log(response)
                setFlashCardSets(response.data)
            })
            .catch(error => console.log(error))
    }
    
    function retrieveAllCards(id, setname){
        navigate(`/flashcards/${setname}/${id}`)
    }


    function deleteflashCardSet(id) {
        deleteCardSetApi(username, id)
        .then(
            () => {
                // 1. display message
                // 2. update flashCardSets list
                refreshFlashcards()
            }


        )
        .catch(error => console.log(error))
        console.log(id)
    }
    return (
        <div>
            <h3 className="flashcard-title mb-5">Your Card Sets</h3>
            <div style={{'display':'flex', 'flexDirection':'row', 'justifyContent':'center'}}>
                <InputGroup className="mb-3" style={{"width":'20%'}}>
                <FormControl placeholder="Search..." aria-label="Search..." />
                <Button variant="outline-secondary" id="button-addon2">
                    Search
                </Button>
                </InputGroup> 
            </div>
            <Button style={{'display':'inline', 'height':'38px', 'margin':'3px'}} onClick={()=>{ navigate("/cardset-form/-1")}}>Add Set +</Button>

            <div className="cardset-container">
            {cardSets.map((flashCardSet)=>{
                return (
                //     <Card className="custom-card" key={flashCardSet.id} onClick={() => {retrieveAllCards(flashCardSet.id, flashCardSet.setName)}}>
                //     <Card.Body>
                //       <Card.Title className="card-title" style={{paddingTop:'0px'}}>{flashCardSet.setName}</Card.Title>
                //       <Card.Text className="card-text">{flashCardSet.setDescription}</Card.Text>
                //       {/* <td><Button className="btn-danger" onClick={()=>{deleteflashCardSet(flashCardSet.id)}}>&#x2715;</Button></td> */}
                //     {/* <td><Button className="btn-primary" onClick={()=>{updateflashCardSet(flashCardSet.id)}}><span style={{fontSize:'20px'}}>&#x27F3;</span></Button></td> */}
                //     </Card.Body>
                //   </Card>


            <Card className="custom-card" key={flashCardSet.id} onClick={() => {retrieveAllCards(flashCardSet.id, flashCardSet.setName)}}>
            <Card.Header className="custom-header">
            <div className="d-flex justify-content-between">
                <Button variant="outline-danger" size="lg" onClick={(event)=>{deleteflashCardSet(flashCardSet.id); event.stopPropagation();}} style={{'borderRadius':'100%'}}>
                &#10005;
                </Button>
                <Button variant="outline-dark" size="lg" onClick={(event)=>{navigate(`/cardset-form/${flashCardSet.id}`); event.stopPropagation();}} style={{'borderRadius':'100%'}}>
                &#9998;
                </Button>
            </div>
            </Card.Header>
            <Card.Body>
            <Card.Title>{flashCardSet.setName}</Card.Title>
            <Card.Text>{flashCardSet.setDescription}</Card.Text>
            </Card.Body>
            </Card> 
                )
            }
                
            )

        }
        </div>

        </div>
    )
 }
