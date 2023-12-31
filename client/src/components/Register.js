import React, { useEffect } from "react";
import Room from "./Room";
import Navbar from "./Navbar";
import Tutorial from "./Tutorial";
import "../styles/register.css";
import { useAppContext } from "../AppContext"; // Import the context hook

function Register({ socket }) {
    const {
        user,
        setUser,
        users,
        setUsers,
        room,
        setRoom,
        userCount,
        setUserCount,
        usersReady,
        setUsersReady,
        socketToUser,
        setSocketToUser,
    } = useAppContext(); // Use the context hook to access shared data

    useEffect(() => {
        const handleUserJoined = (userId) => {
            console.log(`User ${userId} joined room`);
        };

        socket.on("user_joined", handleUserJoined);

        socket.on(
            "users_in_room",
            (usersInRoom, socketUserMapping, usersReady) => {
                setUsers(usersInRoom);
                setUserCount(usersInRoom.length);
                setSocketToUser(socketUserMapping);
                setUsersReady(usersReady);
                console.log("Users in room: " + usersInRoom);
            }
        );

        socket.on("users_ready", (usersReady) => {
            setUsersReady(usersReady);
            console.log("Users ready: " + usersReady);
        });

        socket.on("room_full", () => {
            alert("Room is full");
        });

        socket.on("game_in_progress", () => {
            alert(
                "The game is already in progress in this room. You cannot join at this time."
            );
        });

        socket.on("user_left", (usersInRoom) => {
            setUsers(usersInRoom);
            setUserCount(usersInRoom.length);
            console.log("Users in room: " + usersInRoom);
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off("user_joined", handleUserJoined);
        };
    }, [socket, userCount, setUsers, setUserCount, setSocketToUser, setUsersReady]);

    const handleJoinRoom = () => {
        socket.emit("join_room", room, user);
        console.log("User: " + user + " Room: " + room);
    };

    //If the socket that is connected is in the list of users, then render the room. When they leave they are no longer in the list of users so the Room will not render and they will be in the homepage.
    return users.includes(socketToUser[socket.id]) ? (
        <div className="room">
            <Navbar />
            <Room
                socket={socket}
                userArray={users}
                room={room}
                count={userCount}
                ready={usersReady}
                socketToUser={socketToUser}
            />
        </div>
    ) : (
        <div className="home-container">
            <Navbar />
            <div className="banner"></div>
            <div className="register">
                <h1>
                    A for Ani <br />
                    <span>Make a room:</span>
                </h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={user}
                    onChange={(e) => {
                        setUser(e.target.value);
                    }}
                />

                <input
                    type="text"
                    placeholder="Room ID"
                    value={room}
                    onChange={(e) => {
                        setRoom(e.target.value);
                    }}
                />

                <button
                    type="button"
                    className="access"
                    onClick={handleJoinRoom}
                >
                    Access
                </button>
            </div>
            <Tutorial />
        </div>
    );
}

export default Register;
