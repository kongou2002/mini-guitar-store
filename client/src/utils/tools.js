import React from 'react'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import cookie from 'react-cookies'
export const WavesButton = (props) => {
    let template = ''
    switch (props.type) {
        case "default":
            template = <Link
                className={!props.altClass ? 'link_default' : props.altClass}
                to={props.linkTo}
                style={{
                    ...props.style
                }}
            >{props.title}</Link>
            break;
        case "bag_link":
            template = <div className="bag_link"
                onClick={() => {
                    props.runAction()
                }}
                style={{ ...props.style }}
            >
                <AddShoppingCartIcon
                    style={{ fontSize: props.iconSize }}
                />
            </div>
            break;
        case "add_to_cart_link":
            template = 
                <div className="add_to_cart_link"
                    onClick={()=>{
                            props.runAction()
                    }}
                >
                    <AddShoppingCartIcon/>
                    Add to cart
                </div>
        break;
        default:
            template = ''
    }
    return template
}

export const renderCardImage = (img) => {
    if (img.length > 0) {
        return img[0]
    } else {
        return 'images/image_not_availble.png'
    }
}

export const showToast = (type, message) => {
    switch (type) {
        case 'success':
            toast.success(message, {
                position: toast.POSITION.BOTTOM_LEFT
            })
            break;
        case 'error':
            toast.error(message, {
                position: toast.POSITION.BOTTOM_LEFT
            })
            break;
        default:
            return false;
    }
}
export const errorHelper = (formik, value) => {
    return {
        error: formik.errors[value] && formik.touched[value] ? true : false,
        helperText: formik.errors[value] && formik.touched[value] ? formik.errors[value] : null
    }
}

export const getTokenCookie = () => cookie.load('x-access-token')
export const removeTokenCookie = () => cookie.remove('x-access-token', { path: '/' })
export const getAuthHeader = () => {
    return { headers: { 'Authorization': `Bearer ${getTokenCookie()}` } }
}