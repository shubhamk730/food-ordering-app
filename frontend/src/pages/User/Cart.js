import React, { useEffect, useState } from 'react';
import Base from '../../components/Base';
import CartItem from '../../components/UI/CartItem';
import { CartContext } from '../../Context/CartContext';
import classes from "./Cart.module.css"

const Cart = () => {
    const cartContext = CartContext();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(cartContext.getCart());
    },[cartContext]);
    
    const fetchAgain = () => {
        setCart(cartContext.getCart());
    }
    
  return (
    <Base>
        <h1 className={classes['info-heading']}>Your cart : </h1>
        <div className={classes['container']}>
            
        { cart.length === 0 && <h1 className={classes['no-items']}> No Items Found in the Cart. Please add something to continue.</h1>} 
            {cart.length > 0 && 
                cart.map((c, index) => {
                    return <CartItem key={index} item = {c} fetchAgain={fetchAgain} />
                })
            } 
            {cart.length > 0 && 
                <div className={classes['bill-info']}>
                    <h2>BILL INFO</h2>
                    <div className={classes['bill']}>
                        
                            {cart.map((item, index) => {
                                return (<h3 key={index}>{item.title} x {item.quantity} = ${item.price*item.quantity}</h3>)
                            })}
                            <h2> 
                                Total : ${cart.reduce((prev, curr) => {
                                    const bill = prev + curr.quantity * curr.price
                                    return bill;
                                },0)} (Pay)
                            </h2>
                    </div>
                    
                </div>
            }
        </div>
    </Base>
  )
}

export default Cart;