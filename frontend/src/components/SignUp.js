import React, { useState } from "react";

function SignUp({ onSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const msg = await res.text();
        setError(msg || "Error signing up");
        return;
      }
      setSuccess("User registered! You can now sign in.");
      setUsername("");
      setPassword("");
      if (onSignUp) onSignUp();
    } catch (err) {
      setError("Error signing up");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-purple-700">Sign Up</h2>
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="w-full p-2 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
      <button className="w-full bg-purple-600 text-white p-2 rounded" type="submit">
        Sign Up
      </button>
    </form>
  );
}

export default SignUp; 