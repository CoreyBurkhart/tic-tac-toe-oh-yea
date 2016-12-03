import React, { Component } from 'react';
import '../css/turnIndicator.css';


class TurnIndicator extends Component {

  toggleTurn() {
  }

  render() {
    let t = this.props.playerTurn;
    let pos = {top: '0', left: t ? '0' : '50%'}

    return (
      <div id="container-div" style={{maxWidth: this.props.canvasSize}}>
        <label htmlFor="player">player</label>
        <input id='player' type="radio" name="turn"/>
        <label htmlFor="computer"><span>computer</span></label>
        <input id='computer' type="radio" name="turn"/>
        <span id='toggle' style={pos} ></span>
      </div>
    )
  }
}

export default TurnIndicator;
