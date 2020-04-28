import React from "react";
import {ChannelModel, ChannelStatus} from "../../../model";

type ChannelProps = { channel: ChannelModel, onClickFunction: Function};
const Channel = ({channel, onClickFunction}: ChannelProps) => {

    const checkStatus = () => {
        const className = channel.status === ChannelStatus.Active ? "active" : "inactive";
        return channel.isSelected ? "selected" : className;
    };

    return (
        <div className={`channel ${checkStatus()}`} onClick={() => onClickFunction(channel.name)}>
            <p className="channel-name">{channel.name}</p>
        </div>
    );
};

export default Channel;
