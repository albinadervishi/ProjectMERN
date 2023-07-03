import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import './Navbar.css';
import Logo from '../../images/foodIcon.jpg';
import userPhoto from '../../images/Group 2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';


const Navbar = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const logOut = () => {
    console.log('logging out');
    axios
        .post('http://localhost:8000/api/logout', {}, { withCredentials: 'same-origin' })
        .then((e) => {
            localStorage.removeItem('userId');
            navigate('/welcome');
        });
};


    return (
      <nav className="navbar navbar-expand navbar-light py-2  sticky-top">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="Red onion logo" />
          </Link>

          <ul className="navbar-nav align-items-center "> 
          <li className="nav-item">
              <Link to="/"  className="nav-link text-dark d-flex  align-items-center">
                <h5 >Home</h5>
              </Link>
            </li> 

            <li className="nav-item">
              <Link to="/menu"  className="nav-link text-dark d-flex  align-items-center">
                <h5 >Menu</h5>
              </Link>
            </li> 

            <li className="nav-item">
              <Link to="/about"  className="nav-link text-dark d-flex  align-items-center">
                <h5 >About Us</h5>
              </Link>
            </li> 
          </ul>

          <ul className="navbar-nav align-items-center ">
            <li className="nav-item">
              <Link to="/checkout" className="text-dark">
                <FontAwesomeIcon icon={faCartArrowDown} />
                <span className='badge bg-dark'>{props.cart.length}</span>
              </Link>
            </li>

            <li className="nav-item d-flex align-items-center">
              <Link to="/account" className="nav-link text-dark d-flex  align-items-center" >
                <p style={{ marginRight: '8px' }} className="mb-0">Albina</p>
                <img src={userPhoto} width="40px" alt="" />
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/welcome" className="nav-link">
                <button className="btn btn-danger btn-rounded" onClick={logOut}>Sign Out</button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
}

export default Navbar;

