import React from "react";
import {ChannelModel, ChannelStatus} from "../../../model";

type ChannelProps = { channel: ChannelModel };
const Channel = ({channel}: ChannelProps) => {

    const checkStatus = () => channel.status === ChannelStatus.Active ? "activeChannel" : "inactiveChannel";

    return (
        <div className={checkStatus()}><p>{channel.name}</p></div>
    );
};

export default Channel;
