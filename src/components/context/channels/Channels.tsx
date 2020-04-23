import React, {useEffect, useState} from 'react';
import {ChannelState} from "../../../model/state";
import {channelStore} from "../../../store";
import {ChannelModel} from "../../../model";
import Channel from "./Channel";

const Channels = () => {

    const [channelState, setChannelState] = useState<ChannelState>(ChannelState.empty());

    useEffect(() => {
        channelStore.subscribe(setChannelState);
        console.log("Channels rendered")
    }, []);

    return (
        <section className="channels">
            {channelState.channels.map((channel) => (
                <Channel key={channel.name} channel={channel}/>
            ))}
        </section>
    )
};

export default Channels;
