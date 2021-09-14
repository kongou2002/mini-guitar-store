import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Loader from 'utils/loader'


export default function authGuard(ComposedComponent) {
    const AuthenticationCheck = (props) => {
        const [isAuth, setIsAuth] = useState(false)
        const users = useSelector(state => state.users)
        useEffect(() => {
            if (!users.auth) {
                // kick user
                props.history.push('/')
            } else {
                setIsAuth(true)
            }
        }, [props, users])
        if (!isAuth) {
            return <Loader full={true} />
        } else {
            //làm như v để khi trang load user sẽ được truyền vào, khỏi mắc công mà gọi redux ra để lấy user nen moi xai users={users}
            return <ComposedComponent users={users} {...props} />

        }
    }
    return AuthenticationCheck
}
