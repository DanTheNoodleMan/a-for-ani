import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/room.css";
import bagel from "../assets/bagel.png";
import cinnamon from "../assets/cinnamon.png";
import pizza from "../assets/pizza.png";
import burger from "../assets/burger.png";
import { MdExitToApp } from "react-icons/md";

const userIcons = [bagel, cinnamon, pizza, burger];
const badgeColors = ["#fee440", "#00bbf9", "#00f5d4", "#f15bb5"];

function Room({ socket, userArray, room, count, ready, socketToUser }) {
    const navigate = useNavigate();
    const startButtonRef = useRef(null);

    useEffect(() => {
        const buttonStart = startButtonRef.current;
        if (buttonStart) {
            buttonStart.disabled = true;
        }
        // Check if all users are ready
        const allUsersReady = userArray.every((user) => ready && ready.includes(user));

        if (allUsersReady && count > 1) {
            buttonStart.disabled = false;
        }

        socket.on("game_started", () => {
            navigate("/game");
        });

        return () => {
            socket.off("game_started");
        };
    }, [count, ready, userArray, navigate, socket]);

    const handleStartGame = () => {
        socket.emit("start_game", room);
    };

    const handleReady = () => {
        let user = socketToUser[socket.id]; //Get the username from the mapping
        if (user) {
            socket.emit("ready", room, user); //Send the user's username to the server
        }
        console.log("User: " + user + " is ready.");
    };

    const handleLeave = () => {
        let user = socketToUser[socket.id]; //Get the username from the mapping
        if (user) {
            socket.emit("leave_room", room, user);
        }
        console.log("User: " + user + " has left the room.");
    };

    return (
        <div className="content">
            <button className="leave" onClick={handleLeave}>
                <MdExitToApp/>
            </button>
            <h1>
                Room:{" "}
                <span style={{ color: "#f15bb5", fontSize: "1em" }}>
                    {room}
                </span>{" "}
                <br />
                <span>Users: {count}/4</span>
            </h1>
            <ul>
                {userArray.map((user, index) => (
                    <li key={index}>
                        <div
                            className="badge"
                            style={{ backgroundColor: badgeColors[index] }}
                        >
                            <img src={userIcons[index]} alt="user icon" />
                        </div>
                        {user} {ready && ready.includes(user) ? "(Ready)" : ""}
                    </li>
                ))}
            </ul>
            <div className="buttons">
                <button className="ready" onClick={handleReady}>
                    Ready
                </button>
                <button
                    className="start"
                    ref={startButtonRef}
                    onClick={handleStartGame}
                >
                    Start
                </button>
            </div>
        </div>
    );
}

export default Room;
