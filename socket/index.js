import { checkNotifications } from "../api/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5174",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (!user) return;
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  (function checkMedicineStockInterval() {
    setInterval(async () => {
      let notifications = await checkNotifications();

      io.emit("newNotification", {
        notifications,
      });
    }, 5000);
  })();

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
  });
});

const PORT = 8900;

httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
