import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // connect to backend

export default function Chat({ userId, receiverId }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    const msgData = {
      senderId: userId,
      receiverId,
      message
    };
    socket.emit("send_message", msgData);
    setChat((prev) => [...prev, msgData]);
    setMessage("");
  };

  return (
    <div className="p-4">
      <div className="h-64 overflow-y-scroll border rounded mb-2">
        {chat.map((m, idx) => (
          <p key={idx}>
            <strong>{m.senderId}:</strong> {m.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        className="border p-2 rounded w-3/4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded ml-2"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}
