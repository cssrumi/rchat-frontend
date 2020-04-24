import React from "react";
import {ChannelModel, ChannelStatus} from "../../../model";

type ChannelProps = { channel: ChannelModel, onClickFunction: Function};
const Channel = ({channel, onClickFunction}: ChannelProps) => {

    const checkStatus = () => {
        const className = channel.status === ChannelStatus.Active ? "activeChannel" : "inactiveChannel";
        return channel.isSelected ? "selectedChannel" : className;
    };

    return (
        <div className={checkStatus()} onClick={() => onClickFunction(channel.name)}><p>{channel.name}</p></div>
    );
};

export default Channel;
