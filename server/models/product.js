import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String,
        enum: ['Furniture', 'Kitchen', 'Electronic', 'Jewellery'],
        required: true
    },
    price: { 
        type: Number, 
        required: true,
        min: [0, "Price cannot be negative"]
    },
    discountPrice: { 
        type: Number,
        validate: {
            validator: function(value) {
                return value < this.price;
            },
            message: "Discount price must be lower than the actual price"
        }
    },
    stockQuantity: { 
        type: Number,
        required: true,
        min: [0, "Stock quantity cannot be negative"]
    },
    brand: {
        type: String 
    },
    images: [{ 
        type: String, 
        required: true,
    }],
    isActive: {
        type: Boolean, 
        default: true 
    },
    type:{
        type: String,
    },
    date:{
        type: Number,
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
