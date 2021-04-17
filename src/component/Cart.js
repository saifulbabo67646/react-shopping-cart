import React, { useState } from "react";
import formatCurrency from "./util";
import Fade from 'react-reveal/Fade'

const Cart = ({ cartItems, removeFromCart,createNewOrder  }) => {
    const [showCheckout, setShowCheckout] = useState(false)
    const [checkoutForm, setCheckoutForm] = useState({
        email: '',
        name: '',
        address: ''
    })

    const handleInput = (e) => {
        setCheckoutForm({...checkoutForm,[e.target.name]: e.target.value})
    }

    const createOrder = (e) => {
        e.preventDefault()
        const {email,name,address} = checkoutForm
        const order = {
            name,
            email,
            address,
            cartItems: cartItems
        }
        createNewOrder(order)
    }
  return (
    <div>
      {cartItems.length !== 0 ? (
        <div className='cart cart-header'> You have {cartItems.length} in the cart </div>
      ) :  (
        <div className="cart cart-header"> Cart is emty </div>
      ) }
      <div>
          <div className='cart'>
             <Fade left cascade>
            <ul className='cart-items'>
                {
                    cartItems.map(item => (
                        <li key={item._id}>
                            <div>
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div>
                                <div>{item.title}</div>
                                <div className='right'>
                                 
                                       {formatCurrency(item.price) } ✕ {item.count}{" "}
                                    <button className='button' onClick={() => removeFromCart(item)}>Remove</button>
                                </div>
                                
                            </div>
                        </li>
                    ))
                }
            </ul>
            </Fade> 
          </div>
          <div>
              {
                  cartItems.length !== 0 && (
                      <div className='total'> 
                        <div> 
                            Total: {' '}
                            {formatCurrency(
                                cartItems.reduce((a, c) => a + c.price * c.count, 0)
                            )}
                        </div>
                        <button onClick={() => setShowCheckout(true)} className='button primary'>Proceed</button>
                      </div>
                  )
              }
          </div>
      </div>
      {showCheckout && (
          <div className='cart'> 
          <Fade right cascade>
            <form onSubmit={createOrder} >
                <ul className='form-container'>
                    <li>
                       <label>Email</label>
                        <input
                            name='email'
                            type='email'
                            required
                            value={checkoutForm.email}
                            onChange={handleInput}
                        ></input> 
                    </li>
                    <li>
                       <label>Name</label>
                        <input
                            name='name'
                            type='text'
                            required
                            value={checkoutForm.name}
                            onChange={handleInput}
                        ></input> 
                    </li>
                    <li>
                       <label>Address</label>
                        <input
                            name='address'
                            type='text'
                            required
                            value={checkoutForm.address}
                            onChange={handleInput}
                        ></input> 
                    </li>
                    <button className='button primary' type='submit' >Checkout</button>
                </ul>
            </form>
            </Fade>
          </div>
      )}
    </div>
  );
};

export default Cart;
