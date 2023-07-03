import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = () => {


    return (
        <section className='banner d-flex align-items-center justify-content-start'>
            <div className='container '>
                <h1 className="text-left">Experience your best meal ever!</h1>

                <div className='my-5 mx-auto '>
                    <Link to={'/menu'}>
                        <button
                            className='btn order-btn text-left '
                        >
                            Order Now
                    </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Banner;