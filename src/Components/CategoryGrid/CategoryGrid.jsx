import React from 'react';
import './CategoryGrid.css';
import pc1 from "../Assets/pc1.jpg"
import pc2 from "../Assets/pc2.jpg"
import pc3 from "../Assets/pc3.jpg"
import pc4 from "../Assets/pc4.jpg"
import women1 from "../Assets/women1.jpg"
import men1 from "../Assets/men1.jpg"
import girl1 from "../Assets/girl1.jpg"
import boy1 from "../Assets/boy1.jpg"
import g1 from "../Assets/g1.jpg"
import g2 from "../Assets/g2.jpg"
import g3 from "../Assets/g3.jpg"
import g4 from "../Assets/g4.jpg"
import t1 from "../Assets/t1.jpg"
import t2 from "../Assets/t2.jpg"
import t3 from "../Assets/t3.jpg"
import t4 from "../Assets/t4.jpg"

const categoryData = [
  {
    title: "Combo Offer",
    items: [
      { label: "Women", img:women1 },
      { label: "Men", img: men1},
      { label: "Girls", img: girl1 },
      { label: "Boys", img: boy1},
    ],
    
  },
  {
    title: "Bundle Deal",
    items: [
      { label: "PC gaming", img: pc1 },
      { label: "Xbox", img: pc2},
      { label: "PlayStation", img: pc3 },
      { label: "Nintendo Switch", img: pc4},
    ],
    
  },
  {
    title: "Starter Kit",
    items: [
      { label: "Laptops", img: g1 },
      { label: "PCs", img: g2 },
      { label: "Hard Drives", img: g3 },
      { label: "Monitors", img: g4},
    ],
    
  },
  {
    title: "Essential kit",
    items: [
      { label: "Desktops", img: t1 },
      { label: "Laptops", img: t2 },
      { label: "Hard Drives", img: t3 },
      { label: "PC Accessories", img: t4 },
    ],
    
  }
];

const CategoryGrid = () => {
  return (
    <div className="category-grid">
      {categoryData.map((section, idx) => (
        <div key={idx} className="category-box">
          <h3>{section.title}</h3>
          <div className="category-items">
            {section.items.map((item, i) => (
              <div key={i} className="category-item">
                <img src={item.img} alt={item.label} />
                <p>{item.label}</p>
                
              </div>
             
            ))}
            <p>View all</p>
          </div>
        
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
