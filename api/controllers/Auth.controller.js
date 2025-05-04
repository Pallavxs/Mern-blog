import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { compare } from 'bcryptjs';

export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const checkuser = await User.findOne({ email });
    if (checkuser) {
      // user already exist
      return next(handleError(409, "User already registered"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    // register user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Registration successful...",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use the imported compare function directly
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      process.env.JWT_SECRET
    );

    // Set cookie and remove password from user object
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.status(200).json({ 
      success: true,
      user: userWithoutPassword,
      message: "Login successful"
    });
  } catch (error) {
    console.error(error);
    return next(handleError(500, "Server error"));
  }
};

export const GoogleLogin = async (req, res, next) => {
  try {
     // Create new User
    const { name, avatar, email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      const password = Math.random().toString()
      const hashedPassword = bcryptjs.hashSync(password)
      const newUser = new User({
        name , email , password : hashedPassword , avatar
      })

      user = await newUser.save()

    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role 
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    res.status(200).json({
      success: true,
      user: newUser,
      message: "Login successful",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};


export const Logout = async (req, res, next) => {
  try {
    
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const user = await User.findById(userid);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.status(200).json({
      success: true,
      user: userWithoutPassword
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const userData = JSON.parse(req.body.data || '{}');
    
    if (userData.password && userData.password.trim() !== '') {
      userData.password = bcryptjs.hashSync(userData.password, 10);
    } else {
      delete userData.password;
    }
    
    if (req.file) {
      userData.avatar = req.file.path;
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      userid, 
      userData,
      { new: true } // Return the updated document
    );
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    const userWithoutPassword = updatedUser.toObject();
    delete userWithoutPassword.password;
    
    return res.status(200).json({
      success: true,
      message: "Data updated.",
      user: userWithoutPassword
    });
  } catch (error) {
    console.error("Update user error:", error);
    next(handleError(500, error.message));
  }
};