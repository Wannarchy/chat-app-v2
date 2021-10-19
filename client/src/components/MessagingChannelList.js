import React from 'react';

import { AddChannel } from '../assets';
import './MessagingChannelList.css';

const TeamChannelList = ({setToogleContainer,children, error = false, loading, type, isCreating,  setIsCreating, setCreateType, setIsEditing}) => {
    if(error){
         return type === 'messaging' ? (
            <div className="messaging-channel-list">
                <p className="messaging-channel-list-message">
                    Connection attendez un moment  puis réessayez. 
                </p>
            </div>
         ) : null
    }

    if(loading ){
        return (
            <div className="messaging-channel-list">
            <p className="messaging-channel-list-message loading">
               chargement...
            </p>
        </div>
        )
    }
    return (
        <div className="messaging-channel-list">
            <div className="messaging-channel-list-header">
                <p className="messaging-channel-list-header-title">
                Discussions
                </p>
                
                <AddChannel  
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                type={'messaging'}
                setToogleContainer={setToogleContainer}
                />
             
            </div>
            <div className="messaging-channel-list-overflow scroller">
          
            {children}
            
            </div>
           
        </div>
    )
}

export default TeamChannelList