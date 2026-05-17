import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://chat-socket-io-frontend-xi.vercel.app/"
    ],
    credentials: true
}));

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://chat-app-front-end-khaki.vercel.app"
        ],
        methods: ["GET", "POST"],
        credentials: true
    },

    // IMPORTANT FOR RENDER
    transports: ["websocket", "polling"]
});

app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("message", (message) => {

        console.log("Message received:", message);

        // Send message to all users
        io.emit("message", message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});