import React from "react";
import ReactDOM from "react-dom";
import classes from "./EditFormModal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const EditModal = (props) => {
  return (
    <div className={classes["form-container"]}>I recieved : {props.id}</div>
  );
};

const EditFormModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop show={props.show} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <EditModal id={props.id} show={props.show} />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default EditFormModal;
