import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import classes from "./Navbar.module.css";
// import HomeIcon from "@mui/icons-material/Home";

const Navbar = () => {
  const location = useLocation();
  const isAdminNav = location.pathname.includes("admin");
  const [isVisible, setIsVisible] = useState(false);
  const authContext = AuthContext();
  const isAuth = authContext.isLoggedin();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={classes["navbar"]}>
      <div className={classes["home-logo"]}>
        <Link to="/">Logo</Link>
      </div>

      <div className={classes["ham-button"]} onClick={toggleVisibility}>
        <span className={classes["bar"]}></span>
        <span className={classes["bar"]}></span>
        <span className={classes["bar"]}></span>
      </div>

      <div
        className={`${classes["nav-links"]} ${
          isVisible ? classes.visible : ""
        }`}
      >
        <ul>
          {isAuth && !isAdminNav && (
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          )}
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/cart">Contact</Link>
          </li>
          {isAuth ? (
            <li>
              <Link to="/logout">Log out</Link>
            </li>
          ) : (
            <li>
              <Link to={`${isAdminNav ? "/admin/login" : "/login"}`}>
                Log in
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
