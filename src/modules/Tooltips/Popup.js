import React, { Component } from 'react';
import "./Popup.css"

class Popup extends Component {
  render(){
    return (
      <div className={"popup " + props.type }>
        props.message;
      </div>
    );
  }
}

export default Popup;
