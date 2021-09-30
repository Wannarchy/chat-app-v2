import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import './TeamChannelPreview.css';

const TeamChannelPreview = ({channel, type}) => {
    const {channel: activeChannel, client } = useChatContext();

  

    const  DirectPreview = () => {
        const members = Objet.values(channel.state.members).filter(({user}) => user.id !== client.userID);

        return (
            <div className="channel-preview-item single">
                <Avatar 
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName}
                    size={24}
                    />
                    <p>{members[0]?.user?.fullName}</p>
            </div>
        )
    }

    return (
        <div className = {
            channel?.id === activeChannel?.id
            ? 'channel-preview_wrapper-selected'
            :'channel-preview-wrapper'
        }
        onClick={() => {
            console.log(channel);
        }}
        >
           
        </div>
    )
}

export default TeamChannelPreview

