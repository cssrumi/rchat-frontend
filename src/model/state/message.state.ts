import {MessageModel} from "../index";

class MessageState {
    public readonly messages: Array<MessageModel>

    private constructor(messages: Array<MessageModel>) {
        this.messages = messages;
    }

    newWithUpserted(message: MessageModel) {
        const filteredMessages = this.messages.filter((msg) => msg.id == message.id);
        const updatedMessages = [...this.messages, message];
        return new MessageState(updatedMessages);
    }

    static init(messages: Array<MessageModel>) {
        return new MessageState(messages);
    }
}

export default MessageState;
