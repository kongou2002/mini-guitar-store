import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { errorHelper } from 'utils/tools'
import { TextField } from '@material-ui/core'
const SearchBar = (props) => {

    const formik = useFormik({
        initialValues: { keywords: '' },
        validationSchema: Yup.object({
            keywords: Yup.string().min(3, 'you need to search more than 3 char').max(200, 'you need to search less than 200 char')
        }),
        onSubmit: (values, { resetForm }) => {
            props.handleKeywords(values.keywords)
            // console.log(values);
            resetForm();
        }
    })



    return (
        <div className="container">
            <form className="mt-3" onSubmit={formik.handleSubmit}>
                <div className="">
                    <TextField
                        style={{ width: '100%' }}
                        placeholder="search for something"
                        name="keywords"
                        variant="outlined"
                        {...formik.getFieldProps('keywords')}
                        {...errorHelper(formik, 'keywords')}
                    />
                </div>
            </form>
        </div>
    )
}

export default SearchBar
