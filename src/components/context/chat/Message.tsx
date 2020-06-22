import React from "react";
import MessageType from "./message.type";

const Message = ({message, own, time}: MessageType) => (
    <div className={`message ${own && 'own'}`}>
        <div className="info">
            <p className="author bold size-14">{message.sendBy}</p>
            <span className="time size-11">{time}</span>
        </div>
        <p className="content">{message.message}</p>
    </div>
);

export default Message;
