import React from 'react'
import Cart from '../features/cart/Cart'
import NavBar from '../features/navbar/NavBar'

const CartPage = () => {
  return (
    <>
      <div className="bg-white mx-auto sm:mx-20 lg:mx-60 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 mt-8">
        <Cart cartPage/>
      </div>
      
    </>
  )
}

export default CartPage