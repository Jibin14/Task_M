const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
exports.userRegistration = async (req, res) => {
  try {

    let { fullName, email, password } = req.body;

    // REMOVE EXTRA SPACES
    fullName = fullName?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();

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

    // CREATE USER
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

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

    let { email, password } = req.body;

    // REMOVE EXTRA SPACES
    email = email?.trim().toLowerCase();
    password = password?.trim();

    console.log("REQ BODY:", req.body);

    // CHECK FIELDS
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    // FIND USER
    const user = await User.findOne({ email });

    console.log("DB USER:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    console.log("ENTERED PASSWORD:", password);
    console.log("DB HASH:", user.password);

    // COMPARE PASSWORD
    const ismatch = await bcrypt.compare(
      password,
      user.password
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
        role: user.role,
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

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};