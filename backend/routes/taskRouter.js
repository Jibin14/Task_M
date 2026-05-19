const express = require("express");

const {
  createTask,
  updateTask,
  deleteTask,
  getTasksBySelectedDate,
  completeTaskForToday,
  getSingleTask,
} = require(
  "../controllers/taskController"
);

const {
  userAuthentication,
} = require(
  "../middleware/authentication"
);

const router = express.Router();

// =========================
// CREATE TASK
// =========================

router.post(
  "/create",
  userAuthentication,
  createTask
);

// =========================
// GET TASKS BY DATE
// =========================

router.get(
  "/by-date",
  userAuthentication,
  getTasksBySelectedDate
);

// =========================
// COMPLETE TASK
// =========================

router.put(
  "/complete/:id",
  userAuthentication,
  completeTaskForToday
);

// =========================
// GET SINGLE TASK
// =========================

router.get(
  "/:id",
  userAuthentication,
  getSingleTask
);

// =========================
// UPDATE TASK
// =========================

router.put(
  "/update/:id",
  userAuthentication,
  updateTask
);

// =========================
// DELETE TASK
// =========================

router.delete(
  "/delete/:id",
  userAuthentication,
  deleteTask
);

module.exports = router;