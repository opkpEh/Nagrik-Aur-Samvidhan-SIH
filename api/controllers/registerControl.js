import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
// export const registerControl = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const user = await User