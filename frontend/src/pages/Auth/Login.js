import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Base from "../../components/Base";
import Toast from "../../components/UI/Toast";
import { AuthContext } from "../../Context/AuthContext";
import classes from "./Login.module.css";

const BACKEND = process.env.REACT_APP_BACKEND;

const Login = () => {
  const location = useLocation();
  const authContext = AuthContext();
  const navigate = useNavigate();

  const nameInputRef = useRef();
  const passwordInputRef = useRef();

  const [message, setMessage] = useState();
  const [category, setCategory] = useState("");
  const [showToast, setShowToast] = useState(false);

  const isAdminRoute = location.pathname.includes("admin");
  const URL = isAdminRoute ? `${BACKEND}/admin/login` : `${BACKEND}/user/login`;

  useEffect(() =>{
    if (authContext.isLoggedin()) {
      navigate(`${isAdminRoute?'/admin/':'/'}`);
    }
  },[]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!nameInputRef.current.value || !passwordInputRef.current.value) {
      // throw Error("Enter valid name and password");
      setMessage("Enter valid email and password");
      setCategory("error");
      setShowToast(true);
      return;
    }

    const userEmail = nameInputRef.current.value;
    const userPassword = passwordInputRef.current.value;

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if(data.message) {
          passwordInputRef.current.value = "";
          throw new Error("Password failed");
        }
        authContext.Login(data.token, data.name, data.email);
        setMessage("Log in successful");
        setCategory("success");
        setShowToast(true);
        
        setTimeout(() => {
          authContext.Logout();
        }, 604800);
        navigate(`${isAdminRoute ? "/admin/" : "/"}`);
      })
      .catch((err) => {
        setMessage("Email or password Incorrect");
        setCategory("error")
        setShowToast(true)
      });
  };

  return (
    <Base
      styles={{
        backgroundImage: "linear-gradient(to top right, #009FFD, #2A2A72)",
      }}
    >
      {showToast && <Toast category = "error" close={setShowToast} message={message} />}
      <div className={classes["login-component"]}>
        <div className={classes["heading"]}>
          <h2>{isAdminRoute ? "Admin Login" : "Login"}</h2>
        </div>
        <div className={classes["form-container"]}>
          <form onSubmit={submitHandler}>
            <div className={classes["form-element"]}>
              <p>Email Address: </p>
              <input
                name="email"
                placeholder="Enter email"
                ref={nameInputRef}
              />
            </div>
            <div className={classes["form-element"]}>
              <p>Password : </p>
              <input
                name="password"
                placeholder="Enter password"
                type="password"
                ref={passwordInputRef}
              />
            </div>
            <button type="submit">Log in</button>
          </form>
          <div className={classes["forgot-password"]}>
            <Link to="/forgot-password">
              <p>Forgot password?</p>
            </Link>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Login;
