import React, { useState} from 'react';
import './Blog.css';
import blog1 from '../../images/blog/blog1.png';
import blog2 from '../../images/blog/blog2.png';
import blog3 from '../../images/blog/blog3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faArrowAltCircleLeft, faTaxi, faBellConcierge, faTruckFast } from '@fortawesome/free-solid-svg-icons';


const Blog = () => {

    const [descriptionCollapse, setDescriptionCollapse] = useState(false);
    const showMore = () => {
        setDescriptionCollapse(true);
    }

    const showLess = () => {
        setDescriptionCollapse(false);
    }

    return (
        <div className="container my-5">
          <div className="row">
            <div className="col-12">
              <h3 className="text-center mt-2 header-text">
                Why You Chose Us!
              </h3>
              <p className="mt-3 mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                sapiente eaque repellendus asperiores nisi! Architecto,
                praesentium eligendi consequatur inventore fuga eius totam
                officia adipisci. Nostrum quia soluta vel distinctio delectus!
              </p>
            </div>
          </div>

          <div className="col d-flex align-items-center justify-content-between">
            <div className="card">
              <img className="card-img-top" src={blog1} alt="blog-image" />
              <div className="card-body d-flex justify-content-between">
              <FontAwesomeIcon icon={faTruckFast} />
                  <div style={{ marginLeft: '10px' }}>
                    <h5>Quick Delivery</h5>
                    <p>
                      {descriptionCollapse ? (
                        <p>
                          {
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem iure in doloribus totam unde repellendus magni maxime ratione. Ea ratione vel suscipit enim nisi. Cupiditate, officiis dolor Molestiae, quod eveniet"
                          }
                        </p>
                      ) : (
                        <p>
                          {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus excepturi cum repellat inventore quam qui error ducimus quibusdam possimus tenetur obcaecati harum dolore, amet expedita sapiente eius. Laboriosam, soluta expedita".substr(
                            0,
                            100
                          )}
                        </p>
                      )}
                    </p>
                    {descriptionCollapse ? (
                      <span
                        onClick={showLess}
                        className="card-link collapse-btn"
                      >
                        {" "}
                        See Less{" "}
                        <FontAwesomeIcon
                          className="icon"
                          icon={faArrowAltCircleLeft}
                        />
                      </span>
                    ) : (
                      <span
                        onClick={showMore}
                        className="card-link collapse-btn"
                      >
                        See More{" "}
                        <FontAwesomeIcon
                          className="icon"
                          icon={faArrowAltCircleRight}
                        />
                      </span>
                    )}
                  </div>
              </div>
            </div>

            <div className="card">
              <img className="card-img-top" src={blog2} alt="blog-image" />
              <div className="card-body card-body d-flex justify-content-between">
              <FontAwesomeIcon icon={faBellConcierge} />
                  <div style={{ marginLeft: '10px' }}>
                    <h5>A good Auto Responder</h5>
                    <p>
                      {descriptionCollapse ? (
                        <p>
                          {
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem iure in doloribus totam unde repellendus magni maxime ratione. Ea ratione vel suscipit enim nisi. Cupiditate, officiis dolor Molestiae, quod eveniet"
                          }
                        </p>
                      ) : (
                        <p>
                          {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus excepturi cum repellat inventore quam qui error ducimus quibusdam possimus tenetur obcaecati harum dolore, amet expedita sapiente eius. Laboriosam, soluta expedita".substr(
                            0,
                            100
                          )}
                        </p>
                      )}
                    </p>
                    {descriptionCollapse ? (
                      <span
                        onClick={showLess}
                        className="card-link collapse-btn"
                      >
                        {" "}
                        See Less{" "}
                        <FontAwesomeIcon
                          className="icon"
                          icon={faArrowAltCircleLeft}
                        />
                      </span>
                    ) : (
                      <span
                        onClick={showMore}
                        className="card-link collapse-btn"
                      >
                        See More{" "}
                        <FontAwesomeIcon
                          className="icon"
                          icon={faArrowAltCircleRight}
                        />
                      </span>
                    )}
                  </div>
              </div>
            </div>

            <div className="card">
              <img className="card-img-top" src={blog3} alt="blog-image" />
              <div className="card-body d-flex justify-content-between">
              <FontAwesomeIcon icon={faTaxi} />
                  <div style={{ marginLeft: '10px' }}>
                    <h5>Home Delivery</h5>
                    <p>
                      {descriptionCollapse ? (
                        <p>
                          {
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem iure in doloribus totam unde repellendus magni maxime ratione. Ea ratione vel suscipit enim nisi. Cupiditate, officiis dolor Molestiae, quod eveniet"
                          }
                        </p>
                      ) : (
                        <p>
                          {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus excepturi cum repellat inventore quam qui error ducimus quibusdam possimus tenetur obcaecati harum dolore, amet expedita sapiente eius. Laboriosam, soluta expedita".substr(
                            0,
                            100
                          )}
                        </p>
                      )}
                    </p>
                    {descriptionCollapse ? (
                      <span
                        onClick={showLess}
                        className="card-link collapse-btn"
                      >
                        {" "}
                        See Less{" "}
                        <FontAwesomeIcon
                          className="icon"
                          icon={faArrowAltCircleLeft}
                        />
                      </span>
                    ) : (
                      <span
                        onClick={showMore}
                        className="card-link collapse-btn"
                      >
                        See More{" "}
                        <FontAwesomeIcon
                          className="icon"
                          icon={faArrowAltCircleRight}
                        />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

    );
}

export default Blog;