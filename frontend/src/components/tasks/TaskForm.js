import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: title, completed: false }),
      });
      if (res.status === 401) {
        navigate("/signin");
        return;
      }
      if (!res.ok) throw new Error("Failed to add task");
      setTitle("");
      if (onTaskAdded) onTaskAdded();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="New task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        disabled={loading}
        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 transition duration-200"
        aria-label="New task title"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50 transition duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
        aria-label="Add new task"
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
      {error && <p className="text-red-600 ml-2 self-center" role="alert">{error}</p>}
    </form>
  );
};

export default TaskForm;
