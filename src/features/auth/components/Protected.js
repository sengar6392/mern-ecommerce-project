import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
    const user=useSelector(state=>state.auth.loggedInUser)
    console.log({user});
    if(!user){
        return <Navigate to="/login"></Navigate>
    }
    return children
}

export default Protected