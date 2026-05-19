import React, { useState } from "react";
import {
  Card,
  Button,
  Form,
} from "react-bootstrap";

import {
  FaBell,
  FaMoon,
  FaFolder,
  FaCheck,
} from "react-icons/fa";

import Calendar from "react-calendar";

import instance from "../axios";

import "react-calendar/dist/Calendar.css";
import "./NewTask.css";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewTask = () => {
  const [date, setDate] =
    useState(new Date());

  const navigate = useNavigate();

  // =========================
  // TASK FORM
  // =========================

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      color: "#B8E7C8",
    });

  // =========================
  // REPEAT STATES
  // =========================

  const [repeatEnabled, setRepeatEnabled] =
    useState(false);

  const [repeatType, setRepeatType] =
    useState("daily");

  const [repeatDays, setRepeatDays] =
    useState([]);

  const [repeatDate, setRepeatDate] =
    useState(1);

  // =========================
  // WEEK DAYS
  // =========================

  const weekDays = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  // =========================
  // COLORS
  // =========================

  const colors = [
    "#B8E7C8",
    "#C46BD6",
    "#F1C6A8",
    "#C8F2F2",
    "#E8E93D",
    "#45E61B",
    "#56E0C0",
    "#5A7BEB",
    "#9A6EF1",
    "#C03BF1",
    "#D57A97",
    "#FF0000",
    "#E1DCDC",
  ];

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // =========================
  // TOGGLE DAYS
  // =========================

  const toggleDay = (day) => {
    if (repeatDays.includes(day)) {
      setRepeatDays(
        repeatDays.filter(
          (d) => d !== day
        )
      );
    } else {
      setRepeatDays([
        ...repeatDays,
        day,
      ]);
    }
  };

  // =========================
  // CREATE TASK
  // =========================

  const addTask = async () => {
    try {
      if (!formData.title.trim()) {
        toast.error(
          "Task title is required"
        );
        return;
      }

      const newTask = {
        title: formData.title,
        description:
          formData.description,
        color: formData.color,
        taskDate:
          date.toISOString(),

        repeatEnabled,
        repeatType,

        repeatDays:
          repeatType === "weekly"
            ? repeatDays
            : [],

        repeatDate:
          repeatType === "monthly"
            ? repeatDate
            : null,
      };

      await instance.post(
        "/tasks/create",
        newTask
      );

      toast.success(
        "Task created successfully"
      );

      setFormData({
        title: "",
        description: "",
        color: "#B8E7C8",
      });

      navigate("/home");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data
          ?.message ||
          "Failed to create task"
      );
    }
  };

  return (
    <div className="home-page">

      {/* SIDEBAR */}
      <div className="sidebar">

        {/* LOGO */}
        <div className="logo-section">

          <div className="logo-box">
            <FaFolder />
          </div>

          <h2 className="logo-text">
            Listify
          </h2>

        </div>

        {/* CALENDAR */}
        <Card className="calendar-card">
          <Card.Body>

            <Calendar
              onChange={setDate}
              value={date}
            />

          </Card.Body>
        </Card>

        {/* TASKS */}
        <div className="sidebar-section">

          <h5>Tasks</h5>

          <div className="sidebar-item">

            <span>Today</span>

            <span>2</span>

          </div>

        </div>

        {/* LISTS */}
        <div className="sidebar-section">

          <h5>Lists</h5>

          <div className="sidebar-item">

            <span>
              Daily Routine
            </span>

            <span>1</span>

          </div>

          <div className="sidebar-item">

            <span>Study</span>

            <span>0</span>

          </div>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">

        {/* TOPBAR */}
        <div className="topbar">

          <div></div>

          <div className="top-icons">

            <FaMoon className="top-icon" />

            <FaBell className="top-icon" />

            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
              className="profile-img"
            />

          </div>

        </div>

        {/* TITLE */}
        <h1 className="today-title">
          New Task 😍
        </h1>

        {/* TITLE INPUT */}
        <Form.Group>

          <Form.Control
            type="text"
            placeholder="Name your new task"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="custom-input"
          />

        </Form.Group>

        {/* DESCRIPTION */}
        <Form.Group>

          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Describe your new task"
            name="description"
            value={
              formData.description
            }
            onChange={handleChange}
            className="custom-input"
          />

        </Form.Group>

        {/* COLORS */}
        <h5 className="color-title">
          Card Color
        </h5>

        <div className="color-container">

          {colors.map((color) => (
            <div
              key={color}
              className={`color-circle ${
                formData.color ===
                color
                  ? "selected-color"
                  : ""
              }`}
              style={{
                backgroundColor:
                  color,
              }}
              onClick={() =>
                setFormData({
                  ...formData,
                  color,
                })
              }
            />
          ))}

        </div>

        {/* REPEAT CARD */}
        <Card className="repeat-card">

          <Card.Body>

            <div className="repeat-container">

              {/* LEFT */}
              <div className="repeat-left">

                {/* HEADER */}
                <div className="repeat-header">

                  <div>

                    <h5>Repeat</h5>

                    <p>
                      Set a cycle for
                      your task
                    </p>

                  </div>

                  {/* SWITCH */}
                  <Form.Check
                    type="switch"
                    checked={
                      repeatEnabled
                    }
                    onChange={(e) =>
                      setRepeatEnabled(
                        e.target.checked
                      )
                    }
                  />

                </div>

                {/* SHOW OPTIONS */}
                {repeatEnabled && (
                  <>

                    {/* BUTTONS */}
                    <div className="repeat-buttons">

                      <Button
                        variant={
                          repeatType ===
                          "daily"
                            ? "dark"
                            : "light"
                        }
                        onClick={() =>
                          setRepeatType(
                            "daily"
                          )
                        }
                      >
                        Daily
                      </Button>

                      <Button
                        variant={
                          repeatType ===
                          "weekly"
                            ? "dark"
                            : "light"
                        }
                        onClick={() =>
                          setRepeatType(
                            "weekly"
                          )
                        }
                      >
                        Weekly
                      </Button>

                      <Button
                        variant={
                          repeatType ===
                          "monthly"
                            ? "dark"
                            : "light"
                        }
                        onClick={() =>
                          setRepeatType(
                            "monthly"
                          )
                        }
                      >
                        Monthly
                      </Button>

                    </div>

                    {/* DAILY */}
                    {repeatType ===
                      "daily" && (
                      <div className="repeat-info">

                        <p>
                          Task repeats
                          every day
                        </p>

                      </div>
                    )}

                    {/* WEEKLY */}
                    {repeatType ===
                      "weekly" && (
                      <>

                        <div className="days-container">

                          {weekDays.map(
                            (day) => (
                              <div
                                key={day}
                                className={`day-circle ${
                                  repeatDays.includes(
                                    day
                                  )
                                    ? "active-day"
                                    : ""
                                }`}
                                onClick={() =>
                                  toggleDay(
                                    day
                                  )
                                }
                              >
                                {day}
                              </div>
                            )
                          )}

                        </div>

                        <div className="repeat-footer">

                          <span>
                            Repeat
                          </span>

                          <span>
                            Every week →
                          </span>

                        </div>

                      </>
                    )}

                    {/* MONTHLY */}
                    {repeatType ===
                      "monthly" && (
                      <div className="monthly-box">

                        <p>
                          Select Date
                        </p>

                        <Form.Select
                          value={
                            repeatDate
                          }
                          onChange={(
                            e
                          ) =>
                            setRepeatDate(
                              Number(
                                e.target
                                  .value
                              )
                            )
                          }
                        >

                          {[
                            ...Array(31),
                          ].map(
                            (_, index) => (
                              <option
                                key={
                                  index + 1
                                }
                                value={
                                  index + 1
                                }
                              >
                                {index + 1}
                              </option>
                            )
                          )}

                        </Form.Select>

                      </div>
                    )}

                  </>
                )}

              </div>

              {/* RIGHT */}
              <div className="repeat-right">

                <h5>
                  Set a tag for your
                  task
                </h5>

                <div className="tag-container">

                  <Button variant="light">
                    Daily Routine
                  </Button>

                  <Button variant="light">
                    Add More +
                  </Button>

                  <Button variant="light">
                    Study Routine
                  </Button>

                </div>

              </div>

            </div>

          </Card.Body>

        </Card>

        {/* SUBMIT */}
        <Button
          className="submit-btn"
          onClick={addTask}
        >
          <FaCheck />
        </Button>

      </div>

    </div>
  );
};

export default NewTask;