import React from 'react'
import NavBar from '../features/navbar/NavBar'
import ProductList from '../features/products/components/ProductList'

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