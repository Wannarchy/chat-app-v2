import React from 'react';

import { AddChannel } from '../assets';
import './TeamChannelList.css';

const TeamChannelList = ({children, error = false, loading, type, isCreating,  setIsCreating, setCreateType, setIsEditing}) => {
    if(error){
         return type === 'team' ? (
            <div className="team-channel-list">
                <p className="team-channel-list-message">
                    Connection attendez un moment  puis réessayez. 
                </p>
            </div>
         ) : null
    }

    if(loading ){
        return (
            <div className="team-channel-list">
            <p className="team-channel-list-message loading">
              {type === 'team' ? 'Channels' : 'Messages'} loading...
            </p>
        </div>
        )
    }
    return (
        <div className="team-channel-list">
            <div className="team-channel-list-header">
                <p className="team-channel-list-header-title">
                {type === 'team' ? 'Channels' : 'Direct Messages'}
                </p>
                <AddChannel  
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                type={type ==='team' ? 'team' : 'messaging'}
                />
            </div>
            {children}
        </div>
    )
}

export default TeamChannelList