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
            console.log(res);
            navigate("/menu");
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
            <div class="form-outline mb-4">
              <label class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                value={name}
                onChange = {(e)=>setName(e.target.value)}
              />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label">Description</label>
              <input
                type="text"
                class="form-control"
                value={description}
                onChange = {(e)=>setDescription(e.target.value)}
              />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label">Price</label>
              <input
                type="text"
                class="form-control"
                value={price}
                onChange = {(e)=>setPrice(e.target.value)}
              />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label">Img URL</label>
              <input
                type="text"
                class="form-control"
                value={imgURL}
                onChange = {(e)=>setImgURL(e.target.value)}
              />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label">Type</label>
              <input
                type="text"
                class="form-control"
                value={type}
                onChange = {(e)=>setType(e.target.value)}
              />
            </div>

            <div className="action">
              <button className="btn btn-danger btn-rounded mb-2 d-flex align-items-center">
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