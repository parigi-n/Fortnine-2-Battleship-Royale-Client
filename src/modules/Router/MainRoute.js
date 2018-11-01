import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import Lobby from '../Lobby/Lobby';
import CreateRoom from '../Lobby/CreateRoom';
import Header from '../Header/Header';
import GameRoom from '../GameRoom/GameRoom';

const MainRoute = () => (
  <main>
    <Header />
    <Switch>
      <Route exact path="/GameRoom" component={GameRoom} />
      <Route exact path="/lobby" component={Lobby} />
      <Route exact path="/createRoom" component={CreateRoom} />
      <Route path="/" component={LoginPage} />
    </Switch>
  </main>
);

export default MainRoute;
