import React, { useState, useEffect, useRef } from "react";
import GameBoard from "./Game/GameBoard";
import AnswerInput from "./Game/AnswerInput";
import Timer from "./Game/Timer";
import "../styles/game.css";
import VoteModal from "./VoteModal";
import { useAppContext } from "../AppContext"; // Import the context hook

function Game({ socket }) {
    const [showVoteModal, setShowVoteModal] = useState(false);
    const [winner, setWinner] = useState(""); // The winner of the game
    const [scores, setScores] = useState({}); // The scores of all players

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

    const answerRef = useRef(""); // Use a ref to store answer
    const answerUserRef = useRef(""); // Use a ref to store answerUser

    const handleRandomLetter = (cardId) => {
        socket.emit("generate_letter", cardId);
    };
    const handleRandomCategory = () => {
        socket.emit("generate_category");
    };

    const handleRefreshValues = () => {
        handleRandomLetter(1);
        handleRandomLetter(2);
        handleRandomLetter(3);
        handleRandomCategory();
    };

    useEffect(() => {
        socket.on("start_vote", (answers) => {
            // Display the vote modal when a "start_vote" event is received
            setShowVoteModal(true);

            // Update the refs with the current values
            answerRef.current = answers[0][0];
            answerUserRef.current = answers[0][1];

            console.log(
                "Updated answer and answerUser: ",
                answerRef.current,
                answerUserRef.current
            );
            console.log("FRONTEND: " + answers[0][0] + " by " + answers[0][1]);
        });

        socket.on("vote_outcome", (voteResults) => {
            // Display the vote outcome to all players
            console.log("Vote outcome: ", voteResults);

            if (voteResults.accepted) {
                // Define the winning user
                let winningUser = answerUserRef.current;
                setWinner(winningUser);
                console.log("AnswerUser: " + answerUserRef.current);
                console.log("Winner: " + winningUser);

                // Update the scores object to increment the winning player's score
                setScores((prevScores) => ({
                    ...prevScores,
                    [winningUser]: (prevScores[winningUser] || 0) + 1,
                }));

                setShowVoteModal(false); // Close the modal


                handleRefreshValues(); // Call the refresh function

                // Trigger a notification or animation
                // You can set a timer to hide the notification after some time
                setTimeout(() => {
                    setWinner(""); // Reset winner
                }, 3000); // Hide after 1 second
            } else {
                setShowVoteModal(false);
            }
        });

        return () => {
            socket.off("start_vote");
            socket.off("vote_outcome");
        };
    }, [socket]);

    // Display Scores
    const renderScores = () => {
        return (
            <div className="scores">
                {Object.entries(scores).map(([user, score]) => (
                    <div key={user} className="score">
                        <span className="username">{user}:</span> {score} points
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="game">
            {showVoteModal ? (
                <VoteModal
                    socket={socket}
                    answerRef={answerRef}
                    users={users}
                    answerUserRef={answerUserRef}
                />
            ) : null}
            {winner && (
                <div className="winner-notification">
                    Player {winner} wins a point!
                </div>
            )}
            {renderScores()} {/* Display Scores */}
            <h1>Game</h1>
            <h2>{user}</h2>
            <Timer />
            <GameBoard socket={socket} handleRefreshValues={handleRefreshValues} handleRandomCategory={handleRandomCategory} handleRandomLetter={handleRandomLetter} />
            <AnswerInput
                socket={socket}
                user={user}
                users={users}
                answer={answer}
                setAnswer={setAnswer}
            />
        </div>
    );
}

export default Game;
