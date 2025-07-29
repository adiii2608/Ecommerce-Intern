import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import { useCart } from '../Context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';



export const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
  if (product.id === 1) {
    toast.error('Out of Stock!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  } else {
    addToCart(product);
    toast.success('Added to Cart!', {
      position: 'top-right',
      autoClose: 2000,
      theme: "colored",
    });
  }
};

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="detail-container">
      <img src={product.image} alt={product.title} className="detail-image" />
      <div className="detail-info">
        <h2>{product.title}</h2>
        <p className="detail-price">${product.price}</p>
        <p>{product.description}</p>
        <p><strong>Category:</strong> {product.category}</p>
      
      <div className="star-rating">
  {[1, 2, 3, 4, 5].map((star) => {
    if (product.rating.rate >= star) {
      return <FontAwesomeIcon  style={{ color: 'gold' }} key={star} icon={faStar} />;
    } else if (product.rating.rate >= star - 0.5) {
      return <FontAwesomeIcon style={{ color: 'gold' }} key={star} icon={faStarHalfAlt} />;
    } else {
      return <FontAwesomeIcon style={{ color: 'gold' }} key={star} icon={faStarEmpty}  />;
    }
  })}
</div>


       <p><strong>Rating:</strong> {product.rating.rate} / 5</p>

       <button className='addbutton' onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};
