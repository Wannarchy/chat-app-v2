import React,{useState} from 'react';
import { useChatContext } from 'stream-chat-react';

import './CreateChannel.css';
import { UserList } from './';
import { CloseCreateChannel } from '../assets';

const ChannelNameInput =({ channelName = '', setChannelName}) => {
  
    const handleChange=(event) => {
        event.preventDefault();

        setChannelName(event.target.value)
    }
    return (
        <div className="channel-name-input-wrapper">
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="Channel-name"/>
            <p>Add Members</p>
        </div>
    )
}


const CreateChannel = ({createType, setIsCreating}) => {
    const {client, setActiveChannel} = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);

     const [channelName, setChannelName] = useState('')
    return (
        <div className="create-channel-container">
          <div className="create-channel-header">
              <p>{createType === 'team' ? 'créée un nouveau canal' :  'messageri direct' }</p>
              <CloseCreateChannel setIsCreating={setIsCreating} />
              
          </div>
          {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/> }
          <UserList setSelectedUsers={setSelectedUsers} />
        </div>
    )
}

export default CreateChannel;
