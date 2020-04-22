class MessageModel {

    public readonly id: number;
    public readonly sendBy: string;
    public readonly message: string;
    public readonly sendAt: Date;

    constructor(id: number, sendBy: string,
                message: string, sendAt: number) {
        this.id = id;
        this.sendBy = sendBy;
        this.message = message;
        this.sendAt = new Date(sendAt * 1000);
    }

}

export default MessageModel;
