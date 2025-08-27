import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Create HTTP server
const httpServer = createServer(app);

// ✅ Attach socket.io to server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // React frontend
    methods: ["GET", "POST"]
  }
});

// ✅ MySQL connection
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chatdb"
});

// ✅ Socket events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // when client sends a message
  socket.on("send_message", async (data) => {
    const { senderId, receiverId, message } = data;

    // save message to DB
    await db.execute(
      "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
      [senderId, receiverId, message]
    );

    // emit to receiver
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ✅ Start server
httpServer.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
