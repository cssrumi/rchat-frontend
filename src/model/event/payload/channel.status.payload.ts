import ChannelStatusEnum from "../../channel.status.enum";
import Payload from "./payload";

class ChannelStatusPayload implements Payload{
    readonly channel: string;
    readonly newStatus: ChannelStatusEnum;

    constructor(channel: string, newStatus: ChannelStatusEnum) {
        this.channel = channel;
        this.newStatus = newStatus;
    }
}

export default ChannelStatusPayload;
