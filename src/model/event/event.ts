import Payload from "./payload/payload";

abstract class Event<P extends Payload> {
    readonly type: string;
    readonly payload: P;
    readonly timestamp: number;

    protected constructor(type: string, payload: P, timestamp: number) {
        this.type = type;
        this.payload = payload;
        this.timestamp = timestamp;
    }
}

export default Event;
