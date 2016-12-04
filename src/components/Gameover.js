import React, { Component } from 'react';


export default class Gameover extends Component {

  render() {
    const line = {
        player: "Congratulations! You won!",
        ai: "Awe, try again! you'll do better...hopefully.",
        draw: "Draw. Try again"
      }

      const style = {
        width: '60%',
        height: '60%',
        position: 'absolute',
        top: '20%',
        left: '20%'
      }

    return (
      <div style={{position: 'relative', height: '100%', width: '100%', backgroundColor: 'rgba(50, 50, 50, .7)'}} >
        <div style={style}>
          <h1>{line[this.props.gameOver[1]]}</h1>
          {this.props.children}
        </div>
      </div>
    )
  }
}
