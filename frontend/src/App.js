import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { isAuthenticated, removeToken } from "./utils/auth";

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleLoginSuccess = (data) => {
    setIsLoggedIn(true);
    console.log("Login successful:", data);
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center">Welcome!</h2>
          <p className="text-center mb-4">You are successfully logged in.</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {showSignup ? (
          <>
            <Signup onSignupSuccess={() => setShowSignup(false)} />
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <button
                className="text-purple-600 underline"
                onClick={() => setShowSignup(false)}
              >
                Log In
              </button>
            </p>
          </>
        ) : (
          <>
            <Login onLoginSuccess={handleLoginSuccess} />
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <button
                className="text-purple-600 underline"
                onClick={() => setShowSignup(true)}
              >
                Sign Up
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
