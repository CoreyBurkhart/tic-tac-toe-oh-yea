import React, { Component } from 'react';
import util from '../js/utils.js';

export default class Canvas extends Component {
  constructor() {
    super();
    this.lastArr =  ['','','','','','','','',''];
  }

  componentDidMount() {
    this.drawGrid(this.props.canvasSize);
  }

  componentWillReceiveProps(nextProps) {
    let size =  this.props.canvasSize === nextProps.canvasSize ? this.props.canvasSize : nextProps.canvasSize;

    if(!nextProps.winner && nextProps.canvasSize === this.props.canvasSize) {
      this.drawTics(nextProps.gameStateArray, size, this.lastArr);
    } else if (nextProps.canvasSize !== this.props.canvasSize) {
      // special call to redraw all the old marks
      this.drawTics(this.lastArr, nextProps.canvasSize, 'resize');
    }
  }

    drawTics(arr, size, lastArr) {

    let check = [arr.indexOf('x'), arr.indexOf('o')],
        type, arrIndex;

    let tic = (type, location) => {
      let ctx = this.refs.canvas.getContext('2d')
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'white';

      if(type === 'o') {
        ctx.beginPath();
        size /= 8;
        ctx.arc(location.x + size , location.y + size, size, 0, 2 * Math.PI);
        ctx.stroke();
      }
      else if (type === 'x') {
        ctx.beginPath();
        let length = size / 4;
        ctx.moveTo(location.x, location.y);
        ctx.lineTo(location.x + length, location.y + length);
        ctx.moveTo(location.x + length, location.y);
        ctx.lineTo(location.x, location.y + length);
        ctx.stroke();
      }
    }

    if (lastArr === 'resize') {
      // ctx.clearRect(0,0, size, size);
      this.drawGrid(size);
      arr.forEach((ele, index) => {
        tic(ele, util.find(null, index, size));
      })
    } else {

      //if the array is empty, clear and draw a grid
      if(check[0] === -1 && check[1] === -1) {
        this.drawGrid(size);
      }
      else {
        //loop through the array and draw the marks in the proper locations
        //find the new location to mark
        arr.forEach((ele, index) => {
          if(ele !== lastArr[index]) {
            type = ele;
            arrIndex = index;
          }
        });

        tic(type, util.find(null, arrIndex, size));
        this.lastArr = arr.slice(0);
      }
    }



  }

  //MAKE GO OFF THIS.PROPS.canvasSize
  drawGrid(size) {
    let ctx = this.refs.canvas.getContext('2d');
    //canvas must be square!
    let lineSpacing = Math.round(size / 3);

    // ctx.clearRect(0, 0, size, size);
    // canvas styles
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
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
    let size = this.props.canvasSize;

      return (
        <div>
          <canvas ref="canvas" width={size} height={size} onClick={this.props.handleClick}>Canvases are not supported on your browser! my bad. </canvas>
        </div>
      )
  }
}
