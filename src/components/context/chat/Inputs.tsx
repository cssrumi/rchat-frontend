import React, {FormEvent, useEffect, useState} from "react";
import {UserState} from "../../../model/state";
import {channelStore, userStore} from "../../../store";
import {sendMessage} from "../../../api/message.api";
import SendMessageModel from "../../../model/send.message.model";

const Inputs = () => {

    const [userState, setUserState] = useState<UserState>(UserState.empty);
    const [selectedChannel, setSelectedChannel] = useState<string>("");

    useEffect(() => {
        userStore.subscribe(setUserState);
        channelStore.subscribeToSelectedChannel(setSelectedChannel);
        console.log("Inputs rendered")
    }, []);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const input = target.elements.namedItem("input") as HTMLInputElement;
        const inputValue = input.value.trim();
        const messageRequest = new SendMessageModel(inputValue);
        sendMessage(messageRequest, selectedChannel, userStore.authorizeOptions());
        target.reset();
        console.log("Message send...");
    }

    const optionalInput = () => {
        if (userStore.isLoggedIn()) {
            return (
                <form className="inputs" onSubmit={onSubmit}>
                    <input
                        type="text"
                        className="text"
                        id="input"
                        name="input"
                        placeholder="Type your message..."
                        required
                    />
                    <button type="submit" hidden/>
                </form>
            );
        }
    }

    return (
        <div className="inputs">
            {optionalInput()}
        </div>
    )
}

export default Inputs;
