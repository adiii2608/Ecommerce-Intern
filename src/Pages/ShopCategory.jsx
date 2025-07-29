import React, { useEffect, useState } from 'react';
import Card from '../Components/Card/Card';
import './ShopCategory.css';

const ShopCategory = ({ type }) => {
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        // Filter by category
        const filtered = data.filter(item => {
          if (type === "all") return true;
          return item.category === type;
        });

        // Apply sorting
        let sorted = [...filtered];
        if (sortOrder === "lowToHigh") {
          sorted.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "highToLow") {
          sorted.sort((a, b) => b.price - a.price);
        }

        setItems(sorted);
      })
      .catch(err => console.error('Error fetching products:', err));
  }, [type, sortOrder]);

  return (
   <div className='temp'>
  {/* Sort Dropdown Outside Card Container */}
  <div className="sort-container">
    <label htmlFor="sort">Sort by:</label>
    <select
      id="sort"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="default">Default</option>
      <option value="lowToHigh">Price: Low to High</option>
      <option value="highToLow">Price: High to Low</option>
    </select>
  </div>

  {/* Card Container */}
  <div className="shop-category-container">
    {items.length === 0 ? (
      <p>No items found</p>
    ) : (
      items.map(item => <Card key={item.id} item={item} />)
    )}
  </div>
</div>

  );
};

export default ShopCategory;
