import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import http from "http";
import socketIO from "socket.io";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*", // Replace with the origin URL of your client-side code
    methods: ["GET", "POST"], // Add the HTTP methods allowed by your server
    allowedHeaders: ["Content-Type"], // Add any additional headers your server may require
  },
});

let clients = {};

io.on("connection", (socket) => {
  console.log(`${socket.id}: connected`);
  const { userId } = socket.handshake.query;
  clients[userId] = socket;
  console.log(Object.keys(clients));

  socket.on("sendMessage", (data) => {
    const { destinataryId, text } = data;
    console.log(destinataryId);
    try {
      clients[`${destinataryId}`].emit("messageReceived", text);
      socket.emit("messageSentConfirmation", text);
    } catch (error) {
      socket.emit(
        "User not connected but a push notification will be sent to it",
        { error }
      );
    }
  });
});

server.listen(3000);
console.log("Servidor iniciou");
