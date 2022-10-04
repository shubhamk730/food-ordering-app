import React, { useRef, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Toast from '../UI/Toast';
import classes from "./AddProduct.module.css";

const BACKEND = process.env.REACT_APP_BACKEND; 

const AddProduct = (props) => {

    const titleInputRef = useRef(null);
    const descInputRef = useRef(null);
    const priceInputRef = useRef(null);
    const categoryInputRef = useRef(null);
    const imageUrlRef = useRef(null);
    const [showToast, setShowToast] = useState(false);
    const [status, setStatus] = useState('info');
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const authContext = AuthContext();
    const token = authContext.getToken();


    const submitHandler = (e) => {
        e.preventDefault();
        if(!titleInputRef.current.value || !descInputRef.current.value || !priceInputRef.current.value || !imageUrlRef.current.value || categoryInputRef.current.value === "None"){
            alert("Fill all fields carefully");
            return;
        }
        if(!(priceInputRef.current.value - 0) || (priceInputRef.current.value - 0 < 1)){
            alert("invalid price entered");
            priceInputRef.current.value = "";
            return;
        }
        const expression = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;
        if(!imageUrlRef.current.value.match(expression)){
            alert("Invalid image url")
            imageUrlRef.current.value = "";
            return;
        }
        const product = {
            title: titleInputRef.current.value,
            description: descInputRef.current.value,
            price: priceInputRef.current.value,
            imageUrl: imageUrlRef.current.value,
            category: categoryInputRef.current.value
        }

        fetch(`${BACKEND}/admin/add-product`,{
            method:"POST",
            body: JSON.stringify(product),
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            
            return res.json();
        })
        .then(data => {
            setMessage("Product created successfully");
            setStatus("success");
            setShowToast(true);
            window.location.reload();
        })
        .catch(err => {
            setMessage(err.message);
            setStatus("error")
            setShowToast(true);
        })

    }

  return (
    <div className={classes["main"]}>
        {showToast && <Toast close= {setShowToast} status = {status} title = {title} message = {message} />}
    <div className={classes["container"]}>
        <div className={classes["heading-container"]}> <h1> Add A Dish </h1> </div>
        <div className={classes["form-container"]}>
            <form >
                <div className={classes["form-element"]}>
                    <label htmlFor= "title"> Title </label>
                    <input type= "text" id = "title" ref={titleInputRef} />
                </div>
                <div className={classes["form-element"]}>
                    <label htmlFor= "description"> Description </label>
                    <input type= "text" id = "description" ref = {descInputRef} />
                </div>
                <div className={classes["form-element"]}>
                    <label htmlFor= "category"> Category </label>
                    <select id = "category" ref = {categoryInputRef}>
                        <option value="None" hidden default>Select a category</option>
                        <option value="noodles">Noodles</option>
                        <option value="pizza">Pizza</option>
                        <option value="pasta">Pasta</option>
                        <option value="burger">Burger</option>
                        <option value="dessert">Dessert</option> 
                        <option value="beverage">Drinks</option> 
                        <option value="others">Others</option> 
                    </select>
                </div>
                <div className={classes["form-element"]}>
                    <label htmlFor= "price"> Price ($) </label>
                    <input type= "text" id = "price" ref={priceInputRef}/>
                </div>
                <div className={classes["form-element"]}>
                    <label htmlFor= "imageUrl"> Image URL </label>
                    <input type= "text" id = "imageUrl" ref={imageUrlRef} />
                </div>
                <div className={classes["form-element"]}>
                    <div className={classes['submit-btn']} onClick={submitHandler}>Submit</div>
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default AddProduct