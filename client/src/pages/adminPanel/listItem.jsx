import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../url';

const ListItem = () => {
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null); // Track which product is being edited
  const [newProduct, setNewProduct] = useState({}); // Track the product's updated details
  const dropdownRef = useRef();

  useEffect(() => {
    fetchProducts();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getProduct`);
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        const res = await axios.delete(`${BASE_URL}/deleteProduct`, { data: { id } });
        setNotification(res.data.message);
        setTimeout(() => {
          setNotification('');
        }, 3000);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product._id); // Set the product to edit
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description || '', // Initialize description
      discountPrice: product.discountPrice,
      stockQuantity: product.stockQuantity,
      brand: product.brand,
      type: product.type,
      isActive: product.isActive,
      images: product.images,
      ...product, // Fetch and set all other product details from the backend
    });
  };


  const handleUpdate = async () => {
    try {
      setNotification("Please wait");
      const response = await axios.put(`${BASE_URL}/updateProduct`, newProduct);
      setNotification(response.data.message);
      setTimeout(() => setNotification(''), 3000);
      setEditingProduct(null); // Close the form after editing
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const productTypes = {
    Furniture: ['Chair', 'Table', 'Bed', 'Storage'],
    Kitchen: ['Mixer', 'Juicer', 'Knife'],
    Electronic: ['Laptop', 'Smartphone', 'Tablet'],
    Jewellery: ['Mangtika', 'Earing', 'Nose', 'Nathiya', 'Har', 'Chain', 'Bracelet', 'Ring', 'Payal', 'Meena', 'Kardhan'],
  };

  const toggleDropdown = (id) => {
    setDropdownOpen((prev) => (prev === id ? null : id));
  };

  const activeProducts = products.filter(product => product.isActive && product.type !== "ExclusiveAvailable");
  const inactiveProducts = products.filter(product => !product.isActive && product.type !== "ExclusiveAvailable");
  const exclusivelyAvailableProducts = products.filter(product => product.type === "ExclusiveAvailable");

  return (
    <div>
      {notification && (
  <div className="fixed right-4 top-4 bg-green-500 text-white text-center p-4 rounded-md shadow-lg z-50">
    {notification}
  </div>
)}


      <h2 className="py-2 text-xl font-semibold">Active Product List</h2>
      <table className="bg-white shadow-lg rounded-lg p-4 mx-auto w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-4 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 text-left">Category</th>
            <th className="py-2 text-left">Price</th>
            <th className="py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {activeProducts.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">No products available.</td>
            </tr>
          ) : (
            activeProducts.map((product) => (
              <React.Fragment key={product._id}>
                <tr className="border-b">
                  <td className="py-2 px-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-2">{product.name}</td>
                  <td className="py-2">{product.category}</td>
                  <td className="py-2">${product.price.toFixed(2)}</td>
                  <td className="py-2">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                        onClick={() => toggleDropdown(product._id)}
                      >
                        &#8230;
                      </button>
                      {dropdownOpen === product._id && (
                        <div
                          ref={dropdownRef}
                          className="absolute right-0 z-10 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        >
                          <div className="py-1">
                            <button
                              className="text-gray-700 block px-3 py-1 text-sm hover:bg-gray-100 w-full text-left"
                              onClick={() => handleEdit(product)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-gray-700 block px-3 py-1 text-sm hover:bg-gray-100 w-full text-left"
                              onClick={() => handleDelete(product._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                {/* Expanded area for editing */}
                {editingProduct === product._id && (
                  <tr className="border-b bg-gray-50">
                    <td colSpan="5" className="p-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Product Name</label>
                          <input
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="col-span-2 p-3 border rounded-md w-full sm:w-1/2 min-w-[600px]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Description</label>
                          <textarea
                            type="text"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            className="col-span-2 p-3 border rounded-md w-full sm:w-1/2 min-w-[600px]"
                            row = "5"
                          />
                        </div>

                        {/* Category, Price and Discount Price in one line */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-1/2">
                        <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Category</label>
                        <select
                          name="category"
                          value={newProduct.category}
                          onChange={(e) => {
                            const selectedCategory = e.target.value;
                            // handleChange(e);
                            // Reset type to the first option of the selected category
                            setNewProduct ({
                              ...newProduct,
                              category: selectedCategory,
                              type: productTypes[selectedCategory][0],
                            })
                          }}
                          className="p-2 border rounded-md w-2/3"
                        >
                          {Object.keys(productTypes).map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        </div>

                          {/* <div className="flex flex-col">
                          <label className="mb-1 text-sm font-medium">Category</label>
                          <select
                            name="category"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            className="p-2 border rounded-md w-2/3" // Set width to 60px for a smaller box
                          >
                            <option value="Furniture">Furniture</option>
                            <option value="Kitchen">Kitchen</option>
                            <option value="Electronic">Electronic</option>
                            <option value="Jewellery">Jewellery</option>
                          </select>
                        </div> */}

                        <div className="flex flex-col">
                          <label className="mb-1 text-sm font-medium">Price</label>
                          <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                            className="p-2 border rounded-md w-1/2" // Set width to 60px for a smaller box
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="mb-1 text-sm font-medium">Discount Price</label>
                          <input
                            type="number"
                            name="discountPrice"
                            value={newProduct.discountPrice}
                            onChange={(e) => setNewProduct({ ...newProduct, discountPrice: parseFloat(e.target.value) })}
                            placeholder="Discount Price"
                            className="p-2 border rounded-md w-1/2" // Set width to 60px for a smaller box
                          />
                        </div>
                      </div>

                            {/* Stock Quantity and Brand in one line */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-1/2">
                          <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">Stock Quantity</label>
                            <input
                              type="number"
                              name="stockQuantity"
                              value={newProduct.stockQuantity}
                              onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })} // Corrected the state update to stockQuantity
                              className="p-2 border rounded-md w-2/3" // Fixed width of 300px, responsive
                            />
                          </div>
                          
                          <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">Brand</label>
                            <input
                              type="text"
                              name="brand"
                              value={newProduct.brand}
                              onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} // Corrected the state update to brand
                              placeholder="Brand"
                              className="p-2 border rounded-md w-1/2" // Fixed width of 300px, responsive
                            />
                          </div>

                          <div className="flex flex-col"> {/* Use col-span-2 to take full width */}
                          <label className="mb-1 text-sm font-medium">Status</label>
                            <select
                              name="status"
                              value={newProduct.isActive ? "Active" : "Inactive"}
                              onChange={(e) => setNewProduct({ ...newProduct, isActive: e.target.value === "Active" })}
                              className="p-2 border rounded-md w-1/2" // Fixed width of 300px, responsive
                            >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                          </div>

                          <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">Type</label>
                            <select
                              name="type"
                              value={newProduct.type}
                              onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                              className="p-2 border rounded-md w-2/3"
                            >
                              {productTypes[newProduct.category]?.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </div>
                      </div>

                      

                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Images</label>
                          <div className="flex space-x-4">
                            {newProduct.images.map((image, index) => (
                              <div key={index} className="flex flex-col items-center">
                                <img
                                  src={image}
                                  alt={`Product ${index + 1}`}
                                  className="w-16 h-16 object-cover rounded-md mb-2"
                                />
                                
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end">
                        <div className="flex space-x-2 justify-start">
                        <button
                           className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105"
                           onClick={handleUpdate}
                        >
                           Update
                        </button>
                        <button
                           className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 transition duration-200 ease-in-out transform hover:scale-105"
                           onClick={() => setEditingProduct(null)}
                         >
                           Cancel
                         </button>
                       </div>

                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>




      <h2 className="py-4 text-xl font-semibold">Inactive Product List</h2>
      <table className="bg-white shadow-lg rounded-lg p-4 mx-auto w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-4 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 text-left">Category</th>
            <th className="py-2 text-left">Price</th>
            <th className="py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {inactiveProducts.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">No products available.</td>
            </tr>
          ) : (
            inactiveProducts.map((product) => (
              <React.Fragment key={product._id}>
                <tr className="border-b">
                  <td className="py-2 px-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-2">{product.name}</td>
                  <td className="py-2">{product.category}</td>
                  <td className="py-2">${product.price.toFixed(2)}</td>
                  <td className="py-2">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                        onClick={() => toggleDropdown(product._id)}
                      >
                        &#8230;
                      </button>
                      {dropdownOpen === product._id && (
                        <div
                          ref={dropdownRef}
                          className="absolute right-0 z-10 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        >
                          <div className="py-1">
                            <button
                              className="text-gray-700 block px-3 py-1 text-sm hover:bg-gray-100 w-full text-left"
                              onClick={() => handleEdit(product)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-gray-700 block px-3 py-1 text-sm hover:bg-gray-100 w-full text-left"
                              onClick={() => handleDelete(product._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                {/* Expanded area for editing */}
                {editingProduct === product._id && (
                  <tr className="border-b bg-gray-50">
                    <td colSpan="5" className="p-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Product Name</label>
                          <input
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="col-span-2 p-3 border rounded-md w-full sm:w-1/2 min-w-[600px]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Description</label>
                          <textarea
                            type="text"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            className="col-span-2 p-3 border rounded-md w-full sm:w-1/2 min-w-[600px]"
                            row = "5"
                          />
                        </div>

                        {/* Category, Price and Discount Price in one line */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-1/2">
                        <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Category</label>
                        <select
                          name="category"
                          value={newProduct.category}
                          onChange={(e) => {
                            const selectedCategory = e.target.value;
                            // handleChange(e);
                            // Reset type to the first option of the selected category
                            setNewProduct ({
                              ...newProduct,
                              category: selectedCategory,
                              type: productTypes[selectedCategory][0],
                            })
                          }}
                          className="p-2 border rounded-md w-2/3"
                        >
                          {Object.keys(productTypes).map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        </div>

                          {/* <div className="flex flex-col">
                          <label className="mb-1 text-sm font-medium">Category</label>
                          <select
                            name="category"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            className="p-2 border rounded-md w-2/3" // Set width to 60px for a smaller box
                          >
                            <option value="Furniture">Furniture</option>
                            <option value="Kitchen">Kitchen</option>
                            <option value="Electronic">Electronic</option>
                            <option value="Jewellery">Jewellery</option>
                          </select>
                        </div> */}

                        <div className="flex flex-col">
                          <label className="mb-1 text-sm font-medium">Price</label>
                          <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                            className="p-2 border rounded-md w-1/2" // Set width to 60px for a smaller box
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="mb-1 text-sm font-medium">Discount Price</label>
                          <input
                            type="number"
                            name="discountPrice"
                            value={newProduct.discountPrice}
                            onChange={(e) => setNewProduct({ ...newProduct, discountPrice: parseFloat(e.target.value) })}
                            placeholder="Discount Price"
                            className="p-2 border rounded-md w-1/2" // Set width to 60px for a smaller box
                          />
                        </div>
                      </div>

                            {/* Stock Quantity and Brand in one line */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-1/2">
                          <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">Stock Quantity</label>
                            <input
                              type="number"
                              name="stockQuantity"
                              value={newProduct.stockQuantity}
                              onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })} // Corrected the state update to stockQuantity
                              className="p-2 border rounded-md w-2/3" // Fixed width of 300px, responsive
                            />
                          </div>
                          
                          <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">Brand</label>
                            <input
                              type="text"
                              name="brand"
                              value={newProduct.brand}
                              onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} // Corrected the state update to brand
                              placeholder="Brand"
                              className="p-2 border rounded-md w-1/2" // Fixed width of 300px, responsive
                            />
                          </div>

                          <div className="flex flex-col"> {/* Use col-span-2 to take full width */}
                          <label className="mb-1 text-sm font-medium">Status</label>
                            <select
                              name="status"
                              value={newProduct.isActive ? "Active" : "Inactive"}
                              onChange={(e) => setNewProduct({ ...newProduct, isActive: e.target.value === "Active" })}
                              className="p-2 border rounded-md w-1/2" // Fixed width of 300px, responsive
                            >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                          </div>

                          <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">Type</label>
                            <select
                              name="type"
                              value={newProduct.type}
                              onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                              className="p-2 border rounded-md w-2/3"
                            >
                              {productTypes[newProduct.category]?.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </div>
                      </div>

                      

                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Images</label>
                          <div className="flex space-x-4">
                            {newProduct.images.map((image, index) => (
                              <div key={index} className="flex flex-col items-center">
                                <img
                                  src={image}
                                  alt={`Product ${index + 1}`}
                                  className="w-16 h-16 object-cover rounded-md mb-2"
                                />
                                
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end">
                        <div className="flex space-x-2 justify-start">
                        <button
                           className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105"
                           onClick={handleUpdate}
                        >
                           Update
                        </button>
                        <button
                           className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 transition duration-200 ease-in-out transform hover:scale-105"
                           onClick={() => setEditingProduct(null)}
                         >
                           Cancel
                         </button>
                       </div>



                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>




      <h2 className="py-4 text-xl font-semibold">Exclusive Available Product List</h2>
      <table className="bg-white shadow-lg rounded-lg p-4 mx-auto w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-4 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 text-left">Category</th>
            <th className="py-2 text-left">Price</th>
            <th className="py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {exclusivelyAvailableProducts.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">No products available.</td>
            </tr>
          ) : (
            exclusivelyAvailableProducts.map((product) => (
              <React.Fragment key={product._id}>
                <tr className="border-b">
                  <td className="py-2 px-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-2">{product.name}</td>
                  <td className="py-2">{product.category}</td>
                  <td className="py-2">${product.price.toFixed(2)}</td>
                  <td className="py-2">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                        onClick={() => toggleDropdown(product._id)}
                      >
                        &#8230;
                      </button>
                      {dropdownOpen === product._id && (
                        <div
                          ref={dropdownRef}
                          className="absolute right-0 z-10 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        >
                          <div className="py-1">
                            <button
                              className="text-gray-700 block px-3 py-1 text-sm hover:bg-gray-100 w-full text-left"
                              onClick={() => handleEdit(product)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-gray-700 block px-3 py-1 text-sm hover:bg-gray-100 w-full text-left"
                              onClick={() => handleDelete(product._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                {/* Expanded area for editing */}
                {editingProduct === product._id && (
                  <tr className="border-b bg-gray-50">
                    <td colSpan="5" className="p-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Product Name</label>
                          <input
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="col-span-2 p-3 border rounded-md w-full sm:w-1/2 min-w-[600px]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Description</label>
                          <textarea
                            type="text"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            className="col-span-2 p-3 border rounded-md w-full sm:w-1/2 min-w-[600px]"
                            row = "5"
                          />
                        </div>

                        {/* Category, Price and Discount Price in one line */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-1/2">
                        <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Category</label>
                        <select
                          name="category"
                          value={newProduct.category}
                          onChange={(e) => {
                            const selectedCategory = e.target.value;
                            // handleChange(e);
                            // Reset type to the first option of the selected category
                            setNewProduct ({
                              ...newProduct,
                              category: selectedCategory,
                              type: productTypes[selectedCategory][0],
                            })
                          }}
                          className="p-2 border rounded-md w-2/3"
                        >
                          {Object.keys(productTypes).map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        </div>

                          {/* <div className="flex flex-col">
                          <label className="mb-1 text-sm font-medium">Category</label>
                          <select
                            name="category"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            className="p-2 border rounded-md w-2/3" // Set width to 60px for a smaller box
                          >
                            <option value="Furniture">Furniture</option>
                            <option value="Kitchen">Kitchen</option>
                            <option value="Electronic">Electronic</option>
                            <option value="Jewellery">Jewellery</option>
                          </select>
                        </div> */}

                        <div className="flex flex-col">
                          <label className="mb-1 text-sm font-medium">Price</label>
                          <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                            className="p-2 border rounded-md w-1/2" // Set width to 60px for a smaller box
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="mb-1 text-sm font-medium">Discount Price</label>
                          <input
                            type="number"
                            name="discountPrice"
                            value={newProduct.discountPrice}
                            onChange={(e) => setNewProduct({ ...newProduct, discountPrice: parseFloat(e.target.value) })}
                            placeholder="Discount Price"
                            className="p-2 border rounded-md w-1/2" // Set width to 60px for a smaller box
                          />
                        </div>
                      </div>

                            {/* Stock Quantity and Brand in one line */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-1/2">
                          <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">Stock Quantity</label>
                            <input
                              type="number"
                              name="stockQuantity"
                              value={newProduct.stockQuantity}
                              onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })} // Corrected the state update to stockQuantity
                              className="p-2 border rounded-md w-2/3" // Fixed width of 300px, responsive
                            />
                          </div>
                          
                          <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">Brand</label>
                            <input
                              type="text"
                              name="brand"
                              value={newProduct.brand}
                              onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} // Corrected the state update to brand
                              placeholder="Brand"
                              className="p-2 border rounded-md w-1/2" // Fixed width of 300px, responsive
                            />
                          </div>

                          <div className="flex flex-col"> {/* Use col-span-2 to take full width */}
                          <label className="mb-1 text-sm font-medium">Status</label>
                            <select
                              name="status"
                              value={newProduct.isActive ? "Active" : "Inactive"}
                              onChange={(e) => setNewProduct({ ...newProduct, isActive: e.target.value === "Active" })}
                              className="p-2 border rounded-md w-1/2" // Fixed width of 300px, responsive
                            >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                          </div>

                          <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">Type</label>
                            <select
                              name="type"
                              value={newProduct.type}
                              onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                              className="p-2 border rounded-md w-2/3"
                            >
                              {productTypes[newProduct.category]?.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </div>
                      </div>

                      

                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Images</label>
                          <div className="flex space-x-4">
                            {newProduct.images.map((image, index) => (
                              <div key={index} className="flex flex-col items-center">
                                <img
                                  src={image}
                                  alt={`Product ${index + 1}`}
                                  className="w-16 h-16 object-cover rounded-md mb-2"
                                />
                                
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end">
                        <div className="flex space-x-2 justify-start">
                        <button
                           className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105"
                           onClick={handleUpdate}
                        >
                           Update
                        </button>
                        <button
                           className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 transition duration-200 ease-in-out transform hover:scale-105"
                           onClick={() => setEditingProduct(null)}
                         >
                           Cancel
                         </button>
                       </div>



                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>

      
    </div>
  );
};

export default ListItem;
