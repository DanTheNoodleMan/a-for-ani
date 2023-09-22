    import React from "react";
    import "../styles/vote-modal.css";
    import { FaThumbsUp } from "react-icons/fa";
    import { FaThumbsDown } from "react-icons/fa";

    function VoteModal({ socket, answerRef, users, answerUserRef }) {

        const handleVote = (vote) => {
            // Emit a "vote_submitted" event to send the player's vote to the server
            console.log("Vote: " + vote)
            console.log("Users voting: " + users)
            console.log("answerUser: " + answerUserRef.current)
            socket.emit("vote_submitted", vote, answerRef.current, users);
        };

        return (
            <div className="vote-modal">
                <div className="modal-content">
                    <h1>
                        Is the answer: <span className="highlight">{answerRef.current}</span>{" "}
                        by <span className="highlight">{answerUserRef.current}</span> acceptable?
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
