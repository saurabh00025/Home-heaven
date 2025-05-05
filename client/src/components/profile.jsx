import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../url';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  // console.log(user);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
    gender: 'male', // Default value
  });

  useEffect(() => {
    // Populate form data with existing user information
    if (user) {
      setFormData({
        id: user._id,
        name: user.username || '',
        address: user.address || '',
        phone: user.phone || '',
        gender: user.gender || 'male', // Set default gender if not available
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/updateProfile`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your token if needed
        },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-5">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block mb-1">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="gender" className="block mb-1">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
