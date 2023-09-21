import React, { useState, useEffect } from "react";
import GameBoard from "./Game/GameBoard";
import AnswerInput from "./Game/AnswerInput";
import Timer from "./Game/Timer";
import "../styles/game.css";
import VoteModal from "./VoteModal";
import { useAppContext } from '../AppContext'; // Import the context hook

function Game({ socket }) {
    const [showVoteModal, setShowVoteModal] = useState(false);

    const {
        answer,
        user,
        answerUser,
        users,
        room,
        messages,
        userCount,
        usersReady,
        socketToUser,
        setAnswerUser,
        setAnswer,
        setUser,
        setUsers,
        setRoom,
        setMessages,
        setUserCount,
        setUsersReady,
        setSocketToUser,
    } = useAppContext(); // Use the context hook to access shared data

    useEffect(() => {
        socket.on("start_vote", (answers) => {
            // Display the vote modal when a "start_vote" event is received
            console.log("FRONTEND: " + answers)
            setShowVoteModal(true);
            setAnswer(answers[0][0]);
            setAnswerUser(answers[0][1]);
            console.log("Answer to vote for: " + answers[0][0] + " by " + answers[0][1]);
        });

        socket.on("vote_outcome", (voteResults) => {
            // Display the vote outcome to all players
            console.log("Vote outcome: ", voteResults);
            setShowVoteModal(false);
        });

        return () => {
            socket.off("start_vote");
        };
    }, [socket]);

    return (
        <div className="game">
            {showVoteModal ? (
                <VoteModal socket={socket} answer={answer}  users={users} answerUser={answerUser} />
            ) : null}
            <h1>Game</h1>
            <Timer />
            <GameBoard socket={socket} />
            <AnswerInput socket={socket} user={user} users={users} answer={answer} setAnswer={setAnswer} />
        </div>
    );
}

export default Game;
