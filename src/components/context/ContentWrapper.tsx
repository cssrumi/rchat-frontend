import React from 'react';
import Channels from './channels/Channels';
import Messages from "./messages/Messages";

const ContentWrapper = () => {
    return (
        <div className="content-wrapper">
            <Channels/>
            <Messages/>
        </div>);
}

export default ContentWrapper;
