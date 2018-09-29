import React, { Component } from 'react';
import "./Popup.css";

class Popup extends Component {
  render() {
    return React.createElement(
      "div",
      { className: "popup " + props.type },
      "props.message;"
    );
  }
}

export default Popup;