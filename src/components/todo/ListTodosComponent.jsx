import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteTodoApi, retrieveAllTodosForUsernameApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
export function formatDate(date) {
    const year = date[0]
    const month = parseInt(date[1]) < 10 ? ('0'+date[1]) : date[1]
    const day = parseInt(date[2]) < 10 ? ('0'+date[2]) : date[2]
    return (year+'-'+month+'-'+day)
}
function ListTodosComponent() {
    const today = new Date();
    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay());
    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null) 

    useEffect(
        () => refreshTodos(), []
    )
    function refreshTodos() {
        retrieveAllTodosForUsernameApi(username)
            .then(response => {
                console.log(response)
                setTodos(response.data)
            })
            .catch(error => console.log(error))
    }

    function deleteTodo(id) {
        deleteTodoApi(username, id)
        .then(
            () => {
                // 1. display message
                // 2. update todos list
                setMessage(`Deletion of todo with id: ${id}`)
                refreshTodos()
            }


        )
        .catch(error => console.log(error))
        console.log(id)
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`)
    }
    function addNewTodo() {
        navigate(`/todo/-1`)
    }
    return (
        <Container>
            <h1>Things you want to do.</h1>
            <hr></hr>
                {message && <div className="alert alert-warning">{message}</div>}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Description</th>
                        <th>Target Date</th>
                        <th>Delete</th>
                        <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                    {todos.map((todo)=>{
                        return (
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{formatDate(todo.targetDate)}</td>
                                <td><Button className="btn-danger" onClick={()=>{deleteTodo(todo.id)}}>&#x2715;</Button></td>
                                <td><Button className="btn-primary" onClick={()=>{updateTodo(todo.id)}}><span style={{fontSize:'18px'}}>&#9998;</span></Button></td>
                            </tr>
                        )
                    }
                    )
                }
      </tbody>
    </Table>
    <Button className="button-primary m-3" onClick={addNewTodo}>Add Todo</Button>
    </Container>
    )
}

export default ListTodosComponent;