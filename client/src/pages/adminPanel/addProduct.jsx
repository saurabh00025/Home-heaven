import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../url';

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: 'Furniture',
    price: '',
    discountPrice: '',
    stockQuantity: '',
    brand: '',
    type: '',
    images: Array(5).fill(''), // Initialize with empty strings for five images
  });

  const [notification, setNotification] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...newProduct.images];
      updatedImages[index] = file;
      setNewProduct((prev) => ({ ...prev, images: updatedImages }));
    }
  };

  const productTypes = {
    Furniture: ['Chair', 'Table', 'Bed', 'Storage'],
    Kitchen: ['Mixer', 'Juicer', 'Knife'],
    Electronic: ['Laptop', 'Smartphone', 'Tablet'],
    Jewellery: ['Mangtika', 'Earing', 'Nose', 'Nathiya', 'Har', 'Chain', 'Bracelet', 'Ring', 'Payal', 'Meena', 'Kardhan'],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if at least one image is uploaded
    const hasImage = newProduct.images.some((image) => image !== '');

    if (!hasImage) {
      alert('Please upload at least one image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('category', newProduct.category);
    formData.append('price', Number(newProduct.price));
    formData.append('discountPrice', Number(newProduct.discountPrice));
    formData.append('stockQuantity', Number(newProduct.stockQuantity));
    formData.append('brand', newProduct.brand);
    formData.append('type',newProduct.type);

    // Append images
    newProduct.images.forEach((image, index) => {
      if (image) {
        formData.append(`image${index + 1}`, image);
      }
    });

    try {
      setNotification("Please wait...");
      const res = await axios.post(`${BASE_URL}/addProduct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // alert('Product added successfully!');

      if (res.status === 200) {
        setNotification('Product added successfully!');
        setTimeout(() => {
          setNotification('');
        }, 3000);
      } else {
        setNotification('Unexpected response from server.');
        setTimeout(() => {
          setNotification('');
        }, 3000)
      }


      setNewProduct({
        name: '',
        description: '',
        category: 'Furniture',
        price: '',
        discountPrice: '',
        stockQuantity: '',
        brand: '',
        type: '',
        images: Array(5).fill(''), // Reset images
      });
    } catch (error) {
      console.error('Error creating product:', error);
      setNotification('Error adding product. Please try again.');
      setTimeout(() => {
        setNotification('');
      }, 3000);
    }
  };

  return (
    <>
      {notification && (
        <div className="fixed top-5 right-5 m-4 p-4 bg-blue-500 text-white rounded-md shadow-lg">
          {notification}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="col-span-2 p-3 border rounded-md w-full sm:w-1/2 min-w-[600px]"
        />

        <textarea
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="col-span-2 p-3 border rounded-md w-full sm:w-1/2 min-w-[600px]"
          rows="2"
        ></textarea>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      <select
        name="category"
        value={newProduct.category}
        onChange={(e) => {
          handleChange(e);
          // Reset type to the first option of the selected category
          setNewProduct((prev) => ({
            ...prev,
            type: productTypes[e.target.value][0],
          }));
        }}
        className="p-2 border rounded-md min-w-[300px]"
      >
        {Object.keys(productTypes).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="price"
        value={newProduct.price}
        onChange={handleChange}
        placeholder="Price"
        required
        className="p-2 border rounded-md min-w-[300px]"
      />

      <input
        type="number"
        name="discountPrice"
        value={newProduct.discountPrice}
        onChange={handleChange}
        placeholder="Discount Price"
        className="p-2 border rounded-md min-w-[300px]"
      />
    </div>

    <div className="col-span-2 w-1/2">
      <div className="grid grid-cols-3 gap-2">
        <input
          type="number"
          name="stockQuantity"
          value={newProduct.stockQuantity}
          onChange={handleChange}
          placeholder="Stock Quantity"
          required
          className="p-2 border rounded-md w-[300px] max-w-full"
        />

        <input
          type="text"
          name="brand"
          value={newProduct.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="p-2 border rounded-md w-[300px] max-w-full"
        />

        <select
          name="type"
          value={newProduct.type}
          onChange={handleChange}
          className="p-2 border rounded-md min-w-[300px]"
        >
          {productTypes[newProduct.category].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>

        {/* Image Upload Section */}
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mb-2">Upload Images</h3>
          <div className="flex space-x-4">
            {newProduct.images.map((image, index) => (
              <div
                key={index}
                className={`relative w-24 h-24 flex flex-col items-center justify-center cursor-pointer ${image ? '' : 'border-2 border-dashed border-gray-400 rounded-md'}`}
              >
                {image ? (
                  <>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                    <button
                      className="mt-1 text-sm text-white bg-gray-400 rounded-md px-1 py-0.5 hover:bg-gray-500 hover:text-white"
                      onClick={() => {
                        const updatedImages = [...newProduct.images];
                        updatedImages[index] = null; // Set the image back to null
                        setNewProduct((prev) => ({ ...prev, images: updatedImages }));
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <label className="flex flex-col items-center">
                    <span className="text-gray-500">Upload</span>
                    <span className="text-2xl">📤</span>
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(index, e)}
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="col-span-2 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-1/6"
        >
          Add Product
        </button>
      </form>
    </>
  );
};

export default AddProduct;
