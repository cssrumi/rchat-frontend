import apiCall, {createObserver} from "./api";
import ChannelModel from "../model/channel.model";
import { Observable } from "rxjs";
import {Event} from '../model/event'
import Payload from "../model/event/payload/payload";


const CHANNEL_RESOURCE_URI = "/v1/channel";
const CHANNEL_EVENTS_URI = "/v1/channel-events";

function getAllChannels(options: RequestInit = {}): Promise<Array<ChannelModel>> {
    return apiCall(CHANNEL_RESOURCE_URI);
}

function addChannel(channelName: string, options: RequestInit = {}) {
    const finalOptions: RequestInit = {
        ...options,
        method: "POST",
        body: JSON.stringify({name: channelName})
    };

    return apiCall(CHANNEL_RESOURCE_URI, finalOptions);
}

function getChannel(channelName: string, options: RequestInit = {}) {
    return apiCall(`${CHANNEL_RESOURCE_URI}/${channelName}`, options);
}

function deleteChannel(channelName: string, options: RequestInit = {}) {
    const finalOptions: RequestInit = {
        ...options,
        method: "DELETE",
    };

    return apiCall(`${CHANNEL_RESOURCE_URI}/${channelName}`, finalOptions);
}

function createChannelEventObservable(): Observable<Event<Payload>> {
    return createObserver(CHANNEL_EVENTS_URI)
}

export {getAllChannels, addChannel, getChannel, deleteChannel, createChannelEventObservable};
