import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const cartContext = React.createContext([]);

const CartContextProvider = (props) => {
  const authContext = AuthContext();

  const getCart = () => {
    if (!authContext.isLoggedin()) {
      throw new Error("Not Logged in");
    }
    const cart = JSON.parse(localStorage.getItem("userCart"));
    return cart;
  };

  const removeFromCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("userCart"));
    let index = cart.findIndex((p) => {
      return p._id === item._id;
    });
    let prod = cart[index];
    let quantity = prod.quantity;
    if(quantity === 1){
      const newCart = cart.filter(c => c._id !== item._id);
      localStorage.setItem("userCart", JSON.stringify(newCart));
    }
    else {
      quantity = quantity - 1;
      cart[index] = {...prod, quantity}; 
      localStorage.setItem("userCart", JSON.stringify(cart));
    }
  }

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("userCart"));
    let index = cart.findIndex((p) => {
      return p._id === product._id;
    });
    if( index === -1) {
      const prod = {...product, quantity : 1};
      cart.push(prod);
    } else {
      let prod = cart[index];
      let quantity = prod.quantity;
      quantity = quantity + 1;
      cart[index] = {...prod, quantity}; 
    }
    localStorage.setItem("userCart", JSON.stringify(cart));
  }

  return (
    <cartContext.Provider value={{ getCart, addToCart, removeFromCart }}>
      {props.children}
    </cartContext.Provider>
  );
};

export const CartContext = () => {
  return useContext(cartContext);
};

export default CartContextProvider;
