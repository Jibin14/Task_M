import React, {
  useEffect,
  useState,
} from "react";

import {
  Card,
  Form,
  Button,
} from "react-bootstrap";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import instance from "../axios";

import "./EditTask.css";

const EditTask = () => {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [color, setColor] =
    useState("#ffffff");

  const [taskDate, setTaskDate] =
    useState("");

  const [
    repeatEnabled,
    setRepeatEnabled,
  ] = useState(false);

  const [
    repeatType,
    setRepeatType,
  ] = useState("daily");

  const [
    repeatDays,
    setRepeatDays,
  ] = useState([]);

  const [
    repeatDate,
    setRepeatDate,
  ] = useState("");

  // =========================
  // FETCH TASK
  // =========================

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask =
    async () => {
      try {
        const { data } =
          await instance.get(
            `/tasks/${id}`
          );

        const task =
          data.task;

        setTitle(task.title);
        setDescription(
          task.description
        );
        setColor(
          task.color || "#ffffff"
        );

        setTaskDate(
          task.taskDate
            ?.split("T")[0]
        );

        setRepeatEnabled(
          task.repeatEnabled
        );

        setRepeatType(
          task.repeatType
        );

        setRepeatDays(
          task.repeatDays || []
        );

        setRepeatDate(
          task.repeatDate || ""
        );
      } catch (error) {
        console.log(
          error.response?.data ||
            error.message
        );
      }
    };

  // =========================
  // HANDLE DAYS
  // =========================

  const handleDayChange = (
    day
  ) => {
    if (
      repeatDays.includes(day)
    ) {
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
  // UPDATE TASK
  // =========================

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await instance.put(
          `/tasks/update/${id}`,
          {
            title,
            description,
            color,
            taskDate,
            repeatEnabled,
            repeatType,
            repeatDays,
            repeatDate,
          }
        );

        navigate("/home");
      } catch (error) {
        console.log(
          error.response?.data ||
            error.message
        );
      }
    };

  return (
    <div className="edit-page">

      <Card className="edit-card">

        <Card.Body>

          <h2 className="edit-title">
            Edit Task
          </h2>

          <Form
            onSubmit={
              handleSubmit
            }
          >

            {/* TITLE */}

            <Form.Group className="mb-3">

              <Form.Label>
                Title
              </Form.Label>

              <Form.Control
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                required
              />

            </Form.Group>

            {/* DESCRIPTION */}

            <Form.Group className="mb-3">

              <Form.Label>
                Description
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={3}
                value={
                  description
                }
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />

            </Form.Group>

            {/* DATE */}

            <Form.Group className="mb-3">

              <Form.Label>
                Task Date
              </Form.Label>

              <Form.Control
                type="date"
                value={taskDate}
                onChange={(e) =>
                  setTaskDate(
                    e.target.value
                  )
                }
              />

            </Form.Group>

            {/* COLOR */}

            <Form.Group className="mb-3">

              <Form.Label>
                Color
              </Form.Label>

              <Form.Control
                type="color"
                value={color}
                onChange={(e) =>
                  setColor(
                    e.target.value
                  )
                }
              />

            </Form.Group>

            {/* REPEAT */}

            <Form.Check
              type="checkbox"
              label="Enable Repeat"
              checked={
                repeatEnabled
              }
              onChange={(e) =>
                setRepeatEnabled(
                  e.target.checked
                )
              }
              className="mb-3"
            />

            {repeatEnabled && (

              <>

                {/* REPEAT TYPE */}

                <Form.Group className="mb-3">

                  <Form.Label>
                    Repeat Type
                  </Form.Label>

                  <Form.Select
                    value={
                      repeatType
                    }
                    onChange={(e) =>
                      setRepeatType(
                        e.target.value
                      )
                    }
                  >

                    <option value="daily">
                      Daily
                    </option>

                    <option value="weekly">
                      Weekly
                    </option>

                    <option value="monthly">
                      Monthly
                    </option>

                  </Form.Select>

                </Form.Group>

                {/* WEEKLY */}

                {repeatType ===
                  "weekly" && (

                  <div className="days-box">

                    {[
                      "Sun",
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat",
                    ].map((day) => (

                      <Button
                        key={day}
                        type="button"
                        className={`day-btn ${
                          repeatDays.includes(
                            day
                          )
                            ? "active-day"
                            : ""
                        }`}
                        onClick={() =>
                          handleDayChange(
                            day
                          )
                        }
                      >
                        {day}
                      </Button>

                    ))}

                  </div>

                )}

                {/* MONTHLY */}

                {repeatType ===
                  "monthly" && (

                  <Form.Group className="mb-3 mt-3">

                    <Form.Label>
                      Repeat Date
                    </Form.Label>

                    <Form.Control
                      type="number"
                      min="1"
                      max="31"
                      value={
                        repeatDate
                      }
                      onChange={(e) =>
                        setRepeatDate(
                          e.target.value
                        )
                      }
                    />

                  </Form.Group>

                )}

              </>

            )}

            {/* BUTTONS */}

            <div className="edit-actions">

              <Button
                variant="secondary"
                onClick={() =>
                  navigate(
                    "/home"
                  )
                }
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="dark"
              >
                Update Task
              </Button>

            </div>

          </Form>

        </Card.Body>

      </Card>

    </div>
  );
};

export default EditTask;