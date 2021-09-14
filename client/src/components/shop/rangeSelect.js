import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { errorHelper } from 'utils/tools'
import { TextField } from '@material-ui/core'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import {
    List,
    ListItem,
    ListItemText,
    Button,
    Collapse
} from '@material-ui/core';
const RangeSelect = (props) => {
    const [open, setOpen] = useState(props.initState)
    const formik = useFormik({
        initialValues: { min: 0, max: 5000 },
        validationSchema: Yup.object({
            min: Yup.number().min(0, 'the minimum is 0').max(5000, 'the maximum is 5000')
        }),
        onSubmit: (values) => {
            props.handleRange([values.min, values.max])
        }
    })
    const handleCollapseOpen = () => {
        setOpen(!open);
    }


    return (
        <div className="collapse_items_wrapper">
            <List>
                <ListItem onClick={handleCollapseOpen}>
                    <ListItemText
                        primary={props.title}
                        className="collapse_title"
                    />
                    {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}

                </ListItem>
                <Collapse
                    in={open}
                    timeout="auto"
                >
                    <List component="div" disablePadding>
                        <form className="mt-3" onSubmit={formik.handleSubmit}>
                            <div className="">
                                <TextField
                                    style={{ width: '100%' }}
                                    placeholder="search for something"
                                    name="min"
                                    type="number"
                                    // variant="outlined"
                                    {...formik.getFieldProps('min')}
                                    {...errorHelper(formik, 'min')}
                                />
                            </div>
                            <br />
                            <div className="">
                                <TextField
                                    style={{ width: '100%' }}
                                    placeholder="search for something"
                                    name="max"
                                    type="number"
                                    // variant="outlined"
                                    {...formik.getFieldProps('max')}
                                    {...errorHelper(formik, 'max')}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="mt-3"
                                variant="outlined"
                                color="secondary"
                                size="small"
                            >
                                Search
                            </Button>
                        </form>

                    </List>
                </Collapse>

            </List>
        </div>
    )
}

export default RangeSelect
