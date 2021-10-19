import React,{ useState} from 'react';
import { ChannelList, Avatar, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, MessagingChannelList, TeamChannelPreview } from './';
import './ChannelListContainer.css';
import LogoutIcon from '../assets/logout.png'

const cookies = new Cookies();




const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');

}

const LogoutFunction = ({ logout}) => (
    <div className="channel-list-header">
        <div className="channel-list-header-icon"onClick={logout}>
             <img src={LogoutIcon} alt="logout" width="30" />
      </div>
    </div>
);


const ChannelListContent = ({isCreating,  setIsCreating, setCreateType, setIsEditing, setToogleContainer}) => {
    const {client} = useChatContext();
   


    const MyUserHeader = () => (
        <div className="channel-list-header-user-info">
            <Avatar image={image} shape='circle' size={55}/>
           
            <div className="channel-list-header-user-info-name">
            <p>{myName} </p>
            </div>
          
        </div> 
    );

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

    const filters = { members : { $in: [ client.userID] }} ;
    const image = client.user.image;
    const myName = client.user.fullName;
    


    return (
        <>
    
           <div className="channel-list-list-wrapper">
               <LogoutFunction logout={logout}/>
                <MyUserHeader image={image} myName={myName} />
                <ChannelSearch setToogleContainer={setToogleContainer}/>
              

            <ChannelList 
                 filters={filters}
                 channelRenderFilterFn={customChannelMessagingFilter}
                 List={(listProps) => (
                    <MessagingChannelList 
                    {...listProps}
                    type="messaging"
                    isCreating={isCreating}
                      setIsCreating={setIsCreating}
                       setCreateType={setCreateType}
                        setIsEditing={setIsEditing}
                        setToogleContainer={setToogleContainer}
                    />
                  )}
                  Preview={(previewProps)=>(
                      <TeamChannelPreview
                      setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}
                      {...previewProps}
                      setToogleContainer={setToogleContainer}
                      type="messaging"
                      />
                  )}
                  />
           </div>
           </>
        
    );
}
import './TeamChannelPreview.css';
const ChannelListContainer = ({setCreateType, setIsCreating, setIsEditing}) => {
    const [toogleContainer, setToogleContainer] = useState(false)

    return (
        <>
        <div className="channel-list-container">
            <ChannelListContent
            setIsCreating={setIsCreating} 
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
               />
        </div>

        <div className="channel-list-container-responsive" style={{left : toogleContainer ? "0%" : "-79%", backgroundColor : "#101010"}} > 
        
                <div className="channerl-list-container-toggle" onClick={ () => setToogleContainer((prevToggleContainer) => !prevToggleContainer)}>

                </div>
                <ChannelListContent
            setIsCreating={setIsCreating} 
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
            setToogleContainer={setToogleContainer}
               />

        </div>
        </>
    )
}

export default ChannelListContainer;
//<div className="channel-list__container-responsive" style={{left : toogleContainer ? "0%" : "-89%", backgroundColor : "#005fff"}} >Pour la Version mobile