import React, { useState, useEffect } from "react";
import GameBoard from "./Game/GameBoard";
import AnswerInput from "./Game/AnswerInput";
import Timer from "./Game/Timer";
import "../styles/game.css";
import VoteModal from "./VoteModal";
import { useAppContext } from '../AppContext'; // Import the context hook

function Game({ socket }) {
    const [showVoteModal, setShowVoteModal] = useState(false);
    const [answer, setAnswer] = useState("");

    const {
        user,
        users,
        room,
        messages,
        userCount,
        usersReady,
        socketToUser,
        setUser,
        setUsers,
        setRoom,
        setMessages,
        setUserCount,
        setUsersReady,
        setSocketToUser,
    } = useAppContext(); // Use the context hook to access shared data

    useEffect(() => {
        socket.on("start_vote", (answer) => {
            // Display the vote modal when a "start_vote" event is received
            setShowVoteModal(true);
            setAnswer(answer);
            console.log("Answer to vote for: " + answer);
        });

        socket.on("vote_outcome", (voteResults) => {
            // Display the vote outcome to all players
            console.log("Vote outcome: ", voteResults);
        });

        return () => {
            socket.off("start_vote");
        };
    }, [socket]);

    return (
        <div className="game">
            {showVoteModal ? (
                <VoteModal answer={answer} socket={socket} users={users} />
            ) : null}
            <h1>Game</h1>
            <Timer />
            <GameBoard socket={socket} />
            <AnswerInput socket={socket} />
        </div>
    );
}

export default Game;
