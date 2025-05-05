import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import Footer from './footer';
import images from '../images';
import { BASE_URL } from '../url';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setUser } from '../redux/features/userSlice'; // Import setUser action

const Login = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });


      if (res.data.success) {
        const authToken = res.data.authToken;
        const userData = res.data.user; // Assuming the user data is returned

        // Save the token to localStorage
        localStorage.setItem('token', authToken);

        // Dispatch setUser with the user data
        console.log("Userdata is: ",userData);
        dispatch(setUser(userData));

        // Redirect to home page
        alert('Login successfully!!!');
        navigate('/');
      } else if (res.data.error === 'User not register, please register first') {
        alert(res.data.error);
        navigate('/signup');
      } else {
        alert(res.data.error);
      }
    } catch (e) {
      setError('Something went wrong, please check the server');
      console.log(e);
    }
  }

  return (
    <>
      <div className="py-12 bg-gradient-to-br from-gray-200 via-pink-200 to-indigo-200">
        <div className="container mx-auto flex items-center ">
          <div className="w-1/2 p-4">
            <img id="accpgimg" src={images.image1} className="w-full h-full object-cover max-w-md rounded-lg" alt="Account Image" />
          </div>
          <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
            <div className="bg-white bg-opacity-50 p-8 rounded-md max-w-md w-full text-center">
              <form onSubmit={submit}>
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div className="mb-4 relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='name@company.com'
                    className="w-full py-2 px-3 border-b border-gray-300 focus:outline-none"
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-2 px-3 border-b border-gray-300 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex justify-between items-center mb-4">
                  <label className="flex items-center text-gray-500">
                    <input type="checkbox" className="mr-2" /> Remember me
                  </label>
                  <Link className="text-blue-500">Forgot Password?</Link>
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">Login</button>
                <div className="mt-4">
                  <p className="text-black">Don't have an account? <Link to="/signup" className="text-blue-500">Register</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
