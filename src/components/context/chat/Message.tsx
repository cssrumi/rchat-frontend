import {MessageModel} from "../../../model";
import React from "react";

const Message = (message: MessageModel) => {
    return (
        <div className="message"><p>{message.sendAt.getTime()}</p> {message.message}</div>
    );
};

export default Message;
