import express  from "express";
import { registerControl,loginControl } from "../controllers/authControl";

const router = express.Router();

router.post("/register", registerControl);
router.post("/login", loginControl);