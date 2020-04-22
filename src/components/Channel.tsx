import React from "react";
import {ChannelModel} from "../model";

const Channel = (channel: ChannelModel) => {
    return (
        <div className="channel"><p>{channel.name}</p></div>
    );
};

export default Channel;
