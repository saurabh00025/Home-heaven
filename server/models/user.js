import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema ({

    username: {
        type: String,
        required: true,
    },

    address: {
        type: String,
    },

    gender: {
        type: String,
    },

    phone: {
        type: Number,
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["admin","User"],
        required: true,
        default: "User"
    },

    // additionalDetails: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Profile",
    // },
    // token: {
    //     type: String,
    // },
    // resetPasswordExpires: {
    //     type: Date,
    // },
    // image: {
    //     type: String,
    // },
} , { timestamps : true});
 // Add timestamps for when the document is created and modified
const User = mongoose.model("User",UserSchema);

export default User;