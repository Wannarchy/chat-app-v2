import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import './ChannelListContainer.css';
import LogoutIcon from '../assets/logout.png'

const cookies = new Cookies();

const MyUserHeader = () => (
    <div className="channel-list-header">
        <p className="channel-list-header-text"  >Avatar + Name</p>
    </div>
);

const TestDeux = ({ logout}) => (
    <div className="channel-list-header">
        <div className="channel-list-header-icon"onClick={logout}>
             <img src={LogoutIcon} alt="logout" width="30" />
      </div>
    </div>
);


const ChannelListContainer = ({isCreating,  setIsCreating, setCreateType, setIsEditing}) => {
    const  logout = () => {
     cookies.remove("token");
     cookies.remove('userId');
     cookies.remove('username');
     cookies.remove('fullName');    
     cookies.remove('avatarURL');
     cookies.remove('hashedPassword');
     cookies.remove('phoneNumber');

     window.location.reload();
    }


    return (
    
           <div className="channel-list-list-wrapper">
               <TestDeux logout={logout}/>
                <MyUserHeader />
                <ChannelSearch/>
                <ChannelList 
                 filters={{}}
                 channelRenderFilterFn={()=> {}}
                 List={(ListProps) => (
                    <TeamChannelList 
                    {...ListProps}
                    type="team"
                            isCreating={isCreating}
                              setIsCreating={setIsCreating}
                               setCreateType={setCreateType}
                                setIsEditing={setIsEditing}
                    />
                  )}
                  Preview={(previewProps)=>(
                      <TeamChannelPreview
                      {...previewProps}
                      type="team"
                      />
                  )}
                  />

            <ChannelList 
                 filters={{}}
                 channelRenderFilterFn={()=> {}}
                 List={(ListProps) => (
                    <TeamChannelList 
                    {...ListProps}
                    type="messaging"
                    isCreating={isCreating}
                      setIsCreating={setIsCreating}
                       setCreateType={setCreateType}
                        setIsEditing={setIsEditing}
                    />
                  )}
                  Preview={(previewProps)=>(
                      <TeamChannelPreview
                      {...previewProps}
                      type="messaging"
                      />
                  )}
                  />
           </div>
        
    )
}

export default ChannelListContainer;
