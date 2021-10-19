import React,{useState} from 'react';
import { useChatContext } from 'stream-chat-react';

import './CreateChannel.css';
import { UserList } from './';
import { CloseCreateChannel } from '../assets';



const CreateChannel = ({createType, setIsCreating}) => {
    const {client, setActiveChannel} = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
     const [channelName, setChannelName] = useState('');
     const createChannel = async (e) => {
        e.preventDefault();

        try {
            const newChannel = await client.channel(createType,channelName, { name : channelName, members: selectedUsers});

            await newChannel.watch();

            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([client.userID]);
            setActiveChannel(newChannel);
        } catch (error) {

            
            
        }
     }

    return (
        <div className="create-channel-container">
          <div className="create-channel-header">
              <p>  discussion instantanée</p>
              <CloseCreateChannel setIsCreating={setIsCreating} />
              
          </div>
        
          <UserList setSelectedUsers={setSelectedUsers} />
          <div className="create-channel-button-wrapper" onClick={createChannel} >
            <p>créer une discussion  </p>
          </div>
        </div>
    )
}

export default CreateChannel;
