import React, { Component } from 'react';
import '../css/turnIndicator.css';


class TurnIndicator extends Component {

  toggleTurn() {
  }

  render() {
    let t = this.props.playerTurn;
    const style = {
      maxWidth: this.props.canvasSize,
      width: this.props.canvaseSize
    }

    return (
      <div id="container-div" >
        <input id='player' type="radio" name="turn" checked={t} />
        <label htmlFor="player">player</label>
        <input id='computer' type="radio" name="turn" checked={!t} />
        <label htmlFor="computer"><span>computer</span></label>
      </div>
    )
  }
}

export default TurnIndicator;
