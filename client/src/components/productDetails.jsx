import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Footer from '../components/footer';
import { BASE_URL } from '../url';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const user = useSelector((state) => state.user.user);
  const userId = user ? user._id : null; // Extract user ID safely
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/getProductById/${productId}`);
        
        if (data.isActive === false) {
          setIsActive(false);
          return; // Exit if product is inactive
        }

        setProduct(data);
        setSelectedImage(data.images[0]); // Set the initial image to the first image
        fetchRelatedProducts(data.category, data.type, data._id);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    const fetchRelatedProducts = async (category, type, currentProductId) => {
      try {
        const { data } = await axios.get(`${BASE_URL}/getProductByCategoryAndType?category=${category}&type=${type}`);
        const filteredProducts = data.filter((relatedProduct) => relatedProduct._id !== currentProductId);
        setRelatedProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    if (!userId) {
      toast.error('Please log in first to add items to your cart.');
      navigate('/login'); // Navigate to the login page
      return;
    }
    try {
      const cartItem = {
        name: product.name,
        userId,
        productId: product._id,
        image: product.images[0],
        price: product.price,
        discountPrice: product.discountPrice,
        quantity: quantity,
      };
      const res = await axios.post(`${BASE_URL}/addItem`, cartItem);
      toast.success(res.data.message); // Show success notification
    } catch (error) {
      console.log('Error adding product to cart:', error);
      toast.error('Failed to add product to cart'); // Show error notification
    }
  };

  const addToWishlist = async () => {
    if (!userId) {
      toast.error('Please log in first to add items to your wishlist.');
      navigate('/login'); // Navigate to the login page
      return;
    }
    try {
      const wishlistItem = {
        name: product.name,
        userId,
        productId: product._id,
        image: product.images[0],
        price: product.price,
        discountPrice: product.discountPrice
      };
      const res = await axios.post(`${BASE_URL}/addItemInWishlist`, wishlistItem);
      toast.success(res.data.message); // Show success notification
    } catch (error) {
      console.log('Error adding product to wishlist:', error);
      toast.error('Failed to add product to wishlist'); // Show error notification
    }
  };

  if (!isActive) return (
    <div className="bg-gray-100 border border-red-400 rounded-lg p-6 shadow-lg mt-4 mx-4">
      <h2 className="text-3xl font-bold text-red-500 mb-2">Product Not Available</h2>
    </div>
  );

  if (!product) return <div>Loading...</div>;

  const discountedPercentage = ((product.price - product.discountPrice) * 100) / product.price;

  return (
    <>
      <div className="container mx-auto p-3 rounded-lg shadow-lg">
        {/* Product details */}
        <div className="flex flex-col md:flex-row">
          {/* Main Product Section */}
          <div className="md:w-1/2 mb-4 md:mb-0">
            {/* Main Image */}
            <img src={selectedImage} className="w-full rounded-lg main-image" alt={product.name} />
            {/* Thumbnails */}
            <div className="flex justify-between mt-4 space-x-4">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`w-1/4 h-16 object-cover rounded-md cursor-pointer ${selectedImage === img ? 'border-2 border-blue-500' : ''}`}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setSelectedImage(img)} // Update selected image on thumbnail click
                />
              ))}
            </div>
          </div>
          <div className="md:w-1/2 md:pl-8">
            {/* Product Info */}
            <p className="text-gray-500 text-sm">Home / {product.category}</p>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>

            {/* Price Section */}
            <div className="mb-4">
              <h4 className="text-2xl font-semibold text-gray-700 mb-2">
                <span className="text-red-500 font-normal">-{discountedPercentage.toFixed(0)}%</span> {/* Red and less bold */}
                <span className="font-bold ml-2">${product.discountPrice.toFixed(2)}</span> {/* Discounted Price */}
              </h4>

              <p className="text-gray-500 text-lg">
                M.R.P <span className="line-through">${product.price.toFixed(2)}</span> {/* Only price is struck-through */}
              </p>
            </div>

            {/* Additional Features */}
            <div className="flex justify-between items-center space-x-6 mt-4 text-center text-base">
              {/* Various icons and features like Free Delivery, Replacement, etc. */}
            </div>

            {/* Quantity and Buttons */}
            <div className="flex justify-between items-center space-x-6 mt-6">
              {/* Quantity Selector */}
              <div className="flex items-center space-x-2">
                <label htmlFor="quantity" className="text-gray-700">Quantity:</label>
                <select
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))} // Update quantity state
                  className="border border-gray-300 rounded-md p-2 text-gray-700"
                >
                  {[1, 2, 3, 4, 5].map((qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  ))}
                </select>
              </div>
              {/* Add to Cart and Wishlist Buttons */}
              <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={addToCart}>
                Add to Cart
              </button>
              <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                onClick={addToWishlist}>
                Add to Wishlist
              </button>
            </div>

            {/* Additional Product Details */}
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="container mx-auto py-16">
          <h2 className="text-2xl font-bold text-gray-800">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct._id} className="col-4">
                <a href={`/productDetails/${relatedProduct._id}`} className="block mb-4">
                  <img src={relatedProduct.images[0]} alt={relatedProduct.name} className="w-full h-64 object-cover rounded-lg" />
                </a>
                <h3 className="text-lg font-semibold text-gray-700">{relatedProduct.name}</h3>
                <p className="text-sm text-gray-500">${relatedProduct.discountPrice.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </>
  );
};

export default ProductDetail;
