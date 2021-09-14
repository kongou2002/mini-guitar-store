import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { errorHelper } from 'utils/tools'
import Loader from 'utils/loader'
import { userChangeEmail } from 'store/actions/user.action'
import Modal from 'react-bootstrap/Modal'
import {
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
} from '@material-ui/core'
const EmailStepper = ({ users }) => {
    const [loading, setLoading] = useState(false)
    const [emailModal, setEmailModal] = useState(false)
    const notifications = useSelector((state) => state.notifications)
    const dispatch = useDispatch()
    const [activeStep, setActiveStep] = useState(0)
    const steps = ['Enter old email', 'Enter new email', 'Are you sure ?']
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: '',
            newEmail: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('This is required').email('this is not a valid email').test('match', 'Please check your email', (email) => { return email === users.data.email }),
            newEmail: Yup.string().required('This is required').email('this is not a valid email').test('match', 'Please check your email', (newEmail) => { return newEmail !== users.data.email }),
        }),
        onSubmit: (values) => {
            setLoading(true);
            dispatch(userChangeEmail(values));
        }
    })
    const closeModal = () => setEmailModal(false)

    const openModal = () => setEmailModal(true)

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1)
    }
    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1)
    }
    const nextBtn = () => (
        <Button className="mt-3" style={{ marginRight: '0.5rem' }} variant="contained" color="primary" onClick={handleNext}>
            Next
        </Button>
    )
    const backBtn = () => (
        <Button className="mt-3 ml-2" variant="contained" onClick={handleBack}>
            Back
        </Button>
    )

    useEffect(() => {
        if (notifications && notifications.success) {
            closeModal()
        }
        setLoading(false)
    }, [notifications])

    return (
        <>
            <form className="mt-3 article_form" style={{ maxWidth: '250px' }}>
                <div className="form-group">
                    <TextField
                        name="emailstatics"
                        variant="outlined"
                        // label="Enter your last mail"
                        value={users.data.email}
                        disabled
                    />
                </div>
                <Button
                    className="mt-3"
                    variant="contained"
                    color="primary"
                    onClick={openModal}
                >
                    Edit email
                </Button>
            </form>
            <Modal size="lg" centered show={emailModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update your email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            return (
                                <Step key={index}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>
                    <form className="mt-3 stepper_form" onSubmit={formik.handleSubmit}>
                        {activeStep === 0 ?
                            <div className="form-group">
                                <TextField
                                    name="email"
                                    label="Enter your current mail"
                                    {...formik.getFieldProps('email')}
                                    {...errorHelper(formik, 'email')}
                                />
                                {formik.values.email && !formik.errors.email ?
                                    nextBtn()
                                    : null
                                }
                            </div>

                            : null}
                        {activeStep === 1 ?
                            <div className="form-group">
                                <TextField
                                    name="newEmail"
                                    label="Enter your new mail"
                                    {...formik.getFieldProps('newEmail')}
                                    {...errorHelper(formik, 'newEmail')}
                                />
                                {formik.values.newEmail && !formik.errors.newEmail ?
                                    nextBtn()
                                    : null
                                }
                                {backBtn()}
                            </div>

                            : null}
                        {activeStep === 2 ?
                            <div className="form-group">
                                {
                                    loading ?
                                        <Loader />
                                        : <Button className="mt-3" variant="contained" color="primary" onClick={formik.submitForm}
                                            style={{ marginRight: '0.5rem' }}
                                        >
                                            Edit mail
                                        </Button>
                                }
                                {backBtn()}
                            </div>
                            : null}
                    </form>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default EmailStepper
