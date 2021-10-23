import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';



import './TeamChannelPreview.css';




const TeamChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => {
    const { channel: activeChannel, client } = useChatContext();




    const DirectPreview = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);

        const renderMessageText = () => {
            const lastMessageText = channel.state.messages[channel.state.messages.length - 1].text;
        
            const text = lastMessageText || 'message text';
        
            return text.length < 60 ? lastMessageText : `${text.slice(0, 70)}...`;
            
          };
        
          if (!channel.state.messages.length) return null;
         // console.log(channel.state.messages[channel.state.messages.length - 1].created_at);
         var date =  channel.state.messages[channel.state.messages.length - 1].created_at.toTimeString().substr(0,5);
        
         
         const presence =  () => {
         if(channel.state.watcher_count > 2 ) {
            
             return 'channel-previewy-item-single-one green'
         }
         else {
            
             return 'channel-previewy-item-single-one red'
         }
         
         }

         const groupChat =  () => {
            const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
            
            if(members.length > 1){
                
                var nameList = members[1].user.fullName;// probleme pour map la liste , je les recupere unpar un donc
                if(members.length > 2 ){
                    var nameListTwo = members[2].user.fullName;
                }
               
                return (
                    ', '+nameList+ ', '+nameListTwo
                )}
                
            
            }

            console.log(channel.state.messages)
           
            const unReadMessage = () => {
                const countUnread = channel.state.unreadCount;
                
              
                if (countUnread > 0 ) {
                    return (
                        <div className="unread-count"> 
                        {countUnread}
                        </div>
                    );
                }else{
                    return (
                        <div className="unread-count-empty"> 
                      
                        </div>
                    );
                }

            }
            
            
               

            
         
            
      
     
    

        return (
            <div className="channel-previewy-item-single">
    
            <div className= {presence()}  >
                <Avatar 
            
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName || members[0]?.user?.id}
                    size={45}
                    
                />
       
            </div>
            
                    <div className="channel-preview-content">
                        <div className="channel-preview-content-name" >
                        <p>{members[0]?.user?.fullName || members[0]?.user?.id}{groupChat()}</p>
                        </div>
                   
                   
                   <p className='channel-preview-content-message'>{renderMessageText()}</p>
                   
                 
                 
                    </div>

                    <div className="channel-preview-content-time">
                          <span>{date}</span>
                          {unReadMessage()}
                     </div>

                  
            </div>
        )
    }

    return (
        <div className={
            channel?.id === activeChannel?.id
                ? 'channel-preview-wrapper-selected'
                : 'channel-preview-wrapper'
        }
        onClick={() => {
          
            setIsEditing(false);
            setActiveChannel(channel);
            if(setToggleContainer) {
                setToggleContainer((prevState) => !prevState)
            }
        }}
        >
             <DirectPreview />
        </div>
    );
}

export default TeamChannelPreview

