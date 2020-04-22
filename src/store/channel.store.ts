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
        this.channelEventObservable.subscribe(this.handleEvent)
    }

    static async create(): Promise<ChannelStore> {
        const channels: Array<ChannelModel> = await getAllChannels();
        const initialState = ChannelState.init(channels);
        const observable = createChannelEventObservable();
        return new ChannelStore(observable, initialState);
    }

    subscribe(setState: Dispatch<SetStateAction<ChannelState>>): Subscription {
        return this.channelStateSubject.subscribe(setState)
    }

    handleEvent(event: Event<Payload>): void {
        if (event.type.includes("ChannelCreated")) {
            this.channelState = this.channelState.fromChannelCreated(event as ChannelCreated)
        }

        if (event.type.includes("ChannelDeleted")) {
            this.channelState = this.channelState.fromChannelDeleted(event as ChannelDeleted)
        }

        if (event.type.includes("ChannelStatusChanged")) {
            this.channelState = this.channelState.fromChannelStatusChanged(event as ChannelStatusChanged)
        }

        this.channelStateSubject.next(this.channelState);
    }

}
