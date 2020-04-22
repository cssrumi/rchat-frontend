import ChannelPayload from "./payload/channel.payload";
import Event from './event';

class ChannelCreatedEvent extends Event<ChannelPayload>{
    constructor(type: string, payload: ChannelPayload, timestamp: number) {
        super(type, payload, timestamp)
    }
}

export default ChannelCreatedEvent;
