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
const io = socketIO(server);

server.listen(3000);
console.log("Servidor iniciou");
