import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import Lobby from '../Lobby/Lobby';
import CreateRoom from '../Lobby/CreateRoom';

const MainRoute = () => (
  <main>
    <Switch>
      <Route exact path="/lobby" component={Lobby} />
      <Route exact path="/createRoom" component={CreateRoom} />
      <Route path="/" component={LoginPage} />
    </Switch>
  </main>
);

export default MainRoute;
