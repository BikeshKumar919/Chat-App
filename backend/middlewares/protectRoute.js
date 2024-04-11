import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "You are not authorized for token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({ message: "You are not authorized for decoded" });
        }
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "You are not authorized for user" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "You are not authorized" });
    }
}