const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// ================= REGISTER =================
exports.userRegistration = async (req, res) => {
  try {

    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields properly",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const userdata = {
      fullName,
      email,
      password: hashedPassword,
    };

    const user = await User.create(userdata);

    // REMOVE PASSWORD FROM RESPONSE
    const userObject = user.toObject();
    delete userObject.password;

    res.status(201).json({
      success: true,
      message: "User registration successful",
      user: userObject,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGIN =================
exports.userLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    const ismatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!ismatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const options = {
      userId: user._id,
      role: user.role,
    };

    const token = jwt.sign(
      options,
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30min" }
    );

    const userObject = user.toObject();
    delete userObject.password;

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "User logged in successfully",
        user: userObject,
      });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGOUT =================
exports.logoutUser = async (req, res) => {
  try {

    res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "User logged out successfully",
      });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};