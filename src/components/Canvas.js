import React, { Component } from 'react';
import TurnIndicator from './TurnIndicator';
import Ai from './Ai';


export default class Canvas extends Component {


  constructor(props) {
    super(props);

    this.reset = this.reset.bind(this);
    this.state = {'canvasSize': window.innerHeight / 2 , 'playerTurn': true, 'gameOver': ''};
    this.gameStateArray = this.emptyArray();
    this.teams = {
      player: this.props.team,
      ai: this.props.team === 'x' ? 'o' : 'x'
    };
  }


  //should get props:
    //game array
    //size of window?

  emptyArray() {
    let a = [];
    for(var i = 0; i < 9; i++) {
      a.push('');
    }
    return a;
  }

  handleClick(event) {
    //this should not happen EVERY click
    let typeP = this.teams.player,
        typeAi = this.teams.ai,
        loc = this.getClickLocation(event),
        box = this.find(loc),
        ai = new Ai();

    if(this.state.playerTurn && this.props.started) {
      this.gameStateArray = this.updateArray(this.gameStateArray, box, typeP);
      this.testForWin(this.gameStateArray);
      //just gets a number back
      box = ai.chooseIndex(this.gameStateArray);
      //actually makes a move and tests for a a win or draw
      this.aiInterval = setInterval(() => {this.aiMove(this.gameStateArray, box, typeAi)}, 2000);
    }
  }

  aiMove(arr, box, type) {
    this.gameStateArray = this.updateArray(arr, box, type);
    this.testForWin(this.gameStateArray);
    clearInterval(this.aiInterval);
  }


  updateArray(currentArray, box, type) {
    if(currentArray[box] === '') {
      currentArray[box] = type;
      this.drawTic(this.find(false, box), type);
      this.setState({'playerTurn': !this.state.playerTurn});
    }

    return currentArray;
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
      this.timerID = window.setInterval(() => {this.reset()}, 1000);
      this.gameStateArray = this.emptyArray();
      this.setState({gameOver: result, 'playerTurn': true});
      this.props.start();
      //make a popup thingamagig
    }
    gameOver = gameOver.bind(this);

    //draw
    if (newStateArr.indexOf('') === -1) {
      gameOver('draw');
      return;
    }

    for(var i in CASES) {
      for(var j in CASES[i]) {
        let testArray = CASES[i][j].map((ele) => {
          return newStateArr[ele];
        });

        if(testArray.indexOf('') === -1 && testArray[0] === testArray[1] && testArray[1] === testArray[2] ) {
          gameOver(testArray[0] === this.teams.player ? 'player' : 'ai');
          return;
        }
      }
    }
  }

  getClickLocation(event) {
    let x,
        y,
        t = event.target;

    x = event.x - t.offsetLeft;
    y = event.y - t.offsetTop;

    return {x: x, y: y};
  }



  //belongs here
  componentDidMount() {
    this.drawGrid();
    window.addEventListener('resize', this.setCanvasSize.bind(this));
    window.addEventListener('resize', this.drawGrid.bind(this));
    this.refs.canvas.addEventListener('click', this.handleClick.bind(this));
  }
  reset() {
    clearInterval(this.timerID);
    //draw another grid
    this.drawGrid();
  }
  find(loc, boxNum) {
    let x=0, y=0;

    if(loc) {
      x = loc.x;
      y = loc.y;
    }

    let size = this.state.canvasSize;
    const _offset = Math.round(size / 25);

    if(loc) {
      if(x < (size / 3)) {
        if (y < (size / 3)) {
          return 0;
        } else if ((size / 3) < y && y < (2 * size / 3)) {
          return 3;
        } else if(y > (2 * size / 3)) {
          return 6;
        }
      }
      //col 2
      else if ((size / 3) < x && x < (2 * size / 3)) {
        if (y < (size / 3)) {
          return 1;
        } else if ((size / 3) < y && y < (2 * size / 3)) {
          return 4;
        } else if(y > (2* size / 3)){
          return 7;
        }
      }
      //col 3
      else if (x > (2 * size / 3)){
        if (y < (size / 3)) {
          return 2;
        } else if ((size / 3) < y && y < (2 * size / 3)) {
          return 5;
        } else if(y > (2 * size / 3)){
          return 8;
        }
      }
    }

    if(!loc && typeof boxNum === 'number') {
      if(boxNum === 0 || boxNum === 3 || boxNum === 6) {
        if (boxNum === 0) {
          return {x: _offset, y: _offset};
        } else if (boxNum === 3) {
          return {x: _offset, y: size / 3 + _offset};
        } else if(boxNum === 6){
          return {x: _offset, y: 2 * size / 3 + _offset};
        }
      }
      //col 2
      else if (boxNum === 1 || boxNum === 4 || boxNum === 7) {
        if (boxNum === 1) {
          return {x: size / 3 + _offset, y: _offset};
        } else if (boxNum === 4) {
          return {x: size / 3 + _offset, y: size / 3 + _offset};
        } else if(boxNum === 7){
          return {x: size / 3 + _offset, y: 2 * size / 3 + _offset};
        }
      }
      //col 3
      else if (boxNum === 2 || boxNum === 5 || boxNum === 8){
        if (boxNum === 2) {
          return {x: 2 * size / 3 + _offset, y: _offset};
        } else if (boxNum === 5) {
          return {x: 2 * size / 3 + _offset, y: size / 3 + _offset};
        } else if(boxNum === 8){
          return {x: 2 * size / 3 + _offset, y: 2 * size / 3 + _offset};
        }
      }
    }
  }
  setCanvasSize(width, height) {
    width = window.innerWidth;
    height = window.innerHeight;

    //size is the lesser of the 2
    let size = width > height ? height : width;
    this.setState({'canvasSize': size / 2});
  }
  drawTic(location, type) {
    let ctx = this.refs.canvas.getContext('2d');
    ctx.lineWidth = 10;

    if(type === 'o') {
      ctx.beginPath();
      let size = this.state.canvasSize / 8;
      ctx.arc(location.x + size , location.y + size, size, 0, 2 * Math.PI);
      ctx.stroke();
    }

    else if (type === 'x') {
      ctx.beginPath();
      let length = this.state.canvasSize / 4;
      ctx.moveTo(location.x, location.y);
      ctx.lineTo(location.x + length, location.y + length);
      ctx.moveTo(location.x + length, location.y);
      ctx.lineTo(location.x, location.y + length);
      ctx.stroke();
    }
  }
  drawGrid() {
    let ctx = this.refs.canvas.getContext('2d');
    let size = this.state.canvasSize;
    //canvas must be square!
    let lineSpacing = Math.round(size / 3);

    ctx.clearRect(0, 0, size, size);
    // canvas styles
    ctx.fillStyle = 'black';
    ctx.lineWidth = 2;
    //draw tictactoe grid according to size of canvas
    ctx.beginPath();
    ctx.moveTo(lineSpacing, 0);
    ctx.lineTo(lineSpacing, size);
    ctx.moveTo(lineSpacing * 2, 0);
    ctx.lineTo(lineSpacing * 2, size);
    ctx.moveTo(0, lineSpacing);
    ctx.lineTo(size, lineSpacing);
    ctx.moveTo(0, lineSpacing * 2);
    ctx.lineTo(size, lineSpacing * 2);
    ctx.stroke();
  }

  render() {

      return (
        <div>
          <canvas ref="canvas" width={this.state.canvasSize} height={this.state.canvasSize}>Canvases are not supported on your browser! my bad. </canvas>
          <TurnIndicator playerTurn={this.state.playerTurn} />
        </div>
      )
  }
}
