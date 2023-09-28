import React, {useState} from 'react'
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";

function RestartModal({socket, winner, users, room, handleRestart}) {
    const [votedRestart, setVotedRestart] = useState(false);

    const handleVote = (vote) => {
        if (votedRestart) return; // If the player has already voted, do nothing
        // Emit a "vote_submitted" event to send the player's vote to the server
        console.log("Vote: " + vote);
        console.log("Users voting: " + users);
        socket.emit("vote_restart_game", vote, users, room);

        setVotedRestart(true); // Set hasVoted to true to prevent the player from voting again
    };

    return (
        <div className="vote-modal restart-modal">
            <div className="modal-content modal-restart">
                {/* Display a loading message if all users haven't voted yet */}
                {votedRestart ? (
                    <h1>Waiting for others to vote...</h1>
                ) : (
                    <h1>
                        The winner is: <br />
                        <span className="highlight">{winner}</span>{" "}
                        <br />
                        Would you like to play again?
                    </h1>
                )}
                <div className="vote-buttons">
                    <button
                        className="yes"
                        onClick={() => handleVote(true)}
                        style={{ display: votedRestart ? "none" : "block" }}
                    >
                        <FaThumbsUp />
                    </button>
                    <button
                        className="no"
                        onClick={() => handleVote(false)}
                        style={{ display: votedRestart ? "none" : "block" }}
                    >
                        <FaThumbsDown />
                    </button>
                </div>
            </div>
        </div>
    );

}

export default RestartModal