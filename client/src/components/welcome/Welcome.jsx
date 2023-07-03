import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = ({setRefresh}) => {


    return (
        <section className='banner d-flex align-items-center justify-content-start'>
            <div className='container '>
                <h1 className="text-left">Welcome to Lorem!</h1>

                <div className='my-5  mx-auto '>
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
        </section>
    );
};

export default Welcome;