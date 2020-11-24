import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ChatsContainer from '../Chat/ChatsContainer'
import Chat123 from '../Chat/Chat123'

const App = () => (
   <div>
    <NavBarContainer />
    <Switch>
        <Route path="/chat1" render={routerprops => <ChatsContainer {...routerprops} />} />
        <Route path="/chat" render={routerprops => <Chat123 {...routerprops} />} />
        <AuthRoute exact path="/" component={SignupFormContainer} />
    </Switch>
  </div>
);

export default App;