import React from 'react';
import { Link } from 'react-router-dom';
import video2 from "../../images/bg-video.mp4";
import './Banner.css';

const Banner = () => {
  return (
    <section className="banner d-flex align-items-center justify-content-start">
      <div className="container">
        <div className="video-background">
          <video autoPlay muted loop id="video-background">
            <source src={video2} type="video/mp4" />
          </video>
        </div>
        <div className="content">
          <h1 className="text-left">Experience your best meal ever!</h1>
          <div className="my-5 mx-auto">
            <Link to="/menu">
              <button className="btn order-btn text-left">Order Now</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
