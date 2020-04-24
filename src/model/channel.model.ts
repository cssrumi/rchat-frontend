import ChannelStatusEnum from "./channel.status.enum";

class ChannelModel {
    public readonly name: string;
    public readonly status: ChannelStatusEnum;
    public readonly isSelected: boolean;

    constructor(name: string,
                status: ChannelStatusEnum = ChannelStatusEnum.Inactive,
                isSelected: boolean = false) {
        this.name = name;
        this.status = status;
        this.isSelected = isSelected;
    }
}

export default ChannelModel;
