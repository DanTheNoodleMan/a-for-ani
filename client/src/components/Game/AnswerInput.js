import React, { useEffect } from "react";
import "../../styles/game.css";

function AnswerInput({ socket, user, answer, setAnswer }) {
    const handleSendAnswer = (e) => {
        e.preventDefault();
        console.log(
            "ANSWER_INPUT: Answer submitted: " + answer + " by " + user
        );

        socket.emit("answer_submitted", answer, user);
        // Reset the answer input field to an empty string
        setAnswer("");
    };

    const handleInputChange = (event) => {
        setAnswer(event.target.value);
    };


    return (
        <div className="answer-input">
            <form className="form">
                <input
                    type="text"
                    placeholder="Send your answer"
                    className="answer"
                    onChange={handleInputChange}
                    value={answer}
                />
                <button className="sendBtn" onClick={handleSendAnswer}>
                    SEND
                </button>
            </form>
        </div>
    );
}

export default AnswerInput;
