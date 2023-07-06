import { faCartArrowDown, faCheckCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import './NewItem.css';

const NewItem=(props)=>{
    const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [imgURL, setImgURL] = useState("");
  const [type, setType] = useState("");
  const [errors,setErrors] = useState([]);
    const navigate = useNavigate();

   

      const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/menu/new', {
            name,
            description,    
            price,
            imgURL,
            type     
        })
        .then((res) => {
          console.log(res.data.errors);
          if (res.data.errors) {
              setErrors(res.data.errors);
          }
          else{
          console.log(res)
          navigate("/menu");
          }
          })
        .catch(err=>(err ))
    }

    const goBack = ()=> {
        navigate("/menu");
    }

    return (
      <div className="food-details container scrollable">
        <div className="text-center" onClick={goBack}>
            <button className="btn btn-danger btn-rounded my-3">
              <FontAwesomeIcon icon={faWindowClose} />
              <span> Close </span>
            </button>
        </div>
        <div className="row mb-5">
          <div className="col-md-7 pr-md-4">
           
          <div class="input-group mb-3 d-flex align-items-center">
                <span class="input-group-text">
                  Name
                </span>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {errors.name ? (
                <p className="text-danger">{errors.name.message}</p>
              ) : (
                ""
              )}

            <div class="input-group mb-3 d-flex align-items-center">
                <span class="input-group-text">
                  Description
                </span>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {errors.description ? (
                <p className="text-danger">{errors.description.message}</p>
              ) : (
                ""
              )}

            <div class="input-group mb-3  d-flex align-items-center">
              <span class="input-group-text">$</span>
              <input
                type="text"
                class="form-control"
                aria-label="Amount (to the nearest dollar)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <span class="input-group-text">.00</span>
            </div>
            {errors.price ? (
                <p className="text-danger">{errors.price.message}</p>
              ) : (
                ""
              )}

            <div class="input-group mb-3 d-flex align-items-center">
                <span class="input-group-text">
                  Image
                </span>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={imgURL}
                onChange = {(e)=>setImgURL(e.target.value)}
              />
            </div>
            {errors.imgURL ? (
                <p className="text-danger">{errors.imgURL.message}</p>
              ) : (
                ""
              )}

            <div class="input-group mb-3 d-flex align-items-center">
                <span class="input-group-text">
                  Type
                </span>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={type}
                onChange = {(e)=>setType(e.target.value)}
              />
            </div>
            {errors.type ? (
                <p className="text-danger">{errors.type.message}</p>
              ) : (
                ""
              )}

            <div className="action">
              <button className="btn btn-danger btn-rounded mb-2 text-align">
              <span onClick={onSubmitHandler}>Save</span>
              </button>
            </div>
          </div>

          <div className="col-md-5 order-first order-md-last">
            <img
              className="img-fluid mb-4"
              src={imgURL}
              alt="food-image"
            />
          </div>
        </div>
      </div>
    );
}

export default NewItem;