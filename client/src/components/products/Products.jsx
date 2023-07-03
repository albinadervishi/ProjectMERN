import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Products.css';
import pizza from '../../images/range/pizzaRR.png';
import burger from '../../images/range/burgerR.jpg';
import spaghetti from '../../images/range/spaghetti.jpg';
import beef from '../../images/range/beef.jpg';

const Products= () => {
  return (
    <div className='container'>
    <h1 className='text-center'> Our range of food</h1>
    <nav className='products'>
      
        <ImageListItem className='image-list-item'>
          <img
             src={beef}
             srcSet={beef}
             alt={"Beef"}
             loading="lazy"
          />
          <ImageListItemBar
           className='image-list-item-bar bg-light rounded-bottom'
            title={"Beef"}
            position="below"
            actionIcon={
                <FontAwesomeIcon icon={faArrowRight} />
              }
          />
        </ImageListItem>
      
        <ImageListItem className='image-list-item' >
          <img
             src={spaghetti}
             srcSet={spaghetti}
             alt={"Spaghetti"}
             loading="lazy"
          />
          <ImageListItemBar
           className='image-list-item-bar bg-light rounded-bottom'
            title={"Spaghetti"}
            position="below"
            actionIcon={
                <FontAwesomeIcon icon={faArrowRight} />
              }
          />
        </ImageListItem>

        <ImageListItem className='image-list-item'>
          <img
             src={burger}
             srcSet={burger}
             alt={"Burger"}
             loading="lazy"
          />
          <ImageListItemBar
           className='image-list-item-bar bg-light rounded-bottom'
            title={"Burgers"}
            position="below"
            actionIcon={
                <FontAwesomeIcon icon={faArrowRight} />
              }
          />
        </ImageListItem>

        <ImageListItem className='image-list-item'>
          <img
             src={pizza}
             srcSet={pizza}
             alt={"Pizza"}
             loading="lazy"
          />
          <ImageListItemBar
           className='image-list-item-bar bg-light rounded-bottom'
            title={"Pizza"}
            position="below"
            actionIcon={
                <FontAwesomeIcon icon={faArrowRight} />
              }
          />
        </ImageListItem>
    </nav>
    </div>
  );
}

export default Products;