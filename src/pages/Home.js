import React from 'react'
import NavBar from '../features/navbar/NavBar'
import ProductList from '../features/product-list/components/ProductList'

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