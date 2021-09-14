import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Loader from 'utils/loader'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import { errorHelper } from 'utils/tools'
import { userRegister, userLogin } from 'store/actions/user.action'

const AuthForm = (props) => {
    const notifications = useSelector((state) => state.notifications)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: { email: 'licktenk2002@gmail.com', password: '12345678' },
        validationSchema: Yup.object({
            email: Yup.string().required('Sorry the email is required').email('this is an invalid email'),
            password: Yup.string().required('Sorry the password is required')
        }),
        onSubmit: (values) => {
            setLoading(true)
            handleSubmit(values)
        }
    })
    const handleSubmit = (values) => {
        if (props.formType) {
            // register
            dispatch(userRegister(values))
        } else {
            // sign in 
            dispatch(userLogin(values))
        }
    }
    useEffect(() => {

        if (notifications && notifications.success) {
            // prop nay tu cai prop cua index -> authForm -> vo
            props.history.push('/dashboard')
        } else {
            setLoading(false)
        }
    }, [notifications, props.history])
    return (
        <>
            <div className="auth_container">
                {loading ?

                    <Loader />
                    :
                    <form
                        className="mt-3"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="form-group mt-3">
                            <TextField
                                style={{ width: '100%' }}
                                name="email"
                                label="Enter your email"
                                // variant="outlined"  
                                {...formik.getFieldProps('email')}
                                {...errorHelper(formik, 'email')}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <TextField

                                style={{ width: '100%' }}
                                name="password"
                                label="Enter your password"
                                // variant="outlined"  
                                type="password"
                                {...formik.getFieldProps('password')}
                                {...errorHelper(formik, 'password')}
                            />
                        </div>
                        <Button
                            className="mt-3"
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="medium"
                        >
                            {props.formType ? 'Register' : 'Login'}
                        </Button>
                    </form>
                }
            </div>
        </>
    )
}

export default AuthForm