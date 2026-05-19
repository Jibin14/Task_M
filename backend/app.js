const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: [
  "http://localhost:5173",
  "https://task-management-application-pr46xsdus.vercel.app",
],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRouter");

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

// Error Middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;