import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {useHelp} from'../actions/helpFunctions'
import Chat from './Chat'
function UserHelp(props){
    
    
    const { messages, sendMessage } = useHelp(props.username)
    const [newMessage, setNewMessage] = useState("")
    const [myHelp, setMyHelp] = useState(false)
    const handleSendMessage = ()=>{
        sendMessage(props.username + ": " + newMessage)
        setNewMessage("")
        setMyHelp(true)
    }


    const myMessage = (message) =>{
        return message.owner === props.username
    }

    const displayMessages = () => {
        return messages.map((message, idx) => {
            
        return <li key={idx} className={ myMessage(message) ? "sent" : "received"}>{message.body}</li>
} )   }

    return(
         myHelp ? 
            <>
                <Chat roomId = {props.username} />
                <button onClick={()=>setMyHelp(false)}>Solved</button>
            </>
                :
        <div>
            <h2>USER HELP</h2>
            
            <textarea
                value={newMessage}
                onChange={(e)=> setNewMessage(e.target.value)}
                placeholder="Your Message..."
            />
            <button onClick={handleSendMessage}>Send Message</button>
            
                
            </div>
        
        
    )   

    }
const mapStatetoProps = state => {
    if(state.api.user){
        return {username: state.api.user.username, loggedIn: state.api.isAuthenticated}}
    else{
        return {username: localStorage.getItem("username"), loggedIn: true}
    }
}


export default connect(mapStatetoProps)(UserHelp);

