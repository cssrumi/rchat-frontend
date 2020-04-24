import React from "react";
import MessageType from "./message.type";

const Message = ({message, time}: MessageType) => {

    return (
        <div className="message"><p>{time}</p> {message.message}</div>
    );
};

export default Message;
