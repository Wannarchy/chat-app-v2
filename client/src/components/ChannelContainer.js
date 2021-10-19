import React from 'react';
import { Channel, useChatContext, MessageTeam } from 'stream-chat-react';

import './ChannelContainer.css';
import { ChannelInner, CreateChannel, EditChannel } from './';

const ChannelContainer = (
    { isCreating, setIsCreating, isEditing, setIsEditing, createType}) => {
    const { channel} = useChatContext();

    if(isCreating) {
        return(
            <div className="channel-container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }

    if(isEditing) {
        return(
            <div className="channel-container">
            <EditChannel  setIsEditing={setIsEditing} />
        </div>
        )
    }

    const EmptyState = () => (
        <div className="channel-empty-container">
            <p className="channel-empty-first"> C'est le commencement du Chat</p>
            <p className="channel-empty-second"> envoie d'image , fichier et etc...</p>
        </div>
    )

    return (
        <div className="channel-container">
            <Channel 
            EmptyStateIndicator={EmptyState}
            Message={(messageProps, i) => <MessageTeam key={i} {...messageProps}  /> }
            >
                
                <ChannelInner setIsEditing={setIsEditing}/>
               
            </Channel>
        </div>
    );
}

export default ChannelContainer;
