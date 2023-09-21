import React, { useEffect, useState } from "react";
import "../../styles/game.css";

function AnswerInput({ socket, user, setUserAnswers }) {
    const [answer, setAnswer] = useState("");

    const handleSendAnswer = (e) => {
        e.preventDefault();
        console.log(
            "ANSWER_INPUT: Answer submitted: " + answer + " by " + user
        );
        socket.emit("answer_submitted", {answer, user});
        setAnswer("");

<<<<<<< HEAD
        // Update the temporary mapping of users to their submitted answers
        setUserAnswers((prevUserAnswers) => ({
            ...prevUserAnswers,
            [user]: answer,
        }));
    };

=======
>>>>>>> 1c759bed16d03654143d63addefc7a59c3fef30f
    return (
        <div className="answer-input">
            <form className="form" onSubmit={handleSendAnswer}>
                <input
                    type="text"
                    placeholder="Write message"
                    className="answer"
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <button className="sendBtn">SEND</button>
            </form>
        </div>
    );
}

export default AnswerInput;
