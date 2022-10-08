import React, { useRef, useState } from 'react';
import Base from '../../components/Base';
import classes from "./Signup.module.css";
import Toast from "../../components/UI/Toast";
import { useNavigate } from 'react-router-dom';

const BACKEND = process.env.REACT_APP_BACKEND;

const Signup = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const phoneInputRef = useRef();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const submitHandler = () => {
    if(!nameInputRef.current.value || !emailInputRef.current.value || !passwordInputRef.current.value || !phoneInputRef.current.value ){
      setShowToast(() => {
        return true
      });
      setMessage("Please fill all fields carefully")
      return;
    }
    if(!(phoneInputRef.current.value - '0') || (phoneInputRef.current.value - '0' < 0)){
      setShowToast(() => {
        return true
      });
      setMessage("Please fill all fields carefully")
      phoneInputRef.current.value="";
      return;
    }

    const userInfo = {
      name : nameInputRef.current.value,
      email : emailInputRef.current.value,
      password : passwordInputRef.current.value,
      phoneNumber : phoneInputRef.current.value,
    }

    fetch(`${BACKEND}/user/signup`, {
      method : "POST",
      body: JSON.stringify(userInfo),
      headers : {
        "Content-type": "application/json"
      }
    }).then(res => {
      return res.json();
    }).then(data => {
      if(data.email){
        setMessage("Sign up successful");
        setShowToast(true);
        setTimeout(() => {
        navigate("/login");
        },1000)
      }
    }).catch(err => {
      setShowToast(true);
      setMessage(`Signup failed due to : ${err}`);
    })
  }

  return (
    <Base styles={{backgroundColor:"rgb(254, 250, 250)"}}>
      {showToast && <Toast message={message} close={setShowToast}/>}
    <div className={classes["container"]}> 
        <div className={classes['poster']}></div>
        <div className={classes['form-container']}>
          <h1>Welcome to the Kingdom of Food</h1>
          <form className={classes["form"]}>
            <div className = {classes['form-element']}>
              <p >Name : </p>
              <input type = "text" id = "username" ref={nameInputRef} />
            </div>
            <div className = {classes['form-element']}>
              <p >Email : </p>
              <input type = "email" id="email" ref={emailInputRef} />
            </div>
            <div className = {classes['form-element']}>
              <p >Password : </p>
              <input type = "password" id="password" ref={passwordInputRef} />
            </div>
            <div className = {classes['form-element']}>
              <p >Phone No. : </p>
              <input type = "text" id="number" ref={phoneInputRef} />
            </div>
            <div className={classes['submit-btn']} onClick = {submitHandler}>
              Submit
            </div>
            
          </form>
        </div>
    </div>
    </Base>
  )
}

export default Signup;