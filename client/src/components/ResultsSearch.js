import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import './ResultsSearch.css';

const channelByUser = async ({ client, setActiveChannel, channel, setChannel }) => {
    const filters = {
      type: 'messaging',
      member_count: 2,
      members: { $eq: [client.user.id, client.userID] },
    };
  
    const [existingChannel] = await client.queryChannels(filters);
  
    if (existingChannel) return setActiveChannel(existingChannel);
  
    const newChannel = client.channel('messaging', { members: [channel.id, client.userID] });
    
    setChannel(newChannel)
  
    return setActiveChannel(newChannel);
  };
  
  const SearchResult = ({ channel, focusedId, setChannel, setToggleContainer }) => {
    const { client, setActiveChannel } = useChatContext();
  
   
  
    return (
      <div
        onClick={async () => {
          channelByUser({ client, setActiveChannel, channel, setChannel })
          if(setToggleContainer) {
              setToggleContainer((prevState) => !prevState)   
          }
        }}
        className={focusedId === channel.id ? 'channel-search-result-container-focused' : 'channel-search-result-container' }
      >
        <div className='channel-search-result-user'>
          <Avatar image={channel.image || undefined} name={channel.name} size={24} />
          <p className='channel-search-result-text'>{channel.name}</p>
        </div>
      </div>
    );
  };

  const ResultsSearch = ({ directChannels, focusedId, loading, setChannel, setToggleContainer }) => {

    return (
      <div className='channel-search-results'>
     
        <p className='channel-search-results-header'>Utilisateurs</p>
        {loading && !directChannels.length && (
          <p className='channel-search-results-header'>
            <i>chargement...</i>
          </p>
        )}
        {!loading && !directChannels.length ? (
          <p className='channel-search-res ults-header'>
            <i>Utilisateurs et conversation introuvable</i>
          </p>
        ) : (
          directChannels?.map((channel, i) => (
            <SearchResult
              channel={channel}
              focusedId={focusedId}
              key={i}
              setChannel={setChannel}
              type='user'
              setToggleContainer={setToggleContainer}
            />
          ))
        )}
      </div>
    );
  };
  


export default ResultsSearch
