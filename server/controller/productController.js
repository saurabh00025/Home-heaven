import express from 'express';
import cors from 'cors';
import Product from "../models/product.js";
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
const app = express();
app.use(cors());

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Get a product by its id
const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId; // Assuming you're using /product/:id
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log('Error while getting product by id', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//get a product by its category
const getProductByCategoryAndType = async (req, res) => {
  try {
    const { category, type } = req.query; // Extract both category and type from query

    const query = {};
    
    // Only add category to the query if it is provided
    if (category) {
      query.category = category;
    }

    // Add type to the query
    if (type) {
      query.type = type;
    }
    // Query the database to find products that match both category and type
    const products = await Product.find(query);

    // If no products are found, return an appropriate response
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for the given category and type' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error while getting product by category and type', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Create a product
const addProduct = async (req, res) => {
  try {
    // console.log('Received request body:', req.body); // Log received data
    const {name,description,category,price,discountPrice,stockQuantity,brand,type} = req.body;
    
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const image5 = req.files.image5 && req.files.image5[0];

    const images = [image1,image2,image3,image4,image5].filter((item) => item !== undefined);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path,{resource_type: 'image'});
        return result.secure_url;
      })
    )

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      discountPrice: Number(discountPrice),
      stockQuantity: Number(stockQuantity),
      brand,
      type,
      images: imagesUrl,
      date : Date.now()
    }
    // console.log(productData);
    const product = new Product(productData);
    await product.save();
    console.log("Product addedd successfully");
    res.status(200).json({success: true, message: "Product added successfully"});
  } catch (error) {
    console.error('Error saving product:', error); // Log error
    res.status(500).json({ message: error.message });
  }
};


// Update a product by id
const updateProduct = async (req, res) => {
  try {
    const productId = req.body._id;
    const product = await Product.findById(productId);

    if(!product){
      return res.status(404).json({error: 'Product not found'});
    }

    product.name = req.body.name;
    product.category = req.body.category;
    product.price = req.body.price;
    product.description = req.body.description;
    product.discountPrice = req.body.discountPrice;
    product.stockQuantity = req.body.stockQuantity;
    product.brand = req.body.brand;
    product.isActive = req.body.isActive;
    product.type = req.body.type;
    product.images = req.body.images;

    // // Now save the product
    await product.save();
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.log('Error updating product', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  console.log(req.body);
  const productId = req.body.id; // Assuming productId comes from body
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log("Error while deleting product", error);
    res.status(500).json({ message: error.message });
  }
};

export {
  getProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductByCategoryAndType
};
