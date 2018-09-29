import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import Lobby from '../Lobby/Lobby';

const MainRoute = () => (
  <main>
    <Switch>
      <Route exact path="/lobby" component={Lobby} />
      <Route path="/" component={LoginPage} />
    </Switch>
  </main>
);

export default MainRoute;
