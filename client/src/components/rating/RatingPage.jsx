import React from "react";
import userPhoto from '../../images/Group 2.png';
import { Rating } from '@mui/material';
import './RatingPage.css'

const RatingPage = ()=>{
    return (
      <div className="rating-info d-flex align-items-center justify-content-around bg-secondary bg-opacity-50" >
        <div className="rating-card ">
          <Rating name="size-large" defaultValue={5} size="large" readOnly/>
          <p>"hello"</p>
          <div className="d-flex  align-items-center">
            <img className="mr-2" src={userPhoto} width="40px" alt="" />
            <p style={{ marginLeft: '8px' }} className="mb-0">albinadervishi@gmail.com</p>
          </div>
        </div>

        <div className="rating-card">
          <Rating name="size-large" defaultValue={5} size="large" readOnly/>
          <p>"hello"</p>
          <div className="d-flex  align-items-center">
            <img className="mr-2" src={userPhoto} width="40px" alt="" />
            <p style={{ marginLeft: '8px' }} className="mb-0">albinadervishi@gmail.com</p>
          </div>
        </div>

        <div className="rating-card ">
          <Rating name="size-large" defaultValue={5} size="large" readOnly/>
          <p>"hello"</p>
          <div className="d-flex  align-items-center">
            <img  src={userPhoto} width="40px" alt="" />
            <p style={{ marginLeft: '8px' }} className="mb-0" >albinadervishi@gmail.com</p>
          </div>
        </div>
      </div>
    );
}

export default RatingPage;