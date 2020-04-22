import ChannelStatusEnum from "./channel.status.enum";

class ChannelModel {
    public readonly name: string;
    public readonly status: ChannelStatusEnum;

    constructor(name: string, status: ChannelStatusEnum = ChannelStatusEnum.Inactive) {
        this.name = name;
        this.status = status;
    }
}

export default ChannelModel;
