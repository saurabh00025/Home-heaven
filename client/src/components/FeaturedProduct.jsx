import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Five_star from './five_star';
import Four_star from './four_star';
import { BASE_URL } from '../url';
import axios from 'axios';

const FeaturedProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getProduct`);
        
        // Filter products whose type is not 'ExclusiveAvailable'
        const filteredProducts = response.data.filter(
          product => product.type !== "ExclusiveAvailable" && product.isActive === true
        );
        
        setProducts(filteredProducts || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);
  

  return (
    <div className="mx-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product._id} className="col-span-1">
          <Link to={`/productDetails/${product._id}`}>
            {/* Display only the first image */}
            <img src={product.images[0]} alt={product.name} />
          </Link>
          <h4>{product.name}</h4>
          {product.rating === 5 ? <Five_star /> : <Four_star />}
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProduct;
