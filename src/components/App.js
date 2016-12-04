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
      'gameOver': [false, null],
      'gameStateArray': util.emptyArray(),
      'canvasSize': window.innerHeight / 2,
      'location': [null, null],
      'teams': {
        player: 'x',
        ai: 'o'
      }
    };
  }

  componentDidMount() {
    window.addEventListener('resize',
      (e) => {
        console.log('resize');
        let obj = {'canvasSize': util.getCanvasSize()}
        this.setState(obj)
      }
    );
  }
 //resets the state array and related vars
  reset() {
    this.setState({
      'gameStateArray': util.emptyArray(),
      'started': false,
      'gameOver': [false, null]
    })
  }

  handleClick(event) {
    //this should not happen EVERY click
    let typeP = this.state.teams.player,
        typeAi = this.state.teams.ai,
        loc = util.getClickLocation(event),
        box = util.find(loc, false, this.state.canvasSize),
        ai = new Ai();

    if(this.state.playerTurn && this.state.started) {
      this.setState({
        'gameStateArray': this.updateArray(this.state.gameStateArray, box, typeP), 'location': [box , loc]
      },
        () => {
          this.testForWin(this.state.gameStateArray);
          //just gets a number back
          box = ai.chooseIndex(this.state.gameStateArray);
          //actually makes a move and tests for a a win or draw
          this.aiInterval = setInterval(
            () => {this.aiMove(this.state.gameStateArray, box, typeAi)},
            1000
          );
        }
      );
    }
  }

  updateArray(currentArray, box, type) {
    if(currentArray[box] === '') {
      currentArray[box] = type;

      this.setState({'playerTurn': !this.state.playerTurn});
    }

    return currentArray;
  }

  aiMove(arr, box, type) {
    this.gameStateArray = this.updateArray(arr, box, type);
    this.testForWin(this.gameStateArray);
    clearInterval(this.aiInterval);
  }

  testForWin(newStateArr) {

    const CASES = {
      //036 //147 //258
      vertical: [[0, 3, 6], [1,4,7], [2,5,8]],
      //012 //345 //678
      horizontal: [[0,1,2], [3,4,5], [6,7,8]],
      //048 //246
      diagonal: [[0,4,8], [2,4,6]]
    };

    let gameOver = (result) => {
      window.clearInterval(this.aiInterval)
      this.setState({gameOver: [true, result], playerTurn: true});
    }
    gameOver = gameOver.bind(this);

    //draw
    if (!this.state.gameOver[0] && newStateArr.indexOf('') === -1) {
      gameOver('draw');
      return;
    }

    for(var i in CASES) {
      for(var j in CASES[i]) {
        let testArray = CASES[i][j].map((ele) => {
          return newStateArr[ele];
        });

        if(testArray.indexOf('') === -1 && testArray[0] === testArray[1] && testArray[1] === testArray[2] ) {
          gameOver(testArray[0] === this.state.teams.player ? 'player' : 'ai');
          return;
        }
      }
    }
  }


  //PROPS USED BY SETUP
  toggleStart(e) {
    this.setState({'started': !this.state.started});
  }

  setTeam(e) {
    let t = e.target.id;
    if(e.target.checked === true) {
      this.setState({'teams': {'player': t, 'ai': t === 'x' ? 'o' : 'x'}});
    }
  }

  render() {
    let gameover;

    if (this.state.gameOver[0]) {
      gameover =  (<Gameover  gameOver={this.state.gameOver}>
              <button onClick={this.reset} >
                play again
              </button>
            </Gameover>)
    } else {
      gameover = null;
    }

    if (!this.state.started) {
      return (
        <Setup start={this.toggleStart} setTeam={this.setTeam} />
      );
    }
    return (
      <div className="App">
        <Canvas handleClick={this.handleClick} gameOver={this.state.gameOver} location={this.state.location} canvasSize={this.state.canvasSize} gameStateArray={this.state.gameStateArray}  />
        <TurnIndicator playerTurn={this.state.playerTurn} />
        {gameover}
      </div>
    );
  }
}

export default App;
