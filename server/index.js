const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
const database = require("./config/database");
require("dotenv").config();

// Middlewares
app.use(cors());
app.use(express.json());

// Setting up routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Connect with Database
database.connect();

// Listen the App
const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

// Test the App
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is Running!!!",
  });
});

// Import Socket.IO and create a server instance:
const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
// This line initializes a global variable onlineUsers as a Map.
// This map will be used to store online users' information.
global.onlineUsers = new Map();
// This event is triggered when a client connects to the server.
io.on("connection", (socket) => {
  global.chatSocket = socket;

  // This event handler is triggered when a client emits an "add-user" event, presumably when a user logs in.
  // It adds the user's ID and their socket ID to the onlineUsers map.
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  // This event handler is triggered when a client emits a "send-msg" event, indicating that they want to send a
  // message to another user. It looks up the socket ID of the recipient user from the onlineUsers map and emits
  // a "msg-recieve" event to that specific socket, passing along the message data.
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});