import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { retrieveHelloWorldBean, retrieveHelloWorldPath, retrieveHelloWorldPathVariable } from "./api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";
import {Container, Card, Col, Row} from "react-bootstrap";
import SignUpComponent from "./SignUpComponent";
function WelcomeComponent() {
    const authContext = useAuth()
    const token = authContext.token
    const username = authContext.username
    const navigate = useNavigate()
    return (
        // if user is not logged in then display the cards and the sign up tab in columns
        <div className="homepage">
              {(token == null) ? (<h1 className="homepage-title mb-5">Study</h1>) : (<h1 className="homepage-title mb-5 mt-3">Hello, {username}</h1>) }
        <Container>
          {(token == null) ? 
            (
          <Row className="justify-content-center" style={{'height':'40%'}}>
            
            <Col>
              <div className="homepage-button-group">
                
            <div>
                <div style={{'backgroundColor':'#eeeeee ', 'paddingTop':'10px', 'borderRadius':'10px'}}>
                    <h2 style={{'color':'#4255ff'}}>Flash Cards</h2>
                    <p className="homepage-description mb-5 pb-3">
                        Create flash cards to help you review and study for your exams.
                    </p>
                </div>

                <div style={{'backgroundColor':'#eeeeee', 'paddingTop':'10px', 'borderRadius':'10px'}}>
                
                <h2 style={{'color':'#4255ff'}}>Tasks</h2>
                <p className="homepage-description mb-5 pb-3">
                    Keep track of your deadlines by creating todos.
                </p>
                </div>
                    {/* <Button variant="primary" size="lg" className="homepage-login-button mb-5" onClick={()=>{navigate("/login")}}>
                        Log in
                    </Button>
                    <Button variant="secondary" size="lg" className="homepage-signup-button mb-5">
                        Sign up
                    </Button> */}
                </div>
            </div>
            </Col>

            <Col>
                
                <div style={{'backgroundColor':'#EAEFF2', 'borderRadius':'10px', 'maxWidth':'500px'}}>
                    <SignUpComponent/>
                </div>
            </Col>
            </Row>
            )

            :
                        // if the user is logged in then we want to show the card links
                        // to the todos/flashcards and also add in the + button so that
                        // they can add new ones.
            (
            <Row className="justify-content-center" style={{'height':'40%'}}>
                <Col>
                <div style={{'backgroundColor':'#eeeeee ', 'paddingTop':'10px', 'borderRadius':'10px'}} className="front-card" onClick={()=>{navigate("/flashcards")}}>
                <h2 style={{'color':'#4255ff'}}>Flash Cards</h2>
                <p className="homepage-description mb-2 pb-3">
                    Click the card to go to your flash cards. Click the plus to add a new set.
                </p>
                <p className="p-button">
                    <div className="circular-button mb-2" onClick={(event)=>{navigate("/cardset-form/-1"); event.stopPropagation();}}> + </div> 
                </p>
                </div>
                </Col>

                <Col>  

                <div style={{'backgroundColor':'#eeeeee', 'paddingTop':'10px', 'borderRadius':'10px'}} className="front-card" onClick={()=>{navigate("/todos")}}>
                
                <h2 style={{'color':'#4255ff'}}>Tasks</h2>
                <p className="homepage-description mb-2 pb-3">
                    Click the card to go to your todos page. Click the plus below to create new todo.
                </p>
                <p className="p-button">
                    <div className="circular-button mb-2" onClick={(event)=>{navigate("/todo/-1"); event.stopPropagation();}}> + </div> 
                </p>
                </div>

                </Col>
                {/* <Button variant="primary" size="lg" className="homepage-login-button mb-5" onClick={()=>{navigate("/login")}}>
                    Log in
                </Button>
                <Button variant="secondary" size="lg" className="homepage-signup-button mb-5">
                    Sign up
                </Button> */}
            </Row>
            )    }
            
        </Container>
      </div>
    )
}

export default WelcomeComponent;