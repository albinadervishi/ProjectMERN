import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./MenuBar.css";
import burger from "../../images/foodIcons/burger.mp4";
import drink from "../../images/foodIcons/toast.mp4";
import desserts from "../../images/foodIcons/cake.mp4";
import pizza from "../../images/foodIcons/pizza-delivery.mp4";
import beef from "../../images/foodIcons/ham.mp4";
import spaghetti from "../../images/foodIcons/spaghetti.mp4";

const MenuBar = () => {
  const [item, setItem] = useState([]);
	const [ selectedFoodType, setSelectedFoodType ] = useState('spaghetti');

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/menu")
      .then((res) => {
        console.log(res.data.menu);
        setItem(res.data.menu);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteItem = (itemId) => {
    axios
      .delete("http://localhost:8000/api/menu/" + itemId)
      .then((res) => {
        setItem(item.filter((item) => item._id != itemId));
      })
      .catch((err) => console.log(err));
  };
  
  const selectedFoods = item.filter((item) => item.type === selectedFoodType);

  return (
    <section className="food-area my-5">
      <div className="container">
        <nav>
          <ul className="nav justify-content-center mt-5">
            <li className="menuBar-item" onClick={() => setSelectedFoodType('spaghetti')}>
              <span to="spaghetti" className={selectedFoodType === 'spaghetti' ? 'active nav-link' : 'nav-link'}>
                <video
                  onMouseOver={(event) => event.target.play()}
                  onMouseOut={(event) => event.target.pause()}
                  src={spaghetti}
                  alt="foodIcon"
                  className="foodIcon mr-2"
                />
                <p>Spaghetti</p>
              </span>
            </li>
            <li className="menuBar-item" onClick={() => setSelectedFoodType('beef')}>
              <span to="beef" className={selectedFoodType === 'beef' ? 'active nav-link' : 'nav-link'}>
                <video
                  onMouseOver={(event) => event.target.play()}
                  onMouseOut={(event) => event.target.pause()}
                  src={beef}
                  alt="foodIcon"
                  className="foodIcon mr-2"
                />
                <p>Beef</p>
              </span>
            </li>
            <li className="menuBar-item" onClick={() => setSelectedFoodType('burger')}>
              <span to="burger" className={selectedFoodType === 'burger' ? 'active nav-link' : 'nav-link'}>
                <video
                  onMouseOver={(event) => event.target.play()}
                  onMouseOut={(event) => event.target.pause()}
                  src={burger}
                  alt="foodIcon"
                  className="foodIcon mr-2"
                />
                <p>Burger</p>
              </span>
            </li>
            <li className="menuBar-item" onClick={() => setSelectedFoodType('pizza')}>
              <span to="pizza" className={selectedFoodType === 'pizza' ? 'active nav-link' : 'nav-link'}>
                <video
                  onMouseOver={(event) => event.target.play()}
                  onMouseOut={(event) => event.target.pause()}
                  src={pizza}
                  alt="foodIcon"
                  className="foodIcon mr-2"
                />
                <p>Pizza</p>
              </span>
            </li>
            
            <li className="menuBar-item" onClick={() => setSelectedFoodType('desserts')}>
              <span to="desserts" className={selectedFoodType === 'desserts' ? 'active nav-link' : 'nav-link'}>
                <video
                  onMouseOver={(event) => event.target.play()}
                  onMouseOut={(event) => event.target.pause()}
                  src={desserts}
                  alt="foodIcon"
                  className="foodIcon mr-2"
                />
                <p>Desserts</p>
              </span>
            </li>
            <li className="menuBar-item" onClick={() => setSelectedFoodType('drinks')}>
              <span to="drinks" className={selectedFoodType === 'drinks' ? 'active nav-link' : 'nav-link'}>
                <video
                  onMouseOver={(event) => event.target.play()}
                  onMouseOut={(event) => event.target.pause()}
                  src={drink}
                  alt="foodIcon"
                  className="foodIcon mr-2"
                />
                <p>Drinks</p>
              </span>
            </li>
          </ul>
        </nav>

        <div className="row my-5">
            {selectedFoods.map((food, index) => (
              <div className="col-md-4" key={index}>
                <Link to={"/menu/" + food._id} className="d-flex">
                <div className="card text-center custom-width">
                  <img
                    src={food.imgURL}
                    alt="FoodItem"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 key={index + 1}>{food.name}</h5>
                    <p>{food.description}</p>
                    <h4>${food.price.toFixed(2)}</h4>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          
        </div>

        <div className="text-center">
          <button disabled className="btn btn-secondary">
            Check Out Your Food
          </button>
        </div>
      </div>
    </section>
  );
};

export default MenuBar;
