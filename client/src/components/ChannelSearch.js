import React,{useState, useEffect} from 'react';
import {  useChatContext } from 'stream-chat-react';

import './ChannelSearch.css';
import { ResultsSearch } from './';
import {SearchIcon} from '../assets';

const ChannelSearch = ({setToggleContainer}) => {
    const { client, setActiveChannel} = useChatContext();
    const [query,setQuery] = useState('');
    const [loading,setLoading] = useState(false);
    const [teamChannels, setTeamChannels] = useState([]);
    const [directChannels, setDirectChannels] = useState([]);

    useEffect(() => {
        if(!query) {
            setTeamChannels([]);
            setDirectChannels([]);
        }
      
    }, [query])

    const getChannels = async (text) => {
        try {
            const channelResponse = client.queryChannels({
                name : {$autocomplete: text}, 
                members: { $in : [client.userID]}
            });

            const userResponse = client.queryUsers({
                id: {$ne: client.userID},
                name: {$autocomplete: text}
            })

            const [channels, {users}] =  await Promise.all([channelResponse, userResponse]);


            if(channels.length) setTeamChannels(channels);
            if(users.length) setDirectChannels(users);
           // console.log(teamChannels);
         

        } catch (error){
            setQuery('')
        }
    }
    
    const onSearch = (event) => {
        event.preventDefault();

        setLoading(true);
        setQuery(event.target.value);
        getChannels(event.target.value);
    }

    const setChannel = (channel) => {
        setQuery('');
        setActiveChannel(channel);
    }

    return (
        <div className="channel-search-container">
            <div className="channel-search-input-wrapper">
                <div className="channel-search-input-icon">
                    <SearchIcon />
                </div>
                <input className="channel-search-input-text" 
                  placeholder="Chercher"
                  type="text"
                  value={query}
                  onChange={onSearch}
                  />
            </div>
            {query && (
                <ResultsSearch
                teamChannels={teamChannels}
                directChannels={directChannels}
                loading={loading}
                setChannel={setChannel}
                setQuery={setQuery}
                setToggleContainer={setToggleContainer}
                />
            )}
        </div>
    )
}

export default ChannelSearch
