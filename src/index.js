import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>,
    children:[
      {
        path: "/",
        element:<Home/>
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
        element:<CartPage/>
      },
      {
        path: "/checkout",
        element: <Protected><CheckoutPage/></Protected>,
      },
      {
        path: "/product-detail/:id",
        element: <ProductDetailPage/>
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
        element: <Protected><UserProfilePage/></Protected>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage/>,
      },
      {
        path: "*",
        element: <PageNotFound/>,
      },
    ]
  }
]);

root.render(
 
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

