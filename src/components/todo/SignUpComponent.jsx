import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment/moment"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./security/AuthContext"
import { signUpService } from "./api/AuthenticationApiService"

export default function SignUpComponent() {
    const {id, setName, setId} = useParams()
    const [username, setUsername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [userExists, setUserExists] = useState(false)
    const navigate = useNavigate()

    function onSubmit(values) {
        setUserExists(false)
        setPassword1(values.password1)
        setPassword2(values.password2)
        signUpService(values.username, values.password1)
        .then(response=> {
            // user successfully stored in db.
            // redirect to login page (add message some how)
            console.log('a', response)
            navigate('/login')
        })
        .catch(error =>{
            if (error.response && error.response.status === 409){
                setUsername('')
                setUserExists(true)
            }
        } )
    }
    function validate(values) {
        setUserExists(false)
        let errors = {}
        if (values.username.length < 3) {
            errors.username = 'Username must be at least 3 characters.'
        }
        else if (values.password1 != values.password2) {
            errors.password1 = 'Passwords Must Be Equal'
        }
        else if (values.password1.length < 6) {
            errors.password1 = 'Password must be at least 6 characters.'
        }
        console.log(values)
        return errors
    }
    return (
        <div style={{'display':'flex', 'flexDirection':'column', 'alignItems':'center'}}>
            {/* if the user exists in db then inform them to change username. */}
            {userExists? <div className="alert alert-danger">Username Already Exists.</div> : ""}
            <h1>Sign Up</h1>
            <div>
            <Formik initialValues={{username, password1, password2}}
            enableReinitialize={true}
            onSubmit = {onSubmit}
            validate={validate}
            validateOnChange={false}
            validateOnBlur={false}
            >
                {
                    (props) =>(
                        <Form>
                            <ErrorMessage
                            name="username"
                            component="div"
                            className="alert alert-danger"
                            />
                            <ErrorMessage
                            name="password1"
                            component="div"
                            className="alert alert-danger"
                            />
                            <ErrorMessage
                            name="password2"
                            component="div"
                            className="alert alert-danger"
                            />
                            <fieldset className="form-group">
                                <label>username</label>
                                <Field type="text" className="form-control" name="username"/>
                            </fieldset>

                            <fieldset className="form-group">
                                <label>password</label>
                                <Field type="password" className="form-control" name="password1"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>re-enter password</label>
                                <Field type="password" className="form-control" name="password2"/>
                            </fieldset>
                            <div>
                                <Button type="submit" className="m-4 p-2">Create User</Button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
            </div>
        </div>
    )
}