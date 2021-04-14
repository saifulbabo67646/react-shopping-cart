import React, { useState } from 'react'
import Product from './component/product'
import {products} from './data.json'
import './index.css'

function App() {
  
 const [productData, setProductData] = useState({
   prod: products,
   sort: ''
 })
 
  return (
    <div className="grid-container">
      <header>
         <a href='/'>Babus Shopping Cart</a>
      </header>
      <main>
        <div className='content'>
          <div className='main'>
            <Product products={productData.prod}/>
          </div>
          <div className='sidebar'>
            Cart Item
          </div>
        </div>
      </main>
      <footer>
        All Right Reserve.
      </footer>
    </div>
  );
}

export default App;
