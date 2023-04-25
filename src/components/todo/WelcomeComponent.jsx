import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { retrieveHelloWorldBean, retrieveHelloWorldPath, retrieveHelloWorldPathVariable } from "./api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";
import {Container, Card, Col, Row} from "react-bootstrap";
function WelcomeComponent() {
    const authContext = useAuth()
    const token = authContext.token
    const navigate = useNavigate()
    return (
        
        <div className="homepage">
        <Container className="homepage-content">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              {(token == null) ? (<h1 className="homepage-title mb-5">Welcome to StudyMate!</h1>) :(<h1 className="homepage-title mb-5">You're logged in and ready to start</h1>) }
              <div className="homepage-button-group">
                {(token == null) ? 
                (
                <div>
                <p className="homepage-description mb-5">
                Keep track of your tasks, create flashcards, and never miss a deadline again. Sign up or log in to start using the app today.
                </p>
                    <Button variant="primary" size="lg" className="homepage-login-button mb-5" onClick={()=>{navigate("/login")}}>
                        Log in
                    </Button>
                    <Button variant="secondary" size="lg" className="homepage-signup-button mb-5">
                        Sign up
                    </Button>
                </div>
                )
                :
                (
            <div className="homepage-button-group">
                <div class="card custom-cards" onClick={() =>{navigate("/flashcards")}}>
            <div class="card-header">
                Flashcards
            </div>
            <div class="card-body">
                <h5 class="card-title">Study your flashcards or create new ones.</h5>
            </div>
            </div>

            <div class="card custom-cards" onClick={() =>{navigate("/todos")}}>
            <div class="card-header">
                Todos
            </div>
            <div class="card-body">
                <h5 class="card-title">Create todos or view your deadlines</h5>
            </div>
            </div>
                </div>
                )
                }
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
}

export default WelcomeComponent;