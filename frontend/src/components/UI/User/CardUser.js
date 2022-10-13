import React, { useState } from "react";
import { CartContext } from "../../../Context/CartContext";
import classes from "./CardUser.module.css";
import Toast from "../../UI/Toast";

const Card = (props) => {
  const { title, description, price, imageUrl } = props.product;
  // const { _id, category } = props.product
  const [message, setMessage] = useState();
  const [showToast, setShowToast] = useState(false);
  const cartContext = CartContext();

  const addToCartHandler = () => {
    try{
      cartContext.addToCart(props.product);
      setMessage("Successfully added to the cart");
      setShowToast(true);

    }
    catch(err){
      setShowToast(true);
      setMessage("Failed to add product");
      setTimeout(() =>{
        window.location.reload(false)
      },1500);
    }
  };

  return (
    <div className={classes["card"]}>
      {showToast && <Toast close={setShowToast} message={message} /> }
      <div className={classes["title-info"]}>
        <h3>
          {title} - ${price}
        </h3>
      </div>
      <div className={classes["img-container"]}>
        <img src={imageUrl} alt={title} height="150px" width="60%" />
      </div>
      <div className={classes["desc-box"]}>{description.length > 100 ? description.substring(0,101) + "..." : description}</div>
      <div className={classes["button-container"]}>
        <div className={classes["add-to-cart"]} onClick={addToCartHandler}>
          Add to cart
        </div>
        <div className={classes["view-button"]}>View</div>
      </div>
    </div>
  );
};

export default Card;
