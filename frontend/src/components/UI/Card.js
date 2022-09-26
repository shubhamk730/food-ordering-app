import React, { useState } from "react";
import classes from "./Card.module.css";
import EditFormModal from "./EditForm/EditFormModal";

const Card = (props) => {
  const { _id, category, title, description, price, imageUrl } = props.product;
  const [showEditModal, setShowEditModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);

  const editClickHandler = () => {
    setShowEditModal(true);
  };
  console.log(title, category, price);
  return (
    <div className={classes["card"]}>
      {showEditModal && <EditFormModal id={_id} show={setShowEditModal} />}
      <div className={classes["title-info"]}>
        <h3>
          {title} - ${price}
        </h3>
      </div>
      <div>
        <img src={imageUrl} alt={title} />
      </div>
      <div>{description}</div>
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
