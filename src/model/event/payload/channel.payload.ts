import Payload from "./payload";

class ChannelPayload implements Payload{
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export default ChannelPayload;
