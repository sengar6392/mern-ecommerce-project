import React from 'react'
import NavBar from '../features/navbar/NavBar'
import ProductDetail from '../features/products/components/ProductDetail'

const ProductDetailPage = () => {
  return (
    <>
     <NavBar>
        <ProductDetail/>
     </NavBar>
    </>
  )
}

export default ProductDetailPage