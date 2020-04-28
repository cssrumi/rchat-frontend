import React from 'react';
import Channels from './channels/Channels';
import Chat from "./chat/Chat";

const ContentWrapper = () => (
    <div className="content-wrapper">
        <Channels/>
        <Chat/>
    </div>
);

export default ContentWrapper;
