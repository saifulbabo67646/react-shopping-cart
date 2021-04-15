import React, { useState } from "react";
import Cart from "./component/Cart";
import Filter from "./component/Filter";
import Product from "./component/product";
import { products } from "./data.json";
import "./index.css";

function App() {
  const [productData, setProductData] = useState({
    prod: products,
    size: "",
    sort: "",
  });
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
  const handleSort = (e) => {
    console.log(productData.sort);
    setProductData({
      sort: e.target.value,
      prod: productData.prod
        .slice()
        .sort((a, b) =>
          productData.sort === "lowest"
            ? a.price < b.price
              ? 1
              : -1
            : productData.sort === "highest"
            ? a.price > b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    });
  };

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setProductData({
        size: e.target.value,
        prod: products,
      });
    } else {
      setProductData({
        size: e.target.value,
        prod: products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      });
    }
  };

  return (
    <div className="grid-container">
      <header>
        <a href="/">Babus Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              counts={productData.prod.length}
              handleSort={handleSort}
              handleFilter={handleFilter}
              size={productData.size}
              sort={productData.sort}
            />
            <Product products={productData.prod} addToCart={addToCart}/>
          </div>
          <div className="sidebar"> 
            <Cart cartItems={bagcartItems} removeFromCart={removeFromCart} createNewOrder={createNewOrder}/>
          </div>
        </div>
      </main>
      <footer>All Right Reserve.</footer>
    </div>
  );
}

export default App;
