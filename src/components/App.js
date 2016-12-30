import React, { Component } from 'react';
import Canvas from './Canvas';
import Setup from './Setup';
import Gameover from './Gameover';
import util from '../js/utils.js';
import Ai from '../js/Ai';
import TurnIndicator from './TurnIndicator';
import '../css/app.css';

class App extends Component {

  constructor() {
    super();

    //BINDS!
    this.handleClick = this.handleClick.bind(this);
    this.setTeam = this.setTeam.bind(this);
    this.toggleStart = this.toggleStart.bind(this);
    this.reset = this.reset.bind(this);

    this.state = {
      'started': false,
      'playerTurn': true,
      'winner': false,
      'gameStateArray': util.emptyArray(),
      'canvasSize': window.innerHeight / 2,
      'teams': {
        player: 'x',
        ai: 'o'
      }
    };
  }

 //resets the state array and related vars

  handleClick(event) {
    let loc = util.getClickLocation(event),
        box = util.find(loc, false, this.state.canvasSize);

    //player move otherwise nothing
    if(this.state.playerTurn && this.state.gameStateArray[box] === '') {
      const {player, ai} = this.state.teams;
      const AI = new Ai();

      this.updateArray(this.state.gameStateArray, box, player)
      box = AI.chooseIndex(this.state.gameStateArray);
      window.setTimeout(() => {
        this.updateArray(this.state.gameStateArray, box, ai)}, 1500);
    }
  }

  updateArray(currentArray, box, type) {
    currentArray[box] = type;
    const newState = {
      'playerTurn': !this.state.playerTurn,
      'gameStateArray': currentArray
     }
    this.setState(newState, this.testForWin(currentArray));
  }
  reset() {
    this.setState({
      'gameStateArray': util.emptyArray(),
      'started': false,
      'winner': false
    })
  }

  testForWin(newStateArr) {
    //win cases
    const CASES = {
      vertical: [[0, 3, 6], [1,4,7], [2,5,8]],
      horizontal: [[0,1,2], [3,4,5], [6,7,8]],
      diagonal: [[0,4,8], [2,4,6]]
    };

    let test = (gameArray, testIndices) => {
      //if 3 in a row, return that letter
      let winner = false;
      testIndices.forEach((ele) => {
        const string = gameArray[ele[0]] + gameArray[ele[1]] + gameArray[ele[2]]
        if (/x{3}|o{3}/.test(string)) {
          winner = string[0];
        }
      })
      return winner;
    }
    let gameOver = (result) => {
      this.setState({winner: result});
    }
    const n = newStateArr;
    let winner = test(n, CASES.vertical) || test(n, CASES.horizontal) || test(n, CASES.diagonal);

    if(winner === false && newStateArr.indexOf('') === -1) {
      //game was a draw
      gameOver('draw')
    } else if(winner) {
      gameOver(winner)
    }
    return false;
  }
  //PROPS USED BY SETUP
  toggleStart(e) {
    this.setState({'started': !this.state.started});
  }

  setTeam(team) {
    this.setState({'teams': {'player': team, 'ai': team === 'x' ? 'o' : 'x'}});
  }
  render() {
    const s = this.state;
    let winner;
    if(s.winner === s.teams.player) {
      winner = 'player';
    } else if(s.winner === s.teams.ai) {
      winner = 'ai'
    } else if(s.winner === 'draw') {
      winner = 'draw';
    }

    if (s.winner) {
      return (
        <Gameover  winner={winner}>
          <button onClick={this.reset} >play again</button>
        </Gameover>
      )
    } else if (!s.started) {
      return (
        <Setup start={this.toggleStart} setTeam={this.setTeam} />
      );
    } else {
      return (
        <div className="App">
          <Canvas handleClick={this.handleClick} winner={s.winner} location={s.location} canvasSize={s.canvasSize} gameStateArray={s.gameStateArray}  />
          <TurnIndicator playerTurn={s.playerTurn} />
        </div>
      );
    }
  }
}

export default App;
