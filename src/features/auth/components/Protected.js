import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
    const {userInfo}=useSelector(state=>state.auth)
   
    if(!userInfo){
        return <Navigate to="/login"></Navigate>
    }
    return children
}

export default Protected