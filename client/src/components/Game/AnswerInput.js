import React, { useEffect, useState } from "react";
import "../../styles/game.css";

function AnswerInput({ socket }) {
    const [answer, setAnswer] = useState("");

    const handleSendAnswer = (e) => {
        e.preventDefault();
        socket.emit("answer_submitted", answer);
        setAnswer("");
    };


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
