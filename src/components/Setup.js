import React, { Component } from 'react';
import '../css/Setup.css';

export default class Setup extends Component {

  render() {
    const style = {
      width: '60%',
      height: '60%',
      position: 'absolute',
      top: '20%',
      left: '20%'
    }

    return (
      <div id="background-div" style={{position: 'relative'}}>
        <div id="setup-container" style={style}>
          <h2>Choose Your Side!</h2>
          <div className='radio'>
            <input id='x' name="team" onChange={this.props.setTeam} className="team active" type="radio" defaultChecked/>
            <label htmlFor="x">X</label>
            <input id='o' name="team" onChange={this.props.setTeam} className="team" type="radio" />
            <label htmlFor="o">O</label>
          </div>
          <button onClick={this.props.start} >Start Game</button>
        </div>
      </div>
    );
  }
}
