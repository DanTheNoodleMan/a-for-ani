import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import http from "http";
import { Server } from "socket.io";

const app = express();

const httpServer = http.createServer(app); // Assign the HTTP server to a variable

app.use(cors());
app.use(express.json());

// Create a socket.io server and attach it to the HTTP server
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    },
});

const rooms = {}; // Object to store users in each room
const ready = {}; // Object to store users' ready status

const roomStates = {}; // Object to store the state of each room (whether it is in the lobby or in-game)

const socketToUser = {}; // Object to store socket.id to username mapping

io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    socket.on("join_room", (roomId, user) => {
        // Check if the room is full
        if (roomStates[roomId] && roomStates[roomId].gameStarted) {
            socket.emit("game_in_progress");
            return;
        } else if (rooms[roomId] && rooms[roomId].length >= 4) {
            socket.emit("room_full");
            return;
        } else {
            socket.join(roomId);
            io.to(roomId).emit("user_joined", user);
        }

        // Add the user to the room on the server-side
        if (!rooms[roomId]) {
            rooms[roomId] = [];
        }
        rooms[roomId].push(user);

        // Add the user to the socketToUser object
        socketToUser[socket.id] = user;

        // Update the readiness object when a user joins
        if (!ready[roomId]) {
            ready[roomId] = [];
        }

        // Send the list of users in the room to the newly joined user and updated readiness
        io.to(roomId).emit(
            "users_in_room",
            rooms[roomId],
            socketToUser,
            ready[roomId]
        );
    });

    socket.on("ready", (roomId, user) => {
        // Add the user to the ready object
        if (!ready[roomId]) {
            ready[roomId] = [];
        }
        ready[roomId].push(user);

        io.to(roomId).emit("users_ready", ready[roomId]);
    });

    socket.on("start_game", (roomId) => {
        if (!roomStates[roomId]) {
            roomStates[roomId] = {};
        }
        roomStates[roomId].gameStarted = true;
        roomStates[roomId].players = []; // Initialize players array

        io.to(roomId).emit("game_started");
    });

    socket.on("send_message", (roomId, message) => {
        io.to(roomId).emit("chat_message", message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
        delete socketToUser[socket.id];
    });

    socket.on("leave_room", (roomId, user) => {
        console.log("User left room: ", socket.id);
        if (rooms[roomId]) {
            // Filter out the user from the room's user array
            rooms[roomId] = rooms[roomId].filter(
                (roomUser) => roomUser !== user
            );
            
            //Remove the socket id to user mapping
            delete socketToUser[socket.id];

            io.to(roomId).emit("user_left", rooms[roomId]);
        }
        socket.leave(roomId);
    });
});

httpServer.listen(3001, () => {
    console.log("Server running on port 3001");
});
