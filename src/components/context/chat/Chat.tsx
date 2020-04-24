import React from "react";
import Messages from "./Messages";
import Inputs from "./Inputs";

const Chat = () => {
    return (
        <section className="chat">
            <Messages/>
            <Inputs/>
        </section>
    )
}

export default Chat;
