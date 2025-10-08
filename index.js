import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
const server = createServer(app);

// Allow frontend URL and Render URL
const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://chat-app-front-end-khaki.vercel.app" // Your frontend URL later
        ],
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on('message', (message) => {
        console.log("Message received:", message);
        io.emit("message", message);
    });

    socket.on('disconnect', () => {
        console.log("User disconnected");
    });
});

// Use Render's port or default to 5000
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});