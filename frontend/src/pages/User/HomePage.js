import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import CardUser from "../../components/UI/User/CardUser";
import classes from "./HomePage.module.css";

const BACKEND = process.env.REACT_APP_BACKEND;

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND}/user/products`)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setProducts([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Base>
      <div className={classes["product-container"]}>
        {products.length > 0 ? (
          // if products are found
          products.map((product, index) => {
            return <CardUser key={index} product={product} />;
          })
        ) : (
          <h2 style={{ textAlign: "center" }}>
            No products found. Come back later.
          </h2>
        )}
      </div>
    </Base>
  );
};

export default HomePage;
