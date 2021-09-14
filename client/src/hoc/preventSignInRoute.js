// kick user ra khoi trang login khi ma no da login
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
const PreventSignInRoute = (props) => {

    const users = useSelector(state => state.users)



    return (
        <div>
            {
                users.auth ?
                    <Redirect to="/dashboard" />
                    : props.children
            }
        </div>
    )
}

export default PreventSignInRoute
