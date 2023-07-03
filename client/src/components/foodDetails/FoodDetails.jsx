import { faCartArrowDown, faCheckCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import './FoodDetails.css';

const FoodDetails=(props)=>{
    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
          .get(`http://localhost:8000/api/menu/${id}`)
          .then((res) => {
            console.log(res.data);
            setItem(res.data);
          })
          .catch((err) => console.log(err));
      }, [id]);

      const finalCartHandler = item => {
        item.quantity = quantity;
        props.cartHandler(item);
        setIsSuccess(true);
    }

    if (isSuccess) {
        setTimeout(() => setIsSuccess(false), 1500);
    }

    const goBack = ()=> {
        navigate("/menu");
    }

    return (
        <div className='food-details container scrollable'>
            <div className='text-center'>
                <div onClick={goBack}>
                    <button className='btn btn-danger btn-rounded my-3'>
                        <FontAwesomeIcon icon={faWindowClose} />
                        <span>  Close </span>
                    </button>
                </div>
            </div>
            <div className='row mb-5'>
                <div className='col-md-7 pr-md-4'>
                    <h1>{item.name}</h1>
                    <p className='my-5'>{item.description}</p>
                    <div className='d-flex my-4'>
                        <h2 className='price'>${item.price}</h2>

                        <div className='cart-controller ml-3 btn d-flex'>
                            <button
                                className='btn'
                                onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}
                            >
                                -
                            </button>
                            {quantity}
                            <button
                                className='btn'
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="action">
                        <button className='btn btn-danger btn-rounded mb-2 d-flex align-items-center'
                            onClick={() => finalCartHandler(item)}
                        >
                            <FontAwesomeIcon icon={faCartArrowDown} />
                            <span>  Add</span>
                        </button>
                        {isSuccess &&
                            <p
                                className="ml-3 success-mgs text-success"
                            ><FontAwesomeIcon icon={faCheckCircle}
                                />  Item added to Cart
                            </p>
                        }
                    </div>
                </div>

                <div className='col-md-5 order-first order-md-last'>
                    <img className='img-fluid mb-4' src={item.imgURL} alt="food-image" />
                </div>
            </div>
        </div>
    );
}

export default FoodDetails;