import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import AuthForm from './authForm'
import PreventSignInRoute from 'hoc/preventSignInRoute'
const RegisterLogin = (props) => {
    const [formType, setFormType] = useState(false)

    const toggleFormType = () => {
        setFormType(!formType)
    }

    return (
        <PreventSignInRoute>
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left" >
                            {formType ?
                                <div>
                                    <h1>New custumers</h1>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quo nesciunt iste reiciendis, officia veniam quidem eius ipsum sapiente modi pariatur quia sunt voluptates impedit. Ut illum facere itaque sunt.</p>
                                </div>
                                : <div>
                                    <h1>Welcome back</h1>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quo nesciunt iste reiciendis, officia veniam quidem eius ipsum sapiente modi pariatur quia sunt voluptates impedit. Ut illum facere itaque sunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint tempore delectus libero optio eveniet facilis tenetur blanditiis est fugit autem magni ex, commodi nisi harum sunt itaque debitis excepturi dolores?.</p>
                                </div>}
                            <Button
                                variant="contained"
                                color="default"
                                size="small"
                                onClick={() => toggleFormType()}

                            >
                                {formType ? "Already registered" : "Let Register"}
                            </Button>
                        </div>
                        <div className="right">
                            <h2>{formType ? 'Register' : 'Sign in'}</h2>
                            <AuthForm
                                formType={formType}
                                {...props}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PreventSignInRoute>
    )
}

export default RegisterLogin
