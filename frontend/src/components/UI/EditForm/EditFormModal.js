import React, { useRef } from "react";
import ReactDOM from "react-dom";
import classes from "./EditFormModal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import { AuthContext } from "../../../Context/AuthContext";
import { Navigate } from "react-router-dom";

const BACKEND = process.env.REACT_APP_BACKEND;

const EditModal = (props) => {
  const prod = props.product.product;
  const titleInputRef = useRef(null);
  const DescInputRef = useRef(null);
  const priceInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const categoryInputRef = useRef(null);

  const authContext = AuthContext();
  const token = authContext.getToken();

  const submitHandler = (e) => {
    e.preventDefault();

    const updatedData = {
      id: prod._id,
      title: titleInputRef.current.value || prod.title,
      price: priceInputRef.current.value || prod.price,
      description: DescInputRef.current.value || prod.description,
      category: categoryInputRef.current.value || prod.category,
      imageUrl: imageInputRef.current.value || prod.imageUrl,
    };

    fetch(`${BACKEND}/admin/update`, {
      method: "POST",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        console.log("Success", res);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelHandler = () => {
    props.show();
  };
  return (
    <div className={classes["form-container"]}>
      <h1 className={classes["form-heading"]}>Update Product</h1>

      <form className={classes["edit-form"]}>
        <div className={classes["form-element"]}>
          <label htmlFor="title"> Title : </label>
          <input
            defaultValue={prod.title}
            type="text"
            name="title"
            ref={titleInputRef}
            required
          />
        </div>

        <div className={classes["form-element"]}>
          <label htmlFor="description"> Description : </label>
          <textarea
            ref={DescInputRef}
            placeholder={prod.description}
            // type="text"
            name="description"
            required
          />
        </div>

        <div className={classes["form-element"]}>
          <label htmlFor="category"> Category : </label>
          <input
            defaultValue={prod.category}
            type="text"
            name="category"
            ref={categoryInputRef}
            required
          />
        </div>

        <div className={classes["form-element"]}>
          <label htmlFor="image"> ImageUrl : </label>
          <input
            defaultValue={prod.imageUrl}
            type="text"
            name="image"
            ref={imageInputRef}
            required
          />
        </div>

        <div className={classes["form-element"]}>
          <label htmlFor="price"> Price : </label>
          <input
            defaultValue={prod.price}
            type="text"
            name="price"
            ref={priceInputRef}
            required
          />
        </div>

        <div className={classes["form-element"]}>
          <button
            type="submit"
            className={classes["submit-btn"]}
            onClick={submitHandler}
          >
            Submit
          </button>
        </div>

        <div className={classes["form-element"]}>
          <button
            type="submit"
            className={classes["cancel-btn"]}
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
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
        <EditModal product={props.product} show={props.show} />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default EditFormModal;
