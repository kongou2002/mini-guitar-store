import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { getTokenCookie } from 'utils/tools'
import Loader from 'utils/loader'
const PicUpload = ({ picValue }) => {
    const [loading, setLoading] = useState(false);
    const formikImage = useFormik({
        initialValues: {
            pic: ''
        },
        validationSchema: Yup.object({
            pic: Yup.mixed().required('A file is required')
        }),
        onSubmit: (values) => {
            setLoading(true)
            console.log(values)
            let formData = new FormData()
            formData.append("file", values.pic)
            axios.post(`/api/products/upload`, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${getTokenCookie()}`
                }
            }).then(response => {
                //response.data
                console.log(response.data);
                picValue(response.data)
            }).catch(error => {
                alert(error.message)
            }).finally(() => {
                setLoading(false)
            })
        }
    })
    return (
        <>
            {loading ?
                <Loader />
                :
                <Form onSubmit={formikImage.handleSubmit}>
                    <Form.Group>
                        <Form.Control type="file" id="file"
                            size="sm"
                            name="file"
                            onChange={(event) => {
                                formikImage.setFieldValue("pic", event.target.files[0])
                            }} />
                        {
                            formikImage.errors.pic && formikImage.touched.pic ?
                                <div>Error</div>
                                : null
                        }
                    </Form.Group>
                    <Button variant="secondary" type="submit">Add img</Button>
                </Form>
            }
        </>
    )
}

export default PicUpload;

