import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import { AuthContext } from "../../Context/AuthContext";
import classes from "./Products.module.css";

const BACKEND = process.env.REACT_APP_BACKEND;

const Products = (props) => {
  const authContext = AuthContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = authContext.getToken();
    fetch(`${BACKEND}/admin/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchAgain = () => {
    const token = authContext.getToken();
    fetch(`${BACKEND}/admin/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <div className={classes["products-container"]}>
        {products &&
          products.map((product, index) => {
            return <Card key={index} product={product} fetchAgain = {fetchAgain} />;
          })}
      </div>
  )
}

export default Products