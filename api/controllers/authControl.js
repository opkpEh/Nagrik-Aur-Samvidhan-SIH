import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const registerControl = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "48h" });
        res.cookie("token", token, { expiresIn: "48h" });
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.log("Error in registerControl", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const loginControl = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User Not Found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Incorrect Password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "48h" });
        res.cookie("token", token, { expiresIn: "48h" });
        res.status(200).json({ message: "User logged in successfully" });
    }
    catch (error) {
        console.log("Error in loginControl", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}