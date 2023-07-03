import React , {useState, useEffect}from "react";
import './Account.css';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const Account =()=>{
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

const userId =localStorage.getItem('userId')
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/`+ userId)
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmail(res.data.email);
        setImg(res.data.img);
        setPassword(res.data.password);
        setPhoneNumber(res.data.phoneNumber);
        setAddress(res.data.address);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    axios.patch('http://localhost:8000/api/user/edit/' + id, {
        firstName,
        lastName,
        email,    
        img,
        password,
        phoneNumber,
        address      
    })
        .then(res=>{
            console.log(res);
            navigate("/"); 
    })
    .catch(err=>(err ))
}

  return (
    <div className="accountInfo">
        <div className="accountContainer">
        <h3 className="mb-4">
        {firstName} {lastName}
      </h3>
      <div className="username d-flex justify-content-between align-center">
        <div class="form-outline mb-4">
          <label class="form-label" >FirstName</label>
          <input type="text" class="form-control" value={firstName} onChange = {(e)=>setFirstName(e.target.value)} />
        </div>

        <div class="form-outline mb-4">
          <label class="form-label" >LastName</label>
          <input type="text" class="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
      </div>

      <div class="form-outline mb-4">
        <label class="form-label" >Email address</label>
        <input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <div class="form-outline mb-4">
        <label class="form-label" >Password</label>
        <input type="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>

      <div class="form-outline mb-4">
          <label class="form-label" >Phone Number</label>
          <input type="text" class="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        
        <div class="form-outline mb-4">
          <label class="form-label" >Address</label>
          <input type="text" class="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        
        <button className="btn btn-light" onClick={handleSave}>Save</button>
        </div>
    </div>
  );
}

export default Account;