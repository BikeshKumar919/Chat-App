import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import generateToken from "../utils/generateToken.js";
export const login = async (req, res) => {
  const {username, password} = req.body;
  try{
    const user = await User.findOne({username});
    const hpassword=await bcrypt.compare(password,user?.password||"");
    if(!user || !hpassword){
      return res.status(400).json({error: "Invalid credentials"});
    }
    generateToken(user._id,res);
    res.status(200).json(
     {
       _id: user._id,
			fullname: user.fullname,
			username: user.username,
			profilePic: user.profilePic,
    }
    );
  }
  catch (error) {
    console.log(error);
    res.status(500).json({message: "Something went wrong"});
  }
}

export const signup = async (req, res) => { 
  const {fullname, username, password,confirmPassword,gender,profilePic} = req.body;
  try {
      if(password !== confirmPassword){
          return res.status(400).json({message: "Password does not match"});
      }
      const user=await User.findOne({username});
      if(user) {
          return res.status(400).json({message: "Username already exists"});
      }
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({fullname, username, password:hashedPassword,gender,profilePic:(gender==="male")?boyProfilePic:girlProfilePic});
    if(newUser){
      await newUser.save();
      await generateToken(newUser._id,res)
      res.status(200).json({message: "User created successfully"});
    }
    else{
      res.status(400).json({message: "invalid details"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Something went wrong"});
  }
}
export const logout = async (req, res) => { 
  try{
    res.clearCookie('token');
    res.status(200).json({message: "Logout successful"});
  }
  catch (error) {
    console.log(error);
    res.status(500).json({message: "Something went wrong"});
}
}