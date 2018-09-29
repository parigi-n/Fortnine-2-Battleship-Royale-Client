import React, { Component } from 'react';
import './LoginPage/LoginPage.css';

class Header extends Component {
  render() {
    return React.createElement(
      'div',
      { className: 'App-header' },
      React.createElement(
        'h1',
        { className: 'App-title' },
        'Fortnine 2 : Battleship Royale'
      )
    );
  }
}

export default Header;