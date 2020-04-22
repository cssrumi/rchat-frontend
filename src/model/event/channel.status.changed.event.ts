import ChannelStatusPayload from "./payload/channel.status.payload";
import Event from './event';

class ChannelStatusChangedEvent extends Event<ChannelStatusPayload> {
    constructor(type: string, payload: ChannelStatusPayload, timestamp: number) {
        super(type, payload, timestamp)
    }
}

export default ChannelStatusChangedEvent;
