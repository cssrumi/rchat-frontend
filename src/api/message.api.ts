import apiCall from "./api";
import SendMessageModel from "../model/send.message.model";

const CHANNEL_RESOURCE_URI = "/v1/message";

function sendMessage(message: SendMessageModel, channel: string, options: RequestInit = {}): Promise<void> {
    const finalOptions: RequestInit = {
        ...options,
        method: "POST",
        body: JSON.stringify(message)
    }

    return apiCall(`${CHANNEL_RESOURCE_URI}/${channel}`, finalOptions);
}
