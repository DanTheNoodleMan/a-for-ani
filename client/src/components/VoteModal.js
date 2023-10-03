import React, { useState } from "react";
import "../styles/vote-modal.css";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";

function VoteModal({ socket, answerRef, users, answerUserRef, room }) {
    const [hasVoted, setHasVoted] = useState(false);

    const handleVote = (vote) => {
        if (hasVoted) return; // If the player has already voted, do nothing
        // Emit a "vote_submitted" event to send the player's vote to the server
        console.log("Vote: " + vote);
        console.log("Users voting: " + users);
        console.log("answerUser: " + answerUserRef.current);
        socket.emit("vote_submitted", vote, answerRef.current, users, room);

        setHasVoted(true); // Set hasVoted to true to prevent the player from voting again
    };

    return (
        <div className="vote-modal">
            <div className="modal-content">
                {/* Display a loading message if all users haven't voted yet */}
                {hasVoted ? (
                    <h1>Waiting for others to vote...</h1>
                ) : (
                    <h1>
                        Is the answer:{" "}
                        <span className="highlight">{answerRef.current}</span>{" "}
                        by{" "}
                        <span className="highlight">
                            {answerUserRef.current}
                        </span>{" "}
                        acceptable?
                    </h1>
                )}
                <div className="vote-buttons">
                    <button
                        className="yes"
                        onClick={() => handleVote(true)}
                        style={{ display: hasVoted ? "none" : "block" }}
                    >
                        <FaThumbsUp />
                    </button>
                    <button
                        className="no"
                        onClick={() => handleVote(false)}
                        style={{ display: hasVoted ? "none" : "block" }}
                    >
                        <FaThumbsDown />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VoteModal;
