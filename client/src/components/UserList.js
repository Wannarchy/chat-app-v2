import React,{useEffect, useState} from 'react';
import {Avatar, useChatContext} from 'stream-chat-react';

import { InviteIcon } from '../assets';

import './UserList.css';

const ListContainer = ({ children}) => {
    return (
        <div className="user-list-container">
             <div className="user-list-header">
                 <p>Utilisateur</p>
                 <p>Inviter</p>
             </div>
             {children}
        </div>
    )
} 
const UserItem = ({user, setSelectedUsers}) => {
    const [selected, setSelected] = useState(false);

    const handleSelect = () => {
        if(selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUsers) => prevUsers !== user.id))
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers,user.id])
        }
        setSelected((prevSelected) => ! prevSelected);
    } 
    
    return (
        <div className="user-item-wrapper" onClick={handleSelect} >
            <div className="user-item-name-wrapper">
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className="user-item-name"> {user.fullName || user.id}</p>
            </div>
            {selected ? <InviteIcon /> :  <div className="user-item-invite-empty"/>}
           
        </div>
    )
}

const UserList = ({setSelectedUsers }) => {
    const {client} = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
     const getUsers = async () => {
         if(loading) return;

         setLoading(true);

         try {
            const response = await client.queryUsers(
                {id: {$ne: client.userID} },
                {id : 1},
                {limit : 8}
            );

            if(response.users.length) {
                setUsers(response.users);
            } else {
                setListEmpty(true);
            }
         } catch (error){
           setError(true);
         }
         setLoading(false);
     }

     if(client) getUsers ()
    }, []);
    if(error){
        return (
            <ListContainer>

                <div className="user-list-message">
                    Erreur de chargement , réessayer.
                </div>
            </ListContainer>
        )
    }

    if(listEmpty){
        return (
            <ListContainer>

                <div className="user-list-message">
                   Utilisateur introuvable.
                </div>
            </ListContainer>
        )
    }

    return (
       <ListContainer>
           {loading ? <div className="user-list-message">
               chargement utilsateurs ....
           </div> : (
               users ?.map((user,i ) => (
                   <UserItem  index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers}  />
               ))
           )}
       </ListContainer>
    )
}

export default UserList;
