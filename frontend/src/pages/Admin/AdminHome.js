import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Card from "../../components/UI/Card";
import { AuthContext } from "../../Context/AuthContext";
import classes from "./AdminHome.module.css";

const BACKEND = process.env.REACT_APP_BACKEND;

const AdminHome = () => {
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
  return (
    <Base
      styles={{
        backgroundImage: "linear-gradient(to top right, blue, yellow)",
      }}
    >
      <Backdrop />
      <div className={classes["products-container"]}>
        {products.map((product, index) => {
          return <Card key={index} product={product} />;
        })}
      </div>
    </Base>
  );
};

export default AdminHome;
