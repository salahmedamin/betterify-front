import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'

function ProtectedPath(props) {
    const data = useSelector(state=>({
        auth: state.auth?.isLogged
    }))
    return data.auth ? <Route {...props} >{props.children}</Route> : <Redirect to="/login" />
}

export default ProtectedPath