import React,{useState, useEffect} from 'react';
import { getChannel, useChatContext } from 'stream-chat-react';

import './ChannelSearch.css';
import {SearchIcon} from '../assets';

const ChannelSearch = () => {
    const [query,setQuery] = useState('');
    const [loading,setLoading] = useState(false);

    const getChannels = async (text) => {
        try {

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
        </div>
    )
}

export default ChannelSearch
