import express from "express";
import { getMyProfile, login, signUp } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";



const router = express.Router();

router.post("/login", login);

router.post("/signup", signUp);

router.get("/profile", isAuthenticated, getMyProfile);



export default router;