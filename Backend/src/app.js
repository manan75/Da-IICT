import cors from "cors";
import express from "express";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  // !will add the hosted URL here.
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

//? Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.get("/api/v1/", (req, res) => {
  res.status(200).json({
    message: "Welcome to DAIICT Backend",
    status: "success"
  });
});


// ✅ Authentication routes
// app.use('/api/auth', authRoutes);

// ✅ Health check route
// app.get('/api/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Server is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // ✅ Create HTTP server
// const httpServer = createServer(app);

// // ✅ Attach socket.io to server
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:5173", // React frontend
//     methods: ["GET", "POST"]
//   }
// });

// // ✅ MySQL connection
// const db = await mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "chatdb"
// });

// // ✅ Socket events
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   // when client sends a message
//   socket.on("send_message", async (data) => {
//     const { senderId, receiverId, message } = data;

//     // save message to DB
//     await db.execute(
//       "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
//       [senderId, receiverId, message]
//     );

//     // emit to receiver
//     io.emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// // ✅ Start server
// httpServer.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });

app.get('/', (req, res) => {
  res.send('server is working go to /api/v1/ to explore the API');
})

export default app;