import React, { Component } from 'react';
import '../css/turnIndicator.css';


class TurnIndicator extends Component {

  toggleTurn() {
  }

  render() {
    let t = this.props.playerTurn;

    return (
      <div id="container-div" style={{maxWidth: this.props.canvasSize}}>
        <input id='player' type="radio" name="turn" checked={t} />
        <label htmlFor="player">player</label>
        <input id='computer' type="radio" name="turn" checked={!t} />
        <label htmlFor="computer"><span>computer</span></label>
      </div>
    )
  }
}

export default TurnIndicator;
