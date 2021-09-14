import React, {useEffect} from 'react'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from 'utils/tools';
import {useSelector, useDispatch} from 'react-redux'
import {clearNotification} from 'store/actions/index'
const MainLayout = (props) => {

    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch()
    useEffect(() =>{
        if (notifications && notifications.error) {
            const msg = notifications.message ? notifications.message : 'Error'
            showToast('error', msg)
            dispatch(clearNotification())
        }
        if (notifications && notifications.success) {
            const msg = notifications.message ? notifications.message : 'Good job !!!'
            showToast('success', msg)
            dispatch(clearNotification())
        }
    }, [notifications, dispatch])

    return (
        <div>
            {props.children}
            <ToastContainer />
        </div>
    )
}

export default MainLayout
