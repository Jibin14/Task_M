const Task = require("../models/tasks");

// ➤ CREATE TASK
exports.createTask = async (
  req,
  res
) => {
  try {
    const task =
      await Task.create(req.body);

    res.status(201).json({
      success: true,
      task,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ➤ COMPLETE TASK FOR TODAY ONLY
exports.completeTaskForToday =
  async (req, res) => {
    try {
      const task =
        await Task.findById(
          req.params.id
        );

      if (!task) {
        return res.status(404).json({
          success: false,
          message:
            "Task not found",
        });
      }

      // TODAY DATE
      const today = new Date()
        .toISOString()
        .split("T")[0];

      // ADD TODAY TO COMPLETED DATES
      if (
        !task.completedDates.includes(
          today
        )
      ) {
        task.completedDates.push(
          today
        );
      }

      await task.save();

      res.status(200).json({
        success: true,
        task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ➤ GET TASKS BY SELECTED DATE
exports.getTasksBySelectedDate =
  async (req, res) => {
    try {
      const { date } = req.query;

      if (!date) {
        return res.status(400).json({
          success: false,
          message:
            "Please provide a date",
        });
      }

      // SELECTED DATE
      const selectedDate =
        new Date(date);

      // FORMAT YYYY-MM-DD
      const formattedDate =
        selectedDate
          .toISOString()
          .split("T")[0];

      // START OF DAY
      const startDate =
        new Date(selectedDate);

      startDate.setHours(
        0,
        0,
        0,
        0
      );

      // END OF DAY
      const endDate =
        new Date(selectedDate);

      endDate.setHours(
        23,
        59,
        59,
        999
      );

      // WEEKDAY
      const weekdays = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ];

      const currentDay =
        weekdays[
          selectedDate.getDay()
        ];

      // MONTH DATE
      const currentDate =
        selectedDate.getDate();

      // FIND TASKS
      let tasks =
        await Task.find({
          $or: [
            // NORMAL TASK
            {
              taskDate: {
                $gte: startDate,
                $lte: endDate,
              },
            },

            // DAILY REPEAT
            {
              repeatEnabled: true,
              repeatType: "daily",
            },

            // WEEKLY REPEAT
            {
              repeatEnabled: true,
              repeatType: "weekly",
              repeatDays:
                currentDay,
            },

            // MONTHLY REPEAT
            {
              repeatEnabled: true,
              repeatType:
                "monthly",
              repeatDate:
                currentDate,
            },
          ],
        }).sort({
          createdAt: -1,
        });

      // ADD COMPLETED STATUS
      tasks = tasks.map(
        (task) => ({
          ...task._doc,

          completedToday:
            task.completedDates?.includes(
              formattedDate
            ) || false,
        })
      );

      res.status(200).json({
        success: true,
        tasks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ➤ GET SINGLE TASK
exports.getSingleTask =
  async (req, res) => {
    try {
      const task =
        await Task.findById(
          req.params.id
        );

      if (!task) {
        return res.status(404).json({
          success: false,
          message:
            "Task not found",
        });
      }

      res.status(200).json({
        success: true,
        task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ➤ UPDATE TASK
exports.updateTask = async (
  req,
  res
) => {
  try {
    const task =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!task) {
      return res.status(404).json({
        success: false,
        message:
          "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

// ➤ DELETE TASK
exports.deleteTask = async (
  req,
  res
) => {
  try {
    const task =
      await Task.findById(
        req.params.id
      );

    if (!task) {
      return res.status(404).json({
        success: false,
        message:
          "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};