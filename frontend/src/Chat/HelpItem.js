import React, {useState, useEffect} from 'react'
import Chat from './Chat'

function HelpItem(props){
    let [beingHelped, setBeingHelped] = useState(false)
    return(
        beingHelped ?
        <>
        <Chat roomId={props.message.username}/>
        <button onClick={()=> {
            console.log("AHHH")
            props.deleteMessage(props.message)
            setBeingHelped(false)}
            }>Solved</button>
        </>
        :
        <>
        <li>{props.message.body}</li>
            <button onClick={() => setBeingHelped(true)}>Open Chat</button>)
        </>)}

export default HelpItem