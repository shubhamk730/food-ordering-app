import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Base from "../Base";

const Logout = () => {
  const authContext = AuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      authContext.Logout();
      navigate("/login");
    }, 1000);
  });
  return (
    <Base>
      <h3 style={{ textAlign: "center" }}>Logging you out...</h3>
    </Base>
  );
};

export default Logout;
