import React, { Component } from 'react';
import Canvas from './Canvas';
import Setup from './Setup';
import Gameover from './Gameover';
import '../css/app.css';

class App extends Component {
  constructor() {
    super();
    this.state = {'started': false, 'team': 'x'};
    this.setTeam = this.setTeam.bind(this);
    this.toggleStart = this.toggleStart.bind(this);
  }


  //EXPORTS TO SETUP
  toggleStart(e) {
    this.setState({'started': !this.state.started});
  }

  setTeam(e) {
    if(e.target.checked === true) {
      this.setState({'team': e.target.id});
  }

  }

  render() {

    if (!this.state.started) {
      return (
        <Setup start={this.toggleStart} setTeam={this.setTeam} />
      );
    }
    return (
      <div className="App">
        <Canvas team={this.state.team} started={this.state.started} />
        <Gameover  >
          <button onClick={this.state.toggleStart} >
            play again
          </button>
        </Gameover>
      </div>
    );

  }
}

export default App;
