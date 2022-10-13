import React from 'react'
import { CartContext } from '../../Context/CartContext';
import classes from "./CartItem.module.css";

const CartItem = ({ item, fetchAgain }) => {
  const cartContext = CartContext(item);

  const clickHandler = (e) => {
    if(e.target.id === "decrement"){
      cartContext.removeFromCart(item);
      fetchAgain();
    }
    if(e.target.id === "increment"){
      cartContext.addToCart(item);
      fetchAgain();
    }
  }

  return (
    <div className={classes['container']}>
        <div className={classes['img-container']}>
          <img src={item.imageUrl} alt={`${item.title}`} />
        </div>
        <div className={classes['info-container']}>
          <div className={classes['item-title']}>
            <h3>{item.title}</h3>
          </div>
          <div className={classes['item-qty']}>
            Quantity : {item.quantity}
          </div>
          <div className={classes['btn-container']} onClick={clickHandler}>
            <div id="decrement">-</div>
            <div>1</div>
            <div id="increment">+</div>
          </div>
        </div>
    </div>
  )
}

export default CartItem