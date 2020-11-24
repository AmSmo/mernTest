import React from 'react';
import Chat from './Chat'
class MainPage extends React.Component {

    render() {
        return (
            <div>
                <Chat roomId={"123"}/>
                <Chat roomId={"456"} control/>
                <Chat roomId={"123"}/>


            </div>
        );
    }
}

export default MainPage;

