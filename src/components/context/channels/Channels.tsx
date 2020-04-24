import React, {useEffect, useState} from 'react';
import {ChannelState} from "../../../model/state";
import {channelStore} from "../../../store";
import Channel from "./Channel";
import {ChannelModel} from "../../../model";
import ChannelStatusEnum from "../../../model/channel.status.enum";

const Channels = () => {

    const [channelState, setChannelState] = useState<ChannelState>(ChannelState.empty());
    // const [selected]

    useEffect(() => {
        channelStore.subscribeToChannelState(setChannelState);
        console.log("Channels rendered")
    }, []);

    const selectChannelOnClick = (channel: string) => {
        console.log("SelectChannelOnClick: " + channel);
        channelStore.selectChannel(channel);
    }

    const sortByStatus = (channelA: ChannelModel, channelB: ChannelModel): number => {
        if (channelA.isSelected) {
            return -1;
        }

        if (channelB.isSelected) {
            return 1;
        }

        if (channelA.status === channelB.status) {
            return 0;
        }

        if (channelA.status === ChannelStatusEnum.Active) {
            return -1;
        }

        return 1;
    }

    const sortAlphabetically = (channelA: ChannelModel, channelB: ChannelModel): number => {
        if (channelA.isSelected || channelB.isSelected) {
            return 0;
        }

        if (channelA.status === channelB.status) {
            return channelA.name.localeCompare(channelB.name);
        }

        return -1;
    }

    return (
        <section className="channels">
            {channelState.channels
                .sort((a, b) => sortByStatus(a, b))
                .sort((a, b) => sortAlphabetically(a, b))
                .map((channel) => (
                <Channel key={channel.name} channel={channel} onClickFunction={selectChannelOnClick}/>
            ))}
        </section>
    )
};

export default Channels;
