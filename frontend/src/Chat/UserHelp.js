import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {useHelp} from'../actions/helpFunctions'
import {HelpArea, SendMessageButton} from '../styles/styles'
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

    return(
         myHelp ? 
            <HelpArea>
                <Chat roomId = {props.username} help />
                <br></br>
                <button onClick={()=>setMyHelp(false)}>Solved</button>
            </HelpArea>
                :
        <HelpArea>
            <p>Please Describe You Problem</p>
            <textarea
                value={newMessage}
                onChange={(e)=> setNewMessage(e.target.value)}
                placeholder="Your Message..."
            /><br></br>
            <SendMessageButton onClick={handleSendMessage}>Send Message</SendMessageButton>
            
                
        </HelpArea>
        
        
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

