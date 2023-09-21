    import React from "react";
    import "../styles/vote-modal.css";
    import { FaThumbsUp } from "react-icons/fa";
    import { FaThumbsDown } from "react-icons/fa";

<<<<<<< HEAD
    function VoteModal({ answer, socket, users, user, userAnswers }) {
=======
    function VoteModal({ answer, socket, users }) {
>>>>>>> 1c759bed16d03654143d63addefc7a59c3fef30f

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
<<<<<<< HEAD
                        by <span className="highlight">{user}</span> acceptable?
=======
                        valid?
>>>>>>> 1c759bed16d03654143d63addefc7a59c3fef30f
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
