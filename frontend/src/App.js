import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WebSocketDemo from "./components/WebSocketDemo";

function App() {
  const [showSignup, setShowSignup] = useState(false);

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
            <Login />
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
      <WebSocketDemo />
    </div>
  );
}

export default App;
