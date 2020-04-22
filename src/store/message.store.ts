import {Observable, Subject, Subscription} from "rxjs";
import {MessageModel} from "../model";
import {Dispatch, SetStateAction} from "react";
import {MessageState} from "../model/state";
import {createMessageObservable} from "../api/message.api";


class MessageStore {
    private readonly messageStateSubject: Subject<MessageState>
    private readonly messageEventObservable: Observable<MessageModel>
    private messageState: MessageState;

    private constructor(messageEventObservable: Observable<MessageModel>,
                        messageState: MessageState) {
        this.messageStateSubject = new Subject<MessageState>();
        this.messageEventObservable = messageEventObservable;
        this.messageState = messageState;
        this.messageEventObservable.subscribe(this.handleMessage)
    }

    static async create(): Promise<MessageStore> {
        const messages: Array<MessageModel> = new Array<MessageModel>();
        const initialState = MessageState.init(messages);
        const observable = createMessageObservable();
        return new MessageStore(observable, initialState);
    }

    subscribe(setState: Dispatch<SetStateAction<MessageState>>): Subscription {
        return this.messageStateSubject.subscribe(setState)
    }

    handleMessage(message: MessageModel): void {
        this.messageState = this.messageState.newWithUpserted(message);
        this.messageStateSubject.next(this.messageState);
    }
}

export default MessageStore;
