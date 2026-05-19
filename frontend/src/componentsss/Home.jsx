import React, {
  useState,
  useEffect,
} from "react";

import {
  Card,
  Button,
  Form,
} from "react-bootstrap";

import {
  FaBell,
  FaMoon,
  FaSun,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import Calendar from "react-calendar";

import instance from "../axios";

import "react-calendar/dist/Calendar.css";
import "./Home.css";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const [date, setDate] =
    useState(new Date());

  const [tasks, setTasks] =
    useState([]);

  // DARK MODE STATE
  const [darkMode, setDarkMode] =
    useState(false);

  const navigate =
    useNavigate();

  // =========================
  // TOGGLE DARK MODE
  // =========================

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // =========================
  // FETCH TASKS
  // =========================

  useEffect(() => {
    fetchTasksByDate();
  }, [date]);

  const fetchTasksByDate =
    async () => {
      try {
        const selectedDate =
          date
            .toISOString()
            .split("T")[0];

        const { data } =
          await instance.get(
            "/tasks/by-date",
            {
              params: {
                date:
                  selectedDate,
              },
            }
          );

        setTasks(
          data.tasks || []
        );
      } catch (err) {
        console.error(
          "Error fetching tasks:",
          err.response?.data ||
            err.message
        );
      }
    };

  // =========================
  // COMPLETE TASK
  // =========================

  const toggleTask =
    async (taskId) => {
      try {
        await instance.put(
          `/tasks/complete/${taskId}`
        );

        setTasks((prev) =>
          prev.map((task) =>
            task._id === taskId
              ? {
                  ...task,
                  completedToday: true,
                }
              : task
          )
        );
      } catch (err) {
        console.error(
          "Error completing task:",
          err.response?.data ||
            err.message
        );
      }
    };

  // =========================
  // DELETE TASK
  // =========================

  const deleteTask = async (
    taskId
  ) => {
    try {
      await instance.delete(
        `/tasks/delete/${taskId}`
      );

      setTasks((prev) =>
        prev.filter(
          (task) =>
            task._id !== taskId
        )
      );
    } catch (err) {
      console.error(
        "Error deleting task:",
        err.response?.data ||
          err.message
      );
    }
  };

  // =========================
  // EDIT TASK
  // =========================

  const editTask = (
    taskId
  ) => {
    navigate(
      `/edit-task/${taskId}`
    );
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    navigate("/");
  };

  return (
    <div
      className={
        darkMode
          ? "home-page dark"
          : "home-page"
      }
    >
      {/* SIDEBAR */}

      <div className="sidebar">
        {/* CALENDAR */}

        <Card className="calendar-card">
          <Card.Body>
            <Calendar
              onChange={setDate}
              value={date}
            />
          </Card.Body>
        </Card>

        {/* TASK SECTION */}

        <div className="sidebar-task-section">
          <h6 className="sidebar-heading">
            Tasks
          </h6>

          <div className="sidebar-item active-item">
            <span>Today</span>

            <span>
              {tasks.length}
            </span>
          </div>
        </div>

        {/* LIST SECTION */}

        <div className="sidebar-task-section">
          <h6 className="sidebar-heading">
            Lists
          </h6>

          {/* DAILY */}

          <div className="sidebar-item">
            <span>
              Daily Routine
            </span>

            <span>
              {
                tasks.filter(
                  (task) =>
                    task.repeatEnabled &&
                    task.repeatType ===
                      "daily"
                ).length
              }
            </span>
          </div>

          {/* STUDY */}

          <div className="sidebar-item">
            <span>Study</span>

            <span>
              {
                tasks.filter(
                  (task) =>
                    task.title
                      ?.toLowerCase()
                      .includes(
                        "study"
                      )
                ).length
              }
            </span>
          </div>

          {/* WORK */}

          <div className="sidebar-item">
            <span>Work</span>

            <span>
              {
                tasks.filter(
                  (task) =>
                    task.title
                      ?.toLowerCase()
                      .includes(
                        "work"
                      )
                ).length
              }
            </span>
          </div>

          {/* PERSONAL */}

          <div className="sidebar-item">
            <span>
              Personal
            </span>

            <span>
              {
                tasks.filter(
                  (task) =>
                    task.title
                      ?.toLowerCase()
                      .includes(
                        "personal"
                      )
                ).length
              }
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}

      <div className="main-content">
        {/* TOPBAR */}

        <div className="topbar">
          <div></div>

          <div className="top-icons">
            {/* DARK MODE */}

            <div
              onClick={
                toggleDarkMode
              }
            >
              {darkMode ? (
                <FaSun className="top-icon" />
              ) : (
                <FaMoon className="top-icon" />
              )}
            </div>

            <FaBell className="top-icon" />

            {/* PROFILE */}

            <div className="profile-wrapper">
              <img
                src="https://i.pravatar.cc/100"
                alt="profile"
                className="profile-img"
              />

              {/* LOGOUT */}

              <div className="logout-dropdown">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={
                    handleLogout
                  }
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* TASK SECTION */}

        <div className="today-section">
          <h1 className="today-title">
            Tasks for{" "}
            {date.toDateString()}
          </h1>

          {tasks.length === 0 ? (
            <p className="no-task">
              No tasks found
            </p>
          ) : (
            tasks.map((task) => (
              <Card
                key={task._id}
                className={`task-card ${
                  task.completedToday
                    ? "completed-task"
                    : ""
                }`}
                style={{
                  backgroundColor:
                    darkMode
                      ? "#1f1f1f"
                      : task.color ||
                        "#ffffff",
                }}
              >
                <Card.Body className="task-body">
                  <div className="task-content">
                    {/* LEFT */}

                    <div className="task-left">
                      {/* CHECKBOX */}

                      <Form.Check
                        checked={
                          task.completedToday ||
                          false
                        }
                        onChange={() =>
                          toggleTask(
                            task._id
                          )
                        }
                      />

                      {/* TASK DETAILS */}

                      <div>
                        {/* TITLE */}

                        <h5 className="task-title">
                          {task.title}
                        </h5>

                        {/* DESCRIPTION */}

                        {task.description && (
                          <p className="task-desc">
                            {
                              task.description
                            }
                          </p>
                        )}

                        {/* REPEAT */}

                        {task.repeatEnabled && (
                          <div className="repeat-badge">
                            {task.repeatType ===
                              "daily" &&
                              "🔁 Daily"}

                            {task.repeatType ===
                              "weekly" &&
                              `🔁 Weekly (${task.repeatDays.join(
                                ", "
                              )})`}

                            {task.repeatType ===
                              "monthly" &&
                              `🔁 Monthly (${task.repeatDate})`}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}

                    <div className="task-actions">
                      {/* EDIT */}

                      <button
                        className="icon-btn edit-btn"
                        onClick={() =>
                          editTask(
                            task._id
                          )
                        }
                      >
                        <FaEdit />
                      </button>

                      {/* DELETE */}

                      <button
                        className="icon-btn delete-btn"
                        onClick={() =>
                          deleteTask(
                            task._id
                          )
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </div>

        {/* FLOATING BUTTON */}

        <Button
          className="floating-btn"
          onClick={() =>
            navigate("/tasks")
          }
        >
          <FaPlus />
        </Button>
      </div>
    </div>
  );
};

export default Home;