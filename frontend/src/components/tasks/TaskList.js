import React, { useEffect, useState } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTasks = () => {
    setLoading(true);
    setError(null);
    fetch("/api/tasks")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    fetch(`/api/tasks/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete task");
        fetchTasks();
      })
      .catch((err) => alert(err.message));
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.name);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle("");
  };

  const saveEdit = (id) => {
    fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editTitle, completed: false }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update task");
        fetchTasks();
        setEditingTaskId(null);
        setEditTitle("");
      })
      .catch((err) => alert(err.message));
  };

  const toggleCompleted = (task) => {
    fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: task.name, completed: !task.completed }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update task completion");
        fetchTasks();
      })
      .catch((err) => alert(err.message));
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading tasks...</p>;
  if (error)
    return <p className="text-center text-red-600" role="alert">Error: {error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Tasks</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-2 rounded transition ${
              task.completed ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-2 flex-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task)}
                className="h-4 w-4"
                aria-label={`Mark task "${task.name}" as completed`}
              />
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-200"
                  aria-label={`Edit task title for "${task.name}"`}
                />
              ) : (
                <span
                  className={`text-gray-800 ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.name}
                </span>
              )}
            </div>
            <div className="space-x-2">
              {editingTaskId === task.id ? (
                <>
                  <button
                    onClick={() => saveEdit(task.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white px-2 py-1 rounded text-sm hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(task)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
