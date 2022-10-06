import React from 'react';
import classes from "./AdminNav.module.css";

const AdminNav = ({ setComponent }) => {

  const clickHandler = (e) => {
    if(e.target.id){
      switch (e.target.id) {
        case "products" : setComponent("products");
                         break;
        case "users" : setComponent("users");
                         break;
        case "orders" : setComponent("orders");
                         break;
        case "add-product" : setComponent("add-product");
                         break;
        default:
          break;
      }
    }
  }


  return (
    <div className={classes["admin-nav"]} onClick={ clickHandler }>
        <div className={classes["nav-link"]} id = "add-product" >Add Product</div>
        <div className={classes["nav-link"]} id = "users" >Users</div>
        <div className={classes["nav-link"]} id = "products" >Products</div>
        <div className={classes["nav-link"]} id = "orders" >Orders</div>
    </div>
  )
}

export default AdminNav;