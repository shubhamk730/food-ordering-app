import React, { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import classes from "./Card.module.css";
import EditFormModal from "./EditForm/EditFormModal";

const BACKEND = process.env.REACT_APP_BACKEND;

const Card = (props) => {
  const { _id, category, title, description, price, imageUrl } = props.product;
  const authContext = AuthContext();
  const token = authContext.getToken();
  const [showEditModal, setShowEditModal] = useState(false);
  const product = { ...props };
  // const [showDeleteModal, setShowDeleteModal] = useState(false);

  const editClickHandler = () => {
    window.scrollTo(0, 0);
    setShowEditModal(true);
  };

  const deleteClickHandler = () => {
    fetch(`${BACKEND}/admin/delete`, {
      method : "POST",
      body : JSON.stringify({ id : _id }),
      headers : {
        "Content-type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
    }).then(res => {
      return res.json()
    }).then(data => {
      console.log(data);
      props.fetchAgain();
    }).catch(err => {
      console.log(err.message);
    })
  }
  return (
    <div className={classes["card"]}>
      {showEditModal && (
        <EditFormModal product={product} show={setShowEditModal} />
      )}
      <div className={classes["title-info"]}>
        <h3>
          {title} - ${price}
        </h3>
      </div>
      <div className={classes["img-container"]}>
        <img src={imageUrl} alt={title} height="150px" width="60%" />
      </div>
      <div className={classes["desc-box"]}>{description}</div>
      <div className={classes["button-container"]}>
        <div className={classes["edit-button"]} onClick={editClickHandler} >
          Edit
        </div>
        <div className={classes["delete-button"]} onClick={deleteClickHandler}>Delete</div>
      </div>
    </div>
  );
};

export default Card;
