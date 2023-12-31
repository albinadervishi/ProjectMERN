import React, { useEffect, useState } from 'react';
import './Cart.css';
import axios from "axios";
import { Link,  useParams, useNavigate  } from 'react-router-dom';


const Cart =(props)=> {
    const { id } = useParams();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const userId =localStorage.getItem('userId');
    const navigate = useNavigate()

    useEffect(() => {
    axios
    .get(`http://localhost:8000/api/user/` + userId)
    .then((res) => {
      setPhoneNumber(res.data.phoneNumber);
      setAddress(res.data.address);
    })
    .catch((err) => console.log("errori1" + err));
}, []);

const onSave = (e) => {
    e.preventDefault();
    axios.patch('http://localhost:8000/api/user/edit/' + userId, {
        phoneNumber,
        address      
    })
        .then(res=>{
            console.log("res1" + res);
    })
    .catch(err=>(err ))
}

const handleOrder = async (e) => {
    const products = props.cart.map(item => ({
    foodId: item._id,
    quantity: item.quantity
  }));

 axios.post('http://localhost:8000/api/order/new', {
    price,
    userId,
    products
        })
        .then(res=>{
            console.log(res);
            console.log("price" + quantity);
    })
    .catch((err) => console.log(err));
}



const subTotal = props.cart.reduce((acc, crr) => {
    return acc + (crr.price * crr.quantity);
}, 0)

const quantity = props.cart.reduce((acc, crr) => {
    return acc + crr.quantity;
}, 0)

const deliveryFee = quantity && 2;
const price = subTotal  + deliveryFee;

    return (
        <div className="shipment container my-5">
            <div className="row">
                <div className="col-md-5">
                    <h4>Edit Delivery Details</h4>
                    <hr />
                    <form className="py-5">
                        <div className="form-group">
                            <p>Delivery to door</p>
                        </div>

                        <div className="form-group">
                            <label class="form-label" >Phone Number</label>
                            <input
                                name="phone"
                                className="form-control"
                                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label class="form-label" >Address</label>
                        <input
                                name="address"
                                className="form-control"
                                value={address} onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <button
                                className="btn btn-danger btn-block"
                                type="submit"
                                onClick={onSave}
                            >
                                Save & Continue
                            </button>
                        </div>
                    </form>
                </div>
                <div className="offset-md-1 col-md-5">
                    <div className="restaurant-info mb-3">
                        <h5>Arriving in 20-30 min</h5>
                    </div>

                    {
                        props.cart.map(item =>
                            <div className="single-checkout-item mb-3 bg-light rounded d-flex align-items-center justify-content-between p-3">
                                <img width="140px" className="moor-images" src={item.imgURL} alt="food-image" />
                                <div className='px-4'>
                                    <h6>{item.name}</h6>
                                    <h4 className="text-danger">${item.price.toFixed(2)}</h4>
                                </div>

                                <div className="checkout-item-button ml-3 btn">
                                    <button
                                        onClick={() => {
                                            props.checkOutItemHandler(item._id, item.quantity + 1);
                                          }}
                                        className="btn font-weight-bolder"
                                    >
                                        +
                                    </button>

                                    <button
                                        className="btn bg-white rounded"
                                    >
                                        {item.quantity}
                                    </button>

                                    {
                                        item.quantity > 0 ?

                                            <button
                                            onClick={() => {
                                                props.checkOutItemHandler(item._id, item.quantity - 1);
                                              }}
                                                className="btn font-weight-bolder"
                                            >
                                                -
                                            </button>

                                            :

                                            <button
                                                className="btn font-weight-bolder"
                                            >
                                                -
                                     </button>
                                    }
                                </div>
                            </div>
                        )
                    }

                    {
                        !props.cart.length && <h3 className="py-3">No Items Added </h3>
                    }

                    <div className="cart-calculation">
                        <p className="d-flex justify-content-between">
                            <span>Sub Total: {quantity} Item</span>
                            <span>${subTotal.toFixed(2)}</span>
                        </p>

                        <p className="d-flex justify-content-between">
                            <span>Delivery Fee</span>
                            <span>${deliveryFee}</span>
                        </p>

                        <p className="h5 d-flex justify-content-between">
                            <span>Total</span>
                            <span>${price.toFixed(2)}</span>
                        </p>

                        {
                            quantity ?
                                   
                                        <button
                                            onClick={() =>{
                                                props.clearCart();
                                                handleOrder()
                                            } }
                                            className="btn btn-block btn-danger"
                                        >
                                            Check Out Your Food
                                    </button>
                            

                                :
                                <button
                                    disabled className="btn btn-block btn-secondary"
                                >
                                    Nothing to Checkout
                                </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;