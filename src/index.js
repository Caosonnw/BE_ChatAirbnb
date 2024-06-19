import express from "express";
import cors from "cors";
import rootRouter from "./routes/rootRouter.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const app = express();

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
app.use(cors());
app.use(express.json());
app.use(express.static("."));

app.use(rootRouter);

httpServer.listen(8081, () => {
  console.log("Socket is running on port 8081");
});

let prisma = new PrismaClient();

io.on("connection", (socket) => {
  socket.on("join-room", async (roomId) => {
    // leave all room
    socket.rooms.forEach((roomId) => socket.leave(roomId));

    await socket.join(roomId);

    // lấy lịch sử chat
    let lstChat = await prisma.chat.findMany({
      where: {
        room_id: roomId,
      },
    });

    io.to(roomId).emit("load-chat", lstChat);
  });

  socket.on("send-mess", async (data) => {
    let newChat = {
      user_id: data.user_id,
      content: data.txtChat,
      room_id: data.roomId,
      date: new Date(),
    };
    await prisma.chat.create({ data: newChat });
    io.to(data.roomId).emit("mess-server", newChat);
  });
});
