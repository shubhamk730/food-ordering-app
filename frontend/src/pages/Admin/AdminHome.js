import React, { useState } from "react";
import AddProduct from "../../components/AdminHomeComponents/AddProduct";
import Orders from "../../components/AdminHomeComponents/Orders";
import Products from "../../components/AdminHomeComponents/Products";
import Users from "../../components/AdminHomeComponents/Users";
import Base from "../../components/Base";
import AdminNav from "../../components/UI/AdminNav/AdminNav";


const AdminHome = () => {
  const [component, setComponent] = useState("products");
  
  return (
    <Base
    // styles={{
    //   backgroundImage: "linear-gradient(to top right, blue, purple)",
    // }}
    >
      <AdminNav setComponent = { setComponent } />
      {component === "products" && <Products setComponent = {setComponent} />}
      {component === "add-product" && <AddProduct />}
      {component === "users" && <Users /> }
      {component === "orders" && <Orders /> }
    </Base>
  );
};

export default AdminHome;
