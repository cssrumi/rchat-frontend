import React, {useEffect, useState} from "react";
import {channelStore, messageStore, userStore} from "../../../store";
import Message from "./Message";
import MessageModel from "../../../model/message.model";
import {MessageState, UserState} from "../../../model/state";

const Messages = (channel: any) => {

    const [userState, setUserState] = useState<UserState>(UserState.empty);
    const [messageState, setMessageState] = useState<MessageState>(MessageState.empty());
    const [selectedChannel, setSelectedChannel] = useState<string>("");
    let messagesEnd: HTMLDivElement | null;

    useEffect(() => {
        userStore.subscribe(setUserState);
        channelStore.subscribeToSelectedChannel(setSelectedChannel);
        messageStore.subscribe(setMessageState);
    }, []);

    useEffect(() => {
        messageStore.init(selectedChannel);
    }, [selectedChannel])

    useEffect(() => {
        scrollToBottom();
    }, [messageState])

    const time = (message: MessageModel): string => {
        const date = new Date(message.sendAt * 1000);
        return date.toTimeString().split(' ')[0]
    }

    const mapMessage = (message: MessageModel) => {
        return <Message key={message.id} message={message} own={message.sendBy === userState.username} time={time(message)}/>;
    }

    const scrollToBottom = () => {
        if (messagesEnd !== null) {
            messagesEnd.scrollIntoView({behavior: "smooth"});
        }
    }

    return (
        <div className="messages">
            {messageState.messages.map((message) => mapMessage(message))}
            <div ref={(el) => {
                messagesEnd = el;
            }}/>
        </div>
    )
};

export default Messages;
