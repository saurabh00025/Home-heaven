import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import Footer from './footer';
import images from '../images';
import { BASE_URL } from '../url';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        username,
        email,
        password,
      });

      if (response.data.success) {
        alert("User registered successfully. Please login.");
        navigate("/login");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      setError("Error signing up, there is some problem.");
      console.log(error);
    }
  }

  return (
    <>
      <div className="py-12 bg-gradient-to-br from-gray-200 via-pink-200 to-indigo-200">
        <div className="container mx-auto flex items-center">
          <div className="w-1/2 p-4">
            <img
              id="accpgimg"
              src={images.image1}
              className="w-full h-full object-cover max-w-md rounded-lg"
              alt="Account Image"
            />
          </div>
          <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
            <div className="bg-white bg-opacity-50 p-8 rounded-md max-w-md w-full text-center">
              <form onSubmit={submit}>
                <h2 className="text-2xl font-bold mb-4">Signup</h2>

                <div className="mb-4 relative">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full py-2 px-3 border-b border-gray-300 focus:outline-none"
                    required
                  />
                </div>

                <div className="mb-4 relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
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
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Signup
                </button>

                <div className="mt-4">
                  <p className="text-black">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500">
                      Login
                    </Link>
                  </p>
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

export default Signup;
