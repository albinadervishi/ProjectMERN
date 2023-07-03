import React, {useState, useEffect} from "react";
import './Orders.css';
import axios from "axios";

const Orders = () => {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:8000/api/order")
          .then((res) => {
            console.log(res.data.orders[3]);
            setOrder(res.data.orders);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

  return (
    <div className="order-table">
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Person Info</th>
            <th scope="col">Products</th>
            <th scope="col">Total Price</th>
          </tr>
        </thead>
        {order.map((orders, index) => (
        <tbody key={order._id}>
          <tr>
            <td><ul>
                <li>{orders.user.firstName}</li>
                <li>{orders.user.address}</li>
                <li>{orders.user.phoneNumber}</li>
            </ul></td>
            <td>
        {order.map((orders, index) => (
          <div key={order._id}>
            <p>{orders.products.menu}</p>
            <p>{}</p>
          </div>
        ))}
      </td>
      <td>{orders.price}</td>
          </tr>
        </tbody>
        ))}
      </table>
    </div>
  );
};

export default Orders;
