import MessageModel from "./message.model";
import {Observable} from "rxjs";
import ChannelStatusEnum from "./channel.status.enum";

class ChannelModel {
    public readonly name: string;
    public readonly messages: Observable<MessageModel>;

    constructor(name: string, status: ChannelStatusEnum = ChannelStatusEnum.Inactive) {
        this.name = name;
        this.messages = new Observable<MessageModel>();
    }
}

export default ChannelModel;
