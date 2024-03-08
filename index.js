// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  // Handle like post event
  socket.on("likePost", (postId, count) => {
    console.log("like event recieved");
    console.log(postId, count);
    io.emit("updateLike", postId, count);
  });

  // Handle comment post event
  socket.on("commentPost", (postId, comment) => {
    console.log("comment event recieved");
    io.emit("updateComment", postId, comment);
  });
});

// Add routes for uploading photos, getting posts, etc.

server.listen(5000, () => {
  console.log("Server running on port 5000");
});