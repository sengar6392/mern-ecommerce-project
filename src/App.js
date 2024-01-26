import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIDAsync } from './features/cart/cartSlice';
import { Outlet } from 'react-router-dom';
import NavBar from './features/navbar/NavBar';

function App() {
  const {userInfo}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(userInfo)
    dispatch(fetchItemsByUserIDAsync())
  },[dispatch,userInfo])
  return (
    <>
      <NavBar/>
       <Outlet/>
    </>
  );
}

export default App;
