import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment/moment"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
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
                console.log("SET TRUE")
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
            {userExists? <div className="alert alert-danger mt-3">Username Already Exists.</div> : ""}
            <h1 style={{'color':'#0070E0'}}> Create Account </h1>
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
                                <Button variant="secondary" type="submit" size="lg" className="homepage-signup-button mb-3 mt-3">
                                    Sign up
                                </Button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
            <Link to={'/login'} className="mb-2 pb-2"> Already Have an Account? Log In</Link>
            <div><br></br></div>
            </div>
        </div>
    )
}