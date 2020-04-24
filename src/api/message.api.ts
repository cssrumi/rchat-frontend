import apiCall, {createObserver} from "./api";
import {Observable} from "rxjs";
import {MessageModel, SendMessageModel} from "../model";


const CHANNEL_RESOURCE_URI = "/v1/message";

function sendMessage(message: SendMessageModel, channel: string, options: RequestInit = {}): Promise<void> {
    const finalOptions: RequestInit = {
        ...options,
        method: "POST",
        body: JSON.stringify(message)
    };

    return apiCall(`${CHANNEL_RESOURCE_URI}/${channel}`, finalOptions);
}

function createMessageObservable(channelName: string): Observable<MessageModel> {
    return createObserver(`${CHANNEL_RESOURCE_URI}/${channelName}`);
}

export {sendMessage, createMessageObservable};
