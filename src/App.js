import React, { useState } from "react";
import Cart from "./component/Cart";
import Filter from "./component/Filter";
import Product from "./component/product";
import "./index.css";
import {Provider} from 'react-redux'
import store from './redux/store'

function App() {
  
  const [bagcartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): [])

  const createNewOrder = (order) => {
    alert('Need to save order for '+ order.name)
  }
  const removeFromCart = (product) => {
    const cartItems = bagcartItems.slice()
    setCartItems(cartItems.filter(x => x._id !== product._id))
    localStorage.setItem('cartItems', JSON.stringify(cartItems.filter(x => x._id !== product._id)))
  }
  const addToCart = (product) => {
    const cartItems = bagcartItems.slice()
    let alreadyInCart = false
    cartItems.forEach(item => {
      if(item._id === product._id){
        item.count++
        alreadyInCart = true
      }
    })
    if(!alreadyInCart){
      cartItems.push({...product, count: 1})
    }
    setCartItems(cartItems)
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }
 

  return (
    <Provider store={store}>
    <div className="grid-container">
      <header>
        <a href="/">Babus Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter/>
            <Product addToCart={addToCart}/>
          </div>
          <div className="sidebar"> 
            <Cart cartItems={bagcartItems} removeFromCart={removeFromCart} createNewOrder={createNewOrder}/>
          </div>
        </div>
      </main>
      <footer>All Right Reserve.</footer>
    </div>
    </Provider>
  );
}

export default App;
