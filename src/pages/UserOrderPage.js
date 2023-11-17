import React from 'react'
import NavBar from '../features/navbar/NavBar'
import UserOrders from '../features/order/components/UserOrder'

const UserOrderPage = () => {
  return (
    <>
    <NavBar>
        <div className=" text-xl font-semibold">My Orders</div>
        <UserOrders/>
     </NavBar>
    </>
  )
}

export default UserOrderPage