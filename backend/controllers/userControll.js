const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// ================= REGISTER =================
exports.userRegistration = async (req, res) => {
  try {

    const { fullName, email, password } = req.body;

    // CHECK FIELDS
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields properly",
      });
    }

    // CHECK EXISTING USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER DATA
    const userdata = {
      fullName,
      email,
      password: hashedPassword,
    };

    // SAVE USER
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

    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    // CHECK FIELDS
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    // FIND USER
    const user = await User.findOne({ email });

    console.log("USER:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    console.log("DB PASSWORD:", user.password);

    // COMPARE PASSWORD
    const ismatch = await bcrypt.compare(
      String(password),
      String(user.password)
    );

    console.log("MATCH:", ismatch);

    if (!ismatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // JWT TOKEN
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30min" }
    );

    // REMOVE PASSWORD
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