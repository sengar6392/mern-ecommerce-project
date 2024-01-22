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
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrders from './features/order/components/UserOrder';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';

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
  {
    path: "/my-orders/",
    element: <Protected><UserOrderPage/></Protected>,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage/>,
  },
  {
    path: "/profile",
    element: <UserProfilePage/>,
  },
  {
    path: "*",
    element: <PageNotFound/>,
  },
]);
function App() {
  const user=useSelector(state=>state.auth.loggedInUser)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(user)
    dispatch(fetchItemsByUserIDAsync(user.id))
  },[dispatch,user])
  return (
    <>
       <RouterProvider router={router} />
    </>
  );
}

export default App;
