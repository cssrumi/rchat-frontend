import Payload from "./payload/payload";

abstract class Event<P extends Payload> {
    readonly eventType: string;
    readonly payload: P;
    readonly timestamp: number;

    protected constructor(eventType: string, payload: P, timestamp: number) {
        this.eventType = eventType;
        this.payload = payload;
        this.timestamp = timestamp;
    }
}

export default Event;
