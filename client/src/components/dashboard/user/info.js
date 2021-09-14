import React from 'react'
import DashboardLayout from 'hoc/dashboardLayout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, Button } from '@material-ui/core'
import { errorHelper } from 'utils/tools'
import { useDispatch } from 'react-redux'
import { userUpdateProfile } from 'store/actions/user.action'
import EmailStepper from './stepper'
const UserInfo = ({ users }) => {

    const dispatch = useDispatch()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: users.data.firstName,
            lastName: users.data.lastName,
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .min(1, '1 char min')
                .max(30, '30 chars max')
                .required('Sorry, you need the firstname'),
            lastName: Yup.string()
                .min(1, '1 char min')
                .max(30, '30 chars max')
                .required('Sorry, you need the lastname')
        }),
        onSubmit: (values) => {
            dispatch(userUpdateProfile(values));
        }
    })


    return (
        <DashboardLayout title="User information">
            <form
                className="mt-3 article_form"
                style={{ maxWidth: '250px' }}
                onSubmit={formik.handleSubmit}
            >
                <div className="form-group">
                    <TextField
                        style={{ width: '100%' }}
                        name="firstname"
                        label="Enter your first name"
                        {...formik.getFieldProps('firstName')}
                        {...errorHelper(formik, 'firstname')}
                    />
                </div>
                <div className="form-group mt-3">
                    <TextField
                        style={{ width: '100%' }}
                        name="lastname"
                        label="Enter your last name"
                        {...formik.getFieldProps('lastName')}
                        {...errorHelper(formik, 'lastname')}
                    />
                </div>
                <Button
                    className="mt-4"
                    color="primary"
                    type="submit"
                    variant="contained"
                >
                    Edit profile
                </Button>
            </form>
            <hr />
            <div>
                <EmailStepper users={users} />
            </div>
        </DashboardLayout>
    )
}

export default UserInfo
