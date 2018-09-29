import React from 'react';
import LoginPage from '../LoginPage/LoginPage';
import Lobby from '../Lobby/Lobby.js'
import { Switch, Route } from 'react-router-dom'

const MainRoute = () => (
  <main>
    <Switch>
      <Route exact path='/lobby' component={Lobby} />
      <Route path='/' component={LoginPage}/>
    </Switch>
  </main>
)

export default MainRoute;
