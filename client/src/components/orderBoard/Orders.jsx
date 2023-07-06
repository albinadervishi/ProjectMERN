import React, {useState, useEffect} from "react";
import './Orders.css';
import axios from "axios";

const Orders = () => {
    const [order, setOrder] = useState([]);
    
    order.sort((a,b)=> {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    useEffect(() => {
        axios
          .get("http://localhost:8000/api/order")
          .then((res) => {
            console.log(res.data.orders[1].products.menu);
            setOrder(res.data.orders);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      const deleteOrder = (orderId) => {
        axios
          .delete("http://localhost:8000/api/order/" + orderId)
          .then((res) => {
            setOrder(order.filter((order) => order._id != orderId));
          })
          .catch((err) => console.log("?" + err));
      };

  return (
    <div className="order-table">
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Person Info</th>
            <th scope="col">Products</th>
            <th scope="col">Total Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {order.map((order, index) => (
        <tbody key={order._id}>
          <tr>
            <td>
                <p>Name: {order.user.firstName}</p>
                <p>Address: {order.user.address}</p>
                <p>Phone Number: {order.user.phoneNumber}</p>
            </td>
            <td>
        {order.products.map((product) => (
          <div key={product._id} className="d-flex">
            <p>{product.menu.name}:</p>
            <p>{product.quantity}</p>
          </div>
        ))}
      </td>
      <td>{order.price}$</td>
      <td><button className="btn btn-danger"  onClick={() => deleteOrder(order._id)}>Order Sent</button></td>
      <td>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
          </tr>
        </tbody>
        ))}
      </table>
    </div>
  );
};

export default Orders;
