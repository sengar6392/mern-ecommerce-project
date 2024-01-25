import React from 'react'
import NavBar from '../features/navbar/NavBar'
import UserOrders from '../features/order/components/UserOrder'

const UserOrderPage = () => {
  return (
    <>
    <NavBar>
        
        <UserOrders/>
     </NavBar>
    </>
  )
}

export default UserOrderPage