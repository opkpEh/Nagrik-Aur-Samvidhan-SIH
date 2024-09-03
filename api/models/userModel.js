import mongoose from "mongoose";

// Features
/*
    - User Schema
    - User Model
    Name 
    Email
    Password

*/

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        length: 32
    },
    email: {
        type: String,
        required: 'Email is required',
        unque: true
    },
    password: {
        type: String,
        required: 'Password is required',
    }
});

const User = mongoose.model('User', userSchema);

export default User;