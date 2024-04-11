import User from "../models/user.model.js";
export const getUserForSidebar = async (req, res) => {
    const loggedinuser=req.user._id;
    try {
        const filteredUser=await User.find({_id:{$ne:loggedinuser}}).select("-password");//select all users except the logged in user
        res.status(200).json(filteredUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}