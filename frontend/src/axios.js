import axios from "axios";

const instance = axios.create({
  baseURL: "https://task-m-zvtd.onrender.com/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;