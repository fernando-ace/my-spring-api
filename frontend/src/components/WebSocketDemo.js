/*
import React, { useEffect, useState } from "react";

const WS_URL = "wss://improved-fishstick-x54qgw47x75rcpw74-8080.app.github.dev/ws";

const WebSocketDemo = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log("WebSocket connected");
      setMessages((msgs) => [...msgs, "Connected to server"]);
    };

    socket.onmessage = (event) => {
      setMessages((msgs) => [...msgs, `Server: ${event.data}`]);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setMessages((msgs) => [...msgs, "Disconnected from server"]);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setMessages((msgs) => [...msgs, "WebSocket error occurred"]);
    };

    setWs(socket);

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(input);
      setMessages((msgs) => [...msgs, `You: ${input}`]);
      setInput("");
    } else {
      alert("WebSocket is not connected");
    }
  };

  return (
    <div className="mt-8 p-4 border rounded max-w-md mx-auto bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">WebSocket Demo</h3>
      <div
        className="mb-4 h-32 overflow-auto border p-2 bg-white rounded"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, idx) => <p key={idx}>{msg}</p>)
        )}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
        className="w-full px-3 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        onClick={sendMessage}
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
      >
        Send
      </button>
    </div>
  );
};

export default WebSocketDemo;
*/
