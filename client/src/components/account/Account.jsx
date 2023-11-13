import React , {useState, useEffect}from "react";
import './Account.css';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import userPhoto from '../../images/userPhoto.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';



const Account =()=>{
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const toggleEditMode = () => {
    setEditMode(prevEditMode => !prevEditMode);
  };
  
const userId =localStorage.getItem('userId')

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/`+ userId)
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmail(res.data.email);
        setPhoneNumber(res.data.phoneNumber);
        setAddress(res.data.address);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
      address
    };
  console.log(updatedUser);

    axios
      .patch(`http://localhost:8000/api/user/edit/` + userId, updatedUser)
      .then((res) => {
        console.log(res);
        setEditMode(prevEditMode => !prevEditMode);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <div className="accountInfo">
      <div>
        <h3>Personal Information</h3>
        <p>
          Manage your personal information, including phone number, address and
          email where you can be contacted
        </p>

        {editMode ? (
          <div className="accountContainer d-flex justify-content-around">
            <div className="photoContainer">
              <img src={userPhoto} width="100px" alt="" />
              <p>
                {firstName} {lastName}
              </p>
              <p>{email}</p>
              <button className="btn btn-danger btn-rounded mb-2 text-align" onClick={handleSave}>
              Save
            </button>
            </div>

            <div className="d-flex">
              <div className="infoRow">
                <div className="infoItem">
                  <p >Name:</p>
                  <input
                  class="form-control"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    class="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="infoItem">
                  <p>Email: </p>
                  <input
                    type="text"
                    class="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="infoRow">
                <div className="infoItem">
                  <p>Phone Number:</p>
                  <input
                    type="text"
                    class="form-control"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="infoItem">
                  <p>Address: </p>
                  <input
                    type="text"
                    class="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
           
          </div>
        ) : (
          <div className="accountContainer d-flex justify-content-around">
            <div className="photoContainer">
              <img src={userPhoto} width="100px" alt="" />
              <p>
                {firstName} {lastName}
              </p>
              <p>{email}</p>
              <FontAwesomeIcon icon={faPen} onClick={toggleEditMode}/>
            </div>

            <div className="d-flex">
              <div className="infoRow">
                <div className="infoItem" style={{height: "130px"}}>
                  <p onClick={toggleEditMode}>Name:</p>
                  <p>
                    {firstName} {lastName}
                  </p>
                </div>

                <div className="infoItem" style={{height: "130px"}}>
                  <p>Email: </p>
                  <p>{email}</p>
                </div>
              </div>

              <div className="infoRow">
                <div className="infoItem" style={{height: "130px"}}>
                  <p>Phone Number:</p>
                  <p> {phoneNumber}</p>
                </div>

                <div className="infoItem" style={{height: "130px"}}>
                  <p>Address: </p>
                  <p>{address}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;