import MessageModel from "../model/message.model";
import React from "react";

const UserMessage = (message: MessageModel) => {
    return (
        <div className="userMessage"><p>{message.sendAt.getTime()}</p> {message.message}</div>
    );
};
