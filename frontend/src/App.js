import React, { useState, useEffect } from "react";
import TaskForm from "./components/tasks/TaskForm";
import TaskList from "./components/tasks/TaskList";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

function AppContent() {
  const [refresh, setRefresh] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  const handleTaskAdded = () => {
    setRefresh((r) => !r);
  };

  const handleSignIn = () => {
    setIsAuthenticated(true);
    navigate("/");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">TaskFlow</h1>
        <nav className="mb-4 flex justify-center space-x-4">
          {!isAuthenticated && <Link to="/signin" className="text-purple-600">Sign In</Link>}
          {!isAuthenticated && <Link to="/signup" className="text-purple-600">Sign Up</Link>}
          {isAuthenticated && <button onClick={handleSignOut} className="text-purple-600">Sign Out</button>}
        </nav>
        <Routes>
          <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <TaskForm onTaskAdded={handleTaskAdded} />
                  <TaskList key={refresh} />
                </>
              ) : (
                <SignIn onSignIn={handleSignIn} />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
