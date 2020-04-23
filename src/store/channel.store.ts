import ChannelState from "../model/state/channel.state";
import {Observable, Subject, Subscription} from "rxjs";
import {createChannelEventObservable, getAllChannels} from "../api/channel.api";
import {ChannelCreated, ChannelDeleted, ChannelStatusChanged, Event, Payload} from "../model/event";
import ChannelModel from "../model/channel.model";
import {Dispatch, SetStateAction} from "react";


class ChannelStore {
    private readonly channelStateSubject: Subject<ChannelState>
    private readonly channelEventObservable: Observable<Event<Payload>>
    private channelState: ChannelState;

    private constructor(channelEventObservable: Observable<Event<Payload>>,
                        channelState: ChannelState) {
        this.channelStateSubject = new Subject<ChannelState>();
        this.channelEventObservable = channelEventObservable;
        this.channelState = channelState;
        this.channelEventObservable.subscribe((event) => this.handleEvent(event))
    }

    static create(): ChannelStore {
        const initialState = ChannelState.empty();
        const observable = createChannelEventObservable();
        const channelStore = new ChannelStore(observable, initialState);
        channelStore.init();
        return channelStore;
    }

    async init(): Promise<void> {
        const channelModels = await getAllChannels();
        this.channelState = ChannelState.init(channelModels);
        this.channelStateSubject.next(this.channelState);
    }

    subscribe(setState: Dispatch<SetStateAction<ChannelState>>): Subscription {
        return this.channelStateSubject.subscribe(setState)
    }

    handleEvent(event: Event<Payload>): void {
        console.log(`Channels length before event handling: ${this.channelState.channels.length}`)
        const eventType = event.eventType;
        if (eventType.includes("ChannelCreated")) {
            this.channelState = this.channelState.fromChannelCreated(event as ChannelCreated)
        } else if (eventType.includes("ChannelDeleted")) {
            this.channelState = this.channelState.fromChannelDeleted(event as ChannelDeleted)
        } else if (eventType.includes("ChannelStatusChanged")) {
            this.channelState = this.channelState.fromChannelStatusChanged(event as ChannelStatusChanged)
        }

        console.log(`Channels length after event handled: ${this.channelState.channels.length}`)
        console.log(`${eventType} handled.`);
        this.channelStateSubject.next(this.channelState);
    }

}

const channelStore = ChannelStore.create();

export default channelStore;
