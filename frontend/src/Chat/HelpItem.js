import React, {useState, useEffect} from 'react'
import Chat from './Chat'
import styled from 'styled-components'

function HelpItem(props){
    let [beingHelped, setBeingHelped] = useState(false)
    return(
        beingHelped ?
        <>
        <Chat roomId={props.message.username}/>
        <button onClick={()=> {
            props.deleteMessage(props.message)
            setBeingHelped(false)}
            }>Solved</button>
        </>
        :
        <UserNeeds>
            {props.message.body}
            <HelpButton onClick={() => setBeingHelped(true)}>Open Chat</HelpButton>
        </UserNeeds>
        )
    }

const HelpButton= styled.button`
    background: blue;
    width: 80px;
    border-readius: 80px;
    border: 0.5px solid whitesmoke
`

const UserNeeds= styled.li`
    list-style:none;

`

export default HelpItem