import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ item }) => {
  return (
    <Link to={`/product/${item.id}`} className="card-link">
    <div className='card-content'>
      <img src={item.image} alt={item.title} className="card-image" />
      <h3 className="card-title">{item.title}</h3>
      <p className="card-price">${item.price}</p>
     <p className="card-description">{item.description}</p>
    </div>
    </Link>
  );
};

export default Card;
