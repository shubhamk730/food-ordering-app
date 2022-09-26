import React from "react";
import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  const close = () => {
    props.show(false);
  };
  return <div className={classes["backdrop"]} onClick={close}></div>;
};

export default Backdrop;
