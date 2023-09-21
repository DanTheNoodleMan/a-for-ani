    import React from "react";
    import "../styles/vote-modal.css";
    import { FaThumbsUp } from "react-icons/fa";
    import { FaThumbsDown } from "react-icons/fa";

    function VoteModal({ answer, socket, users, user, userAnswers }) {

        const handleVote = (vote) => {
            // Emit a "vote_submitted" event to send the player's vote to the server
            console.log("Vote: " + vote)
            console.log("Users voting: " + users)
            socket.emit("vote_submitted", { vote, answer, users });
        };

        return (
            <div className="vote-modal">
                <div className="modal-content">
                    <h1>
                        Is the answer: <span className="highlight">{answer}</span>{" "}
                        by <span className="highlight">{user}</span> acceptable?
                    </h1>
                    <div className="vote-buttons">
                        <button className="yes" onClick={() => handleVote(true)}>
                            <FaThumbsUp />
                        </button>
                        <button className="no" onClick={() => handleVote(false)}>
                            <FaThumbsDown />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    export default VoteModal;
