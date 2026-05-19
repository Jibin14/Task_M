const jwt = require("jsonwebtoken");

exports.userAuthentication = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token not found",
      });
    }

    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    const { userId, role } = decode;

    req.userId = userId;
    req.userRole = role;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};