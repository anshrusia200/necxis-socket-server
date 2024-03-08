// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "https://necxis.vercel.app/",
    credentials: true,
  })
);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://necxis.vercel.app/",
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

server.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port ", process.env.PORT);
});
