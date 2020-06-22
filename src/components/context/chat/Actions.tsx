import React, {FormEvent, useEffect, useState} from "react";
import {UserState} from "../../../model/state";
import {channelStore, userStore} from "../../../store";
import {sendMessage} from "../../../api/message.api";
import SendMessageModel from "../../../model/send.message.model";

const Actions = () => {

    const [userState, setUserState] = useState<UserState>(UserState.empty);
    const [selectedChannel, setSelectedChannel] = useState<string>("");

    useEffect(() => {
        userStore.subscribe(setUserState);
        channelStore.subscribeToSelectedChannel(setSelectedChannel);
        console.log("Actions rendered")
    }, []);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const input = target.elements.namedItem("input") as HTMLInputElement;
        const inputValue = input.value.trim();
        const messageRequest = new SendMessageModel(inputValue);
        sendMessage(messageRequest, selectedChannel, userStore.authorizeOptions());
        target.reset();
        console.log("Message sent...");
    }

    return (
        <div className="actions">
            {
                userStore.isLoggedIn() && (
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            className="input message"
                            id="input"
                            name="input"
                            placeholder="Type your message..."
                            required
                        />
                        <button type="submit" className="button primary">Send</button>
                    </form>
                )
            }
        </div>
    )
}

export default Actions;
