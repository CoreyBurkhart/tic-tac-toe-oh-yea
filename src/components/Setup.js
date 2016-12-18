import React, { Component } from 'react';
import '../css/Setup.css';

export default class Setup extends Component {


  startWithProps(e) {
    const {x, o} = this.refs;
    const team = x.checked ? x.id : o.id;
    this.props.setTeam(team);
    this.props.start();
  }

  render() {
    return (
      <div id="setup-background">
        <div id="setup-container" >
          {/* <h1>Choose Your Side!</h1> */}
          <div className='input-container'>
            <input id='x' ref='x' name="team" className="team" type="radio" defaultChecked/>
            <label htmlFor="x">X</label>
            <input id='o' ref='o' name="team" className="team" type="radio" />
            <label htmlFor="o">O</label>
          </div>
          <button onClick={this.startWithProps.bind(this)} >Start</button>
        </div>
      </div>
    );
  }
}
