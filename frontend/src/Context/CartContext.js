import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const cartContext = React.createContext([]);

const CartContextProvider = (props) => {
  const authContext = AuthContext();

  const getCart = () => {
    if (!authContext.isLoggedin()) {
      throw new Error("Not Logged in");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("userCart"));
    return cart;
  };

  return (
    <cartContext.Provider value={{ getCart }}>
      {props.children}
    </cartContext.Provider>
  );
};

export const CartContext = () => {
  return useContext(cartContext);
};

export default CartContextProvider;
