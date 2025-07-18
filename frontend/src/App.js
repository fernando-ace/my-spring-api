import React, { useState } from "react";
import TaskForm from "./components/tasks/TaskForm";
import TaskList from "./components/tasks/TaskList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleTaskAdded = () => {
    setRefresh((r) => !r);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">TaskFlow</h1>
        <TaskForm onTaskAdded={handleTaskAdded} />
        {/* Key prop forces TaskList to re-mount and refresh when a task is added */}
        <TaskList key={refresh} />
      </div>
    </div>
  );
}

export default App;
