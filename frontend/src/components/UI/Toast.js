import React, { useEffect } from 'react'
import classes from "./Toast.module.css";

const Toast = (props) => {
    const status = props.category || "info";
    // const title = props.title;
    const message  = props.message;

    const closeHandler = () => {
        props.close(false);
    }

    useEffect( () => {
        setTimeout(()=> {
            props.close(false);
        },2000)
    },[props.close])

  return (
    <div className={status === "success" ? classes['success'] : ( status === 'error' ? classes['error'] : classes['info'])}>
        <div onClick={closeHandler} className={classes['close-btn']}>X</div>
        {/* <div className= {classes['title-box']} >{title}</div> */}
        <div className= {classes['msg-box']} >{message}</div>
    </div>
  )
}

export default Toast;