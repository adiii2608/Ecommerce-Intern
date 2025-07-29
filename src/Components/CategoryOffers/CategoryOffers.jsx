// src/components/CategoryOffers.jsx
import React from 'react';
import './CategoryOffers.css';
import groceryfree from '../Assets/groceryfree.png'
import grocery from '../Assets/grocery.png'
import strawberry from '../Assets/strawberry.png'
import mango from '../Assets/mango.png'
import cherry from '../Assets/cherry.png'
import fruit from '../Assets/fruit.png'


const offers = [
  { title: 'Daily Essentials', offer: 'UP TO 50% OFF', img: groceryfree },
  { title: 'Vegetables', offer: 'UP TO 60% OFF', img: grocery },
  { title: 'Fruits', offer: 'UP TO 55% OFF', img: fruit},
  { title: 'Strawberry', offer: 'UP TO 40% OFF', img: strawberry },
  { title: 'Mango', offer: 'UP TO 30% OFF', img: mango },
  { title: 'Cherry', offer: 'UP TO 20% OFF', img: cherry },
];

const CategoryOffers = () => {
  return (
    <div className="category-offers-container">
      {offers.map((item, index) => (
        <div className="offer-card" key={index}>
          <img src={item.img} alt={item.title} />
          <p className="title">{item.title}</p>
          <p className="discount">{item.offer}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryOffers;
