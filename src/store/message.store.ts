import {Observable, Subject, Subscription} from "rxjs";
import {MessageModel} from "../model";
import {Dispatch, SetStateAction} from "react";
import {MessageState} from "../model/state";
import {createMessageObservable} from "../api/message.api";


class MessageStore {
    private readonly messageStateSubject: Subject<MessageState>
    private messageEventObservable: Observable<MessageModel> | undefined
    private messageState: MessageState;

    private constructor(messageState: MessageState,
                        messageEventObservable: Observable<MessageModel> | undefined = undefined) {
        this.messageStateSubject = new Subject<MessageState>();
        this.messageEventObservable = messageEventObservable;
        this.messageState = messageState;
    }

    static create(): MessageStore {
        return new MessageStore(MessageState.empty());
    }

    private clear(): void {
        this.messageState = MessageState.empty();
        this.messageStateSubject.next(this.messageState);
    }

    async init(channelName: string): Promise<void> {
        this.clear();
        if (channelName !== "") {
            this.messageEventObservable = createMessageObservable(channelName);
            this.messageEventObservable.subscribe((message) => {
                console.log("Handling new message...")
                this.handleMessage(message)
            });
            console.log("MessageEventObservable created for: " + channelName);
            return;
        }
        console.log("MassageEventObservable can't be created. ChannelName is empty.")
    }

    subscribe(setState: Dispatch<SetStateAction<MessageState>>): Subscription {
        return this.messageStateSubject.subscribe(setState)
    }

    handleMessage(message: MessageModel): void {
        this.messageState = this.messageState.newWithUpserted(message);
        this.messageStateSubject.next(this.messageState);
        console.log("New message has been handled: " + JSON.stringify(message));
    }
}

const messageStore = MessageStore.create();

export default messageStore;
