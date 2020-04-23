import React from "react";
import {MessageModel} from "../../../model";

const UserMessage = (message: MessageModel) => {
    return (
        <div className="userMessage"><p>{message.sendAt.getTime()}</p> {message.message}</div>
    );
};

export default UserMessage;
