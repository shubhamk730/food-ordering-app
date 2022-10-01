import React from "react";
import { CartContext } from "../../../Context/CartContext";
import classes from "./CardUser.module.css";

const Card = (props) => {
  const { _id, category, title, description, price, imageUrl } = props.product;
  const cartContext = CartContext();

  const addToCartHandler = () => {};

  return (
    <div className={classes["card"]}>
      <div className={classes["title-info"]}>
        <h3>
          {title} - ${price}
        </h3>
      </div>
      <div className={classes["img-container"]}>
        <img src={imageUrl} alt={title} height="150px" width="60%" />
      </div>
      <div className={classes["desc-box"]}>{description}</div>
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
