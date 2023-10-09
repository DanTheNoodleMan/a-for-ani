import React, { useState, useEffect, useRef } from "react";
import GameBoard from "./Game/GameBoard";
import AnswerInput from "./Game/AnswerInput";
import Timer from "./Game/Timer";
import "../styles/game.css";
import VoteModal from "./VoteModal";
import Navbar from "./Navbar";
import RestartModal from "./RestartModal";
import { useAppContext } from "../AppContext"; // Import the context hook
import { useNavigate } from "react-router-dom";

function Game({ socket }) {
    const [showVoteModal, setShowVoteModal] = useState(false);
    const [showRestartModal, setShowRestartModal] = useState(false); // Whether to show the restart modal
    const [winner, setWinner] = useState(""); // The winner of the game

    const { answer, user, users, room, setAnswer } = useAppContext(); // Use the context hook to access shared data

    const answerRef = useRef(""); // Use a ref to store answer
    const answerUserRef = useRef(""); // Use a ref to store answerUser
    const scoresRef = useRef({}); // Use a ref to store scores
    const gameOverRef = useRef(false); // Use a ref to store gameOver

    const navigate = useNavigate();

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

    const handleRestart = () => {
        setWinner("");
        scoresRef.current = {}; // Reset the scoresRef to an empty object
        gameOverRef.current = false;
        setShowRestartModal(false);
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
                const newScores = {
                    ...scoresRef.current, // Get the current scores from the ref
                    [winningUser]: (scoresRef.current[winningUser] || 0) + 1,
                };

                scoresRef.current = newScores; // Update the scores in the ref

                setShowVoteModal(false); // Close the modal

                console.log(
                    "Scores winningUser: ",
                    scoresRef.current[winningUser]
                );
                // Check if the winner has reached 9 points
                if (scoresRef.current[winningUser] >= 9) {
                    gameOverRef.current = true;
                }

                handleRefreshValues(); // Call the refresh function

                console.log("Game over: ", gameOverRef.current);

                if (gameOverRef.current) {
                    setShowRestartModal(true);
                } else {
                    // Display the restart modal if the game is over
                    setTimeout(() => {
                        setWinner(""); // Reset the winner after 2 seconds (pop up displaying winner disappears after 2 secs)
                    }, 2000);
                }
            } else {
                setShowVoteModal(false);
            }
        });

        socket.on("restart_game", () => {
            handleRestart();
        });

        socket.on("exit_game", () => {
            navigate("/");
        });

        return () => {
            socket.off("start_vote");
            socket.off("vote_outcome");
            socket.off("restart_game");
        };
    }, [socket, navigate]);

    // Display Scores
    const renderScores = () => {
        return (
            <div className="scores">
                {Object.entries(scoresRef.current).map(([user, score]) => (
                    <div key={user} className="score">
                        <span className="username">{user}:</span>{" "}
                        <span className="points-won">{score}</span> points
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

            {showRestartModal ? (
                <RestartModal
                    socket={socket}
                    winner={winner}
                    users={users}
                    room={room}
                    handleRestart={handleRestart}
                />
            ) : null}

            {winner && (
                <div className="popup-notification">
                    <div className="progress-bar">
                        <div className="progress"></div>
                    </div>
                    <div className="winner-text">
                        <span className="username">{winner}</span> wins a point!
                    </div>
                </div>
            )}
            <Navbar user={user} />
            <GameBoard
                socket={socket}
                handleRefreshValues={handleRefreshValues}
                handleRandomCategory={handleRandomCategory}
                handleRandomLetter={handleRandomLetter}
                renderScores={renderScores}
            />
            <AnswerInput
                socket={socket}
                user={user}
                answer={answer}
                setAnswer={setAnswer}
                answerRef={answerRef}
            />
        </div>
    );
}

export default Game;
