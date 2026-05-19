// models/Task.js

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "#B8E7C8",
    },

    taskDate: {
      type: Date,
      required: true,
    },

    // REPEAT SETTINGS
    repeatEnabled: {
      type: Boolean,
      default: false,
    },

    repeatType: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      default: "daily",
    },

    repeatDays: {
      type: [String],
      default: [],
    },

    repeatDate: {
      type: Number,
      default: null,
    },

    // STORE COMPLETED DAYS
    completedDates: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Task",
  taskSchema
);