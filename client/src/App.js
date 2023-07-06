import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Banner from './components/banner/Banner';
import MenuBar from './components/menubar/MenuBar';
import Products from './components/products/Products';
import Blog from './components/blog/Blog';
import RatingPage from './components/rating/RatingPage';
import Footer from './components/footer/Footer';
import Welcome from './components/welcome/Welcome';
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import FoodDetails from './components/foodDetails/FoodDetails';
import Cart from './components/cart/Cart';
import Account from './components/account/Account';
import EditMenu from './components/editMenu/EditMenu';
import NewItem from './components/newItem/NewItem';
import Orders from './components/orderBoard/Orders';

function App() {
  const [cart, setCart] = useState([])
  const userId = localStorage.getItem('userId')
  const [admin, setAdmin] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [refresh, setRefresh] = useState()

  useEffect(() => {
    userId?
    axios.get('http://localhost:8000/api/user/' + userId)
      .then(res => { 
        console.log(res.data.admin);
        setAdmin(res.data.admin);
        setFirstName(res.data.firstName) })
      .catch(err => console.log(err)) : console.log("errors")
  }, [refresh])

  const cartHandler = currentFood => {
    const alreadyAdded = cart.find(item => item._id === currentFood._id)
    if (alreadyAdded) {
      const reamingCarts = cart.filter(item => cart._id !== currentFood)
      setCart(reamingCarts);
    } else {
      const newCart = [...cart, currentFood]
      setCart(newCart);
    }
  }

  const checkOutItemHandler = (foodID, foodQuantity) => {
    const newCart = cart.map(item => {
      if (item._id === foodID) {
        item.quantity = foodQuantity;
      }
      return item;
    })

    const filteredCart = newCart.filter(item => item.quantity > 0)
    setCart(filteredCart)
  }

  const clearCart = () => {
    setCart([]);
  }

  return (
    <div className="App">
      <BrowserRouter>
      {admin === true ? 
      <Routes>
       <Route path="/" element={<Navigate to="/orders" />} ></Route>
       <Route path="/welcome" element={<Welcome/>}></Route>
       <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
       <Route path="/orders" element={<><Navbar cart={cart} firstName={firstName} admin={admin}/> <Orders/> <Footer/></>}></Route>
       <Route path="/menu" element={<><Navbar cart={cart} firstName={firstName} admin={admin}/> <MenuBar admin={admin}/> <Footer/></>}></Route>
        <Route path="/menu/:id" element={<><Navbar cart={cart} firstName={firstName} admin={admin}/><FoodDetails cart={cart} cartHandler={cartHandler}/><Footer/></>}></Route>
       <Route path="/menu/new" element={<><Navbar cart={cart} firstName={firstName} admin={admin}/> <NewItem/> <Footer/></>}></Route>
       <Route path="/menu/edit/:id" element={<><Navbar cart={cart} firstName={firstName} admin={admin}/> <EditMenu/> <Footer/></>}></Route>
       <Route path="/account" element={<><Navbar cart={cart} firstName={firstName} admin={admin}/> <Account/> <Footer/></>}></Route>
       </Routes>
       : 
       <Routes>
        <Route path="/" element={<Navigate to="/home" />} ></Route>
        <Route path="/home" element={<><Navbar cart={cart} firstName={firstName} admin={admin}/> <Banner/> <RatingPage/> <Products/> <Blog/> <Footer/></>}></Route>
        <Route path="/welcome" element={<Welcome/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/menu" element={<><Navbar cart={cart} firstName={firstName} admin={admin}/> <MenuBar/> <Footer/></>}></Route>
        <Route path="/menu/:id" element={<><Navbar cart={cart} firstName={firstName} admin={admin}/><FoodDetails cart={cart} cartHandler={cartHandler}/><Footer/></>}></Route>
        <Route path="/checkout" element={<><Navbar cart={cart} firstName={firstName} admin={admin}/><Cart cart={cart} checkOutItemHandler={checkOutItemHandler}  clearCart={clearCart}/><Footer/></>}></Route>
        <Route path="/account" element={<><Navbar cart={cart} firstName={firstName} admin={admin}/> <Account/> <Footer/></>}></Route>
      </Routes>
       }
      
      </BrowserRouter>
     
    </div>
  );
}

export default App;
