import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/features/userSlice';
import images from '../images';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../url';

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const username = user?.username || null;
  const userId = user?._id || null;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  let dropdownTimeout;

  useEffect(() => {
    const fetchCartItems = async () => {
      if (userId) {
        try {
          const response = await axios.get(`${BASE_URL}/getItembyUserId?userId=${userId}`);
          setCartItems(response.data);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchCartItems();
  }, [userId]);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    alert("Logout successfully");
    navigate("/");
  };

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout); // Clear any pending timeout
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 300); // Close dropdown after 1 second
  };

  const handleOptionClick = () => {
    setDropdownOpen(false); // Close the dropdown on option click
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 py-1">
      <div className="px-4 flex items-center justify-between">
        <Link to="/">
          <img className="rounded-full" style={{ height: 50 }} src={images.logo} alt="logo" />
        </Link>
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-md p-1 mx-2 flex-grow"
          style={{ maxWidth: '300px' }}
        />
        <ul className="flex items-center space-x-6">
          <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
          <li><Link to="products" className="hover:text-blue-500">Products</Link></li>
          <li><Link to="about" className="hover:text-blue-500">About</Link></li>
          <li><Link to="contact" className="hover:text-blue-500">Contact</Link></li>
          <li><Link to="faq" className="hover:text-blue-500">FAQ's</Link></li>

          {user ? (
            <>
              {user.role === 'admin' && (
                <li><Link to="/adminpanel" className="hover:text-blue-500">Admin Panel</Link></li>
              )}
              <li
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span
                  className="text-black-500 text-xm cursor-pointer hover:border hover:border-blue-500 hover:p-1 hover:rounded"
                >
                  Hello, {username}
                </span>
                {dropdownOpen && (
                  <div
                    className="absolute bg-white shadow-lg rounded-lg mt-2 w-64 left-1/2 transform -translate-x-36 z-10 border border-gray-300 transition duration-300 ease-in-out"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-4">
                      <div className="font-semibold text-lg text-gray-800"> {username}</div>
                      <div className="text-sm text-gray-600">Account Owner</div>
                      <Link
                        to="/profile"
                        className="block text-blue-600 hover:underline mt-1 transition duration-200"
                        onClick={handleOptionClick}
                      >
                        Manage Profile
                      </Link>
                    </div>
                    <div className="border-t my-1"></div>
                    <Link
                      to="/order"
                      className="block px-4 py-2 hover:bg-gray-100 transition duration-200"
                      onClick={handleOptionClick}
                    >
                      Your Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      className="block px-4 py-2 hover:bg-gray-100 transition duration-200"
                      onClick={handleOptionClick}
                    >
                      Your Wishlist
                    </Link>
                    <div className="border-t my-1"></div>
                    <button
                      onClick={() => {
                        handleLogout();
                        handleOptionClick();
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
              <li className="relative">
                <Link to="/cart" className="hover:text-blue-500">
                  <div className="relative">
                    <img className="w-8 h-8" src={images.cart} alt="cart-icon" />
                    {totalQuantity > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                        {totalQuantity}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            </>
          ) : (
            <li><Link to="login" className="hover:text-blue-500">Account</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
