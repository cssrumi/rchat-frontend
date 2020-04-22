import MessageModel from "../model/message.model";
import React from "react";

const Channel = (channel: ChannelModel) => {
    return (
        <div className="channel"><p>{message.sendAt.getTime()}</p> {message.message}</div>
    );
};

export default Channel;
