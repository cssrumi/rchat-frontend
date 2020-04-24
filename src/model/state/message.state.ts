import {MessageModel} from "../index";

class MessageState {
    private static readonly EMPTY_INSTANCE = new MessageState(new Array<MessageModel>());
    public readonly messages: Array<MessageModel>

    private constructor(messages: Array<MessageModel>) {
        this.messages = messages;
    }

    newWithUpserted(message: MessageModel) {
        const filteredMessages = this.messages.filter((msg) => msg.id !== message.id);
        const updatedMessages = [...filteredMessages, message];
        return new MessageState(updatedMessages);
    }

    static init(messages: Array<MessageModel>) {
        return new MessageState(messages);
    }

    static empty() {
        return MessageState.EMPTY_INSTANCE;
    }
}

export default MessageState;
