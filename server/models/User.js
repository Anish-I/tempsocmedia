import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            min: 2,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true, // Corrected from 'require' to 'required'
            min: 5,
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: []
        }, // Added missing comma here
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema); // Changed "user" to "User" for consistency
export default User; // Corrected from 'user' to 'User'
