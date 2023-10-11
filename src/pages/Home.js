import React from 'react'
import NavBar from '../features/navbar/NavBar'
import ProductList from '../features/product-list/ProductList'

const Home = () => {
  return (
    <>
        <NavBar>
            <ProductList/>
        </NavBar>     
    </>
  )
}

export default Home