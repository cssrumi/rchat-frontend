import ChannelStatusEnum from "../../channel.status.enum";
import Payload from "./payload";

class ChannelStatusPayload implements Payload{
    readonly channel: string;
    readonly status: ChannelStatusEnum;

    constructor(channel: string, status: ChannelStatusEnum) {
        this.channel = channel;
        this.status = status;
    }
}

export default ChannelStatusPayload;
