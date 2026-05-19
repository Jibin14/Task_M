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

    const profilePhoto = req.file ? req.file.path : null;

    const userdata = {
      fullName,
      email,
      password,
      profilePhoto,
    };

    const user = await User.create(userdata);

    res.status(201).json({
      success: true,
      message: "User registration successful",
      user,
    });
  } catch (error) {
    fs.promises
      .unlink(req?.file?.path ?? "")
      .catch((err) =>
        console.log("File delete problem:", err)
      );

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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL USERS =================
exports.getAllusers = async (req, res) => {
  try {
    const Users = await User.find();

    if (!Users) {
      return res.status(404).json({
        success: false,
        message: "Users not found",
      });
    }

    res.status(200).json({
      success: true,
      Users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE USER STATUS =================
exports.updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.status = !user.status;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "User status updated",
      user: updatedUser,
    });
  } catch (error) {
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

// ================= UPDATE PROFILE =================
exports.updatedProfile = async (req, res) => {
  try {
    const { userId } = req;

    const { email, fullName } = req.body;

    const profilePhoto = req?.file?.path ?? null;

    if (!email || !fullName) {
      if (profilePhoto) {
        fs.promises
          .unlink(profilePhoto)
          .catch(() =>
            console.log("Error while deleting")
          );
      }

      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      if (profilePhoto) {
        fs.promises
          .unlink(profilePhoto)
          .catch(() =>
            console.log("Error while deleting")
          );
      }

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.email = email;
    user.fullName = fullName;

    if (profilePhoto) {
      user.profilePhoto = profilePhoto;
    }

    const updatedUser = await user.save();

    const updatedUserobject = updatedUser.toObject();

    delete updatedUserobject.password;

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUserobject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};