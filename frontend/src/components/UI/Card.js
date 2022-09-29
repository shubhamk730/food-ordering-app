import React, { useState } from "react";
import classes from "./Card.module.css";
import EditFormModal from "./EditForm/EditFormModal";

const Card = (props) => {
  const { _id, category, title, description, price, imageUrl } = props.product;
  const [showEditModal, setShowEditModal] = useState(false);
  const product = { ...props };
  // const [showDeleteModal, setShowDeleteModal] = useState(false);

  const editClickHandler = () => {
    window.scrollTo(0, 0);
    setShowEditModal(true);
  };
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
        <div className={classes["edit-button"]} onClick={editClickHandler}>
          Edit
        </div>
        <div className={classes["delete-button"]}>Delete</div>
      </div>
    </div>
  );
};

export default Card;
