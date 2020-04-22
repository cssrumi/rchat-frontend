import MessageModel from "./message.model";
import {Observable} from "rxjs";

class ChatModel {
    public channel: Observable<MessageModel>;

    constructor(channel: Observable<MessageModel>) {
        this.channel = channel;
    }
}

export default ChatModel;
