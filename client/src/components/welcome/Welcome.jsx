import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import video2 from "../../images/bg-video.mp4";
import './Welcome.css';

const Welcome = ({setRefresh}) => {


    return (
        <section className="banner d-flex align-items-center justify-content-start">
        <div className="container">
          <div className="video-background">
            <video autoPlay muted loop id="video-background">
              <source src={video2} type="video/mp4" />
            </video>
          </div>
          <div className="content">
            <h1 className="text-left">Welcome to Lorem!</h1>
            <div className="my-5 mx-auto">
            <Link to={'/login'}>
                        <button className='btn login-btn text-left'>
                            Log in
                    </button>
                    </Link>
                    <Link to={'/signup'}>
                        <button className='btn signup-btn text-left' style={{ marginLeft: '30px' }}>
                            Sign Up
                    </button>
                    </Link>
            </div>
          </div>
        </div>

        </section>
    );
};

export default Welcome;