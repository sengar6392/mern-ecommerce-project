import React from 'react'
import NavBar from '../features/navbar/NavBar'
import ProductDetail from '../features/product-list/components/ProductDetail'

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