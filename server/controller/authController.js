import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import User from "../models/user.js";
import { generateToken,generateTempToken,verifyToken } from "../config/secret.js";

const signup = async (req,res) => {
    console.log("Request body: ", req.body);
    let success = false;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.json({errors: errors.array() });
    }

    const {username, email, password} = req.body;
    const address = '';
    const phone = '';
    const gender = '';
    try{
        let user = await User.findOne({email});
        if(user){
            return res.json({success, error: "User already exist plz register with different email id"});
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            user = new User({
                username,
                email,
                password: hashedPassword,
                address,
                phone,
                gender,
            });

            await user.save();

            success = true;
            return res.json({ success , message: "You are sign in successfully"});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};

const login = async (req,res) => {
    let success = false;
    const errors = validationResult(req);  

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try{
        let user = await User.findOne({ email });
        if(!user){
            return res.json({ success, error: "User not registered; plz register first"});
        }

        const pwdCompare = await bcrypt.compare(password,user.password);
        if(!pwdCompare){
            return res.json({success, error: "Your password is incorrect"});
        }

        //if we reach here, it means email and password are correct
        success = true;
        const authToken = generateToken(user.id);
        res.json({success, authToken,user});
    } catch(error){
        console.log(error.message);
        res.status(500).send("Server error");
    }
};

const getUserData = async (req,res) => {
    const token = req.headers.authorization;
    //now verify and decode this token

    if(token){
        try{
            const decode = verifyToken(token);
            
            //now extact userId from the decode token
            const userId = decode.user.id;

            //Fetch user data from our database
            const user = await User.findById(userId);

            if(!user){
                return res.json({message: "User not found"});
            }
            user.password = undefined; //so that no one can get the password

            //return user data as json
            res.json({success: true, data: user});
        }
        catch(error){
            return res.json({message: "Invalid or expired token"});
        }
    }
    else{
        return res.json({message: "Token not provided"});
    }
}

const updateProfile = async (req, res) => {
    try {
        
        const { id, name, address, phone, gender } = req.body; // Extract data from request body
        const userId = id;
        console.log("UserId is: ",userId);
        // Update the user in the database

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                username: name,
                address,
                phone,
                gender,
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: 'Failed to update profile' });
    }
};

export {signup, login, getUserData,updateProfile};