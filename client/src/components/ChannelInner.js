
import React, { useState } from 'react';
import { MessageList, MessageInput, Thread, Window, useChannelActionContext, Avatar, useChannelStateContext, useChatContext } from 'stream-chat-react';

import { ChannelInfo } from '../assets';
import './ChannelInner.css';

export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();
  
  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };
    
    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }
    
    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <Window>
          <MessagingChannelHeader setIsEditing={setIsEditing} />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
       
      </div>
    </GiphyContext.Provider>
  );
};

const MessagingChannelHeader = ({ setIsEditing }) => {
    const { channel} = useChannelStateContext();
    const { client } = useChatContext();
  
    const MessagingHeader = () => {
      const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
      const additionalMembers = members.length - 3;
  
      if(channel.type === 'messaging') {
        return (
          <div className='messaging-channel-header-name-wrapper'>
            {members.map(({ user }, i) => (
              <div key={i} className='messaging-channel-header-name-multi'>
                <Avatar image={user.image} name={user.fullName || user.id} size={34} />
                <p className='messaging-channel-header-name user'>{user.fullName || user.id}</p>
              </div>
            ))}
  
            {additionalMembers > 0 && <p className='messaging-channel-header-name user'>et {additionalMembers} plus</p>}
          </div>
        );
      }
  
      return (
        <div className='messaging-channel-header-channel-wrapper'>
          <p className='messaging-channel-header-name'># {channel.data.name} p</p>
          <span style={{ display: 'flex' }} onClick={() => setIsEditing(true)}>
            <ChannelInfo />
          </span>
        </div>
      );
    };
  
  
    const deleteChannel = async () => { 
      const destroy = await channel.delete();
    }
  
    return (
      <div className='messaging-channel-header-container'>
        <MessagingHeader />
        <div className='messaging-channel-header-right'>
          <button className='messaging-channel-header-right-text' onClick={deleteChannel} >X </button>
        </div>
      </div>
    );
  };

  export default ChannelInner;
  