import { faCartArrowDown, faCheckCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import './EditMenu.css';

const EditMenu=(props)=>{
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
        axios
          .get(`http://localhost:8000/api/menu/${id}`)
          .then((res) => {
            console.log(res.data);
            setItem(res.data);
            setName(res.data.name);
            setDescription(res.data.description);
            setPrice(res.data.price);
          })
          .catch((err) => console.log(err));
      }, [id]);

      const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.patch('http://localhost:8000/api/menu/edit/' + id, {
            name,
            description,    
            price     
        })
        .then((res) => {
          console.log(res.data);
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
        <div className="text-center">
          <div onClick={goBack}>
            <button className="btn btn-danger btn-rounded my-3">
              <FontAwesomeIcon icon={faWindowClose} />
              <span> Close </span>
            </button>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-7 pr-md-4">
            {/* <div class="form-outline mb-4">
              <label class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div> */}

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

            <div className="action ">
              <button className="btn btn-danger btn-rounded mb-2 text-align">
                <span onClick={onSubmitHandler}>Save</span>
              </button>
            </div>
          </div>

          <div className="col-md-5 order-first order-md-last">
            <img
              className="img-fluid mb-4"
              src={item.imgURL}
              alt="food-image"
            />
          </div>
        </div>
      </div>
    );
}

export default EditMenu;