import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIDAsync } from './features/cart/cartSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Protected><Home/></Protected> ,
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/signup",
    element: <SignupPage/>
  },
  {
    path: "/cart",
    element: <Protected><CartPage/></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><CheckoutPage/></Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailPage/></Protected>,
  },
]);
function App() {
  const user=useSelector(state=>state.auth.loggedInUser)
  const items=useSelector(state=>state.cart.items)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(user)
    dispatch(fetchItemsByUserIDAsync(user.id))
  },[dispatch,user,items])
  return (
    <>
       <RouterProvider router={router} />
    </>
  );
}

export default App;
