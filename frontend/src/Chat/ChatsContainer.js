import React from 'react';
import Chat from './Chat'
import UserHelp from './UserHelp';
import HelpDesk from './HelpDesk'
class MainPage extends React.Component {

    render() {
        return (
            <div>
                <HelpDesk />
                <Chat roomId={"123"}/>
                <Chat roomId={"456"} control/>
                <UserHelp />

            </div>
        );
    }
}

export default MainPage;

