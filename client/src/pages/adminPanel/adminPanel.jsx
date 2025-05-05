import React, { useState } from 'react';
import AddProduct from './addProduct';
import ListItem from './listItem';
import ExclusiveAvailable from './exclusiveAvailable';

function App() {
  const [selectedOption, setSelectedOption] = useState('Add Items');

  const renderContent = () => {
    switch (selectedOption) {
      case 'Add Items':
        return (
          <div>
            <AddProduct/>
          </div>
        );
      case 'List Items':
        return (
          <div>
            <ListItem/>
          </div>
        );
      case 'Order':
        return (
          <div className="content-box">
            <h2 className="text-3xl font-bold mb-4">Order Section</h2>
            <p className="text-gray-600">Here you can view customer orders and manage deliveries.</p>
          </div>
        );
      case 'Exclusive available product':
        return (
          <div>
            <ExclusiveAvailable/>
          </div>
        )
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
  {/* Sidebar with White Background */}
  <div className="w-64 bg-white text-gray-900 flex flex-col shadow-lg">
    <div className="sidebar-header p-6">
      <h3 className="text-center text-2xl font-bold tracking-wider">Dashboard</h3>
    </div>
    <ul className="flex flex-col space-y-2 px-4">
      <li
        onClick={() => setSelectedOption('Add Items')}
        className={`cursor-pointer p-4 rounded-md transition duration-300 ${
          selectedOption === 'Add Items' ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-gray-200'
        }`}
      >
        Add Items
      </li>
      <li
        onClick={() => setSelectedOption('List Items')}
        className={`cursor-pointer p-4 rounded-md transition duration-300 ${
          selectedOption === 'List Items' ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-gray-200'
        }`}
      >
        List Items
      </li>
      <li
        onClick={() => setSelectedOption('Order')}
        className={`cursor-pointer p-4 rounded-md transition duration-300 ${
          selectedOption === 'Order' ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-gray-200'
        }`}
      >
        Order
      </li>
      <li
        onClick={() => setSelectedOption('Exclusive available product')}
        className={`cursor-pointer p-4 rounded-md transition duration-300 ${
          selectedOption === 'Exclusive available product' ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-gray-200'
        }`}
      >
        Exclusive Availabe Product
      </li>
    </ul>
  </div>

  {/* Content Area with White Background and unified styling */}
  <div className="flex-grow rounded-lg mx-6 my-6">
    {renderContent()}
  </div>
</div>

  );
}

export default App;
