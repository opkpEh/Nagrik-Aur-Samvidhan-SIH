import mongoose from "mongoose";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getUserFromCookie = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        // If no token is provided, proceed to the next middleware without authentication
        return next();
    }
    
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const userId = decoded._id;
    
        if (!userId) {
        return res.status(401).send('User not authenticated');
        }
    
        User.findById(userId)
        .then(user => {
            if (!user) {
            return res.status(401).send('User not authenticated');
            }
            req.user = user;
            next();
        })
        .catch(err => {
            next(err);
        });
    } catch (err) {
        console.log("Error verifying token:", err);
        return res.status(401).send('Invalid token');
    }
    }