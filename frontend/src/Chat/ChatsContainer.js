import React, {useState} from 'react';
import Chat from './Chat'
import UserHelp from './UserHelp';
import HelpDesk from './HelpDesk'
import styled from 'styled-components'
import {HelpButton} from '../styles/styles'
function MainPage(props){

        const [needHelp, setNeedHelp] = useState(false)
        return (
            <div>
                <HelpDesk />
                <Chat roomId={"123"}/>
                <Chat roomId={"456"} control/>
                    {needHelp ?
                    <BottomRight>
                        <UserHelp />
                    </BottomRight>
                    :
                    <HelpButton style={{
                        right: "10px",
                        bottom: "5px"}}
                        onClick={() => setNeedHelp(true)}>
                            Help
                        </HelpButton>
                    }
                
            </div>
        );
    }

const BottomRight = styled.div`
    position: fixed;
    right: 10px;
    bottom: 10px;
`

export default MainPage;

