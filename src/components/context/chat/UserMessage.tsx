import React from "react";
import MessageType from "./message.type";

const UserMessage = ({message, time}: MessageType) => {

    return (
        <div className="userMessage"><p>{time}</p> {message.message}</div>
    );
};

export default UserMessage;
