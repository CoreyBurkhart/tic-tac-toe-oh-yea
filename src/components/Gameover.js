import React, { Component } from 'react';
import '../css/gameover.css'
import giphy from '../media/giphy.png';

export default class Gameover extends Component {

  // TODO: return the img with an onload event that will remove a loader and reveal the gif

  componentDidMount() {
    this.getGif(this.props.gameOver[1])
      .then((response => response.json()))
        .then((response) => {
          const r = Math.floor(Math.random() * 25);
          const gif = response.data[r].images.original;
          const url = gif.url;
                // width = gif.width,
                // height = gif.height
          this.img.src = url;
          window.setTimeout(() => {
            this.img.style = 'visibility: visible';
          }, 2000)
    })
  }

  async getGif(result) {
    const BASE = 'http://api.giphy.com/v1/gifs/search?q=',
          KEY = '&api_key=dc6zaTOxFJmzC';
    let query;

    if(result === 'player') {
      query = 'celebration'
    } else if(result === 'ai') {
      query = 'disappointed'
    } else {
      query = 'confused'
    }

    const url = BASE + query + KEY;
    return fetch(url);
  }

  render() {
    const line = {
        player: "Congratulations! You won!",
        ai: "Awe, try again! you'll do better...hopefully.",
        draw: "Draw. Try again"
      }

    return (
      <div className='gameover-container'>
        <div className='gameover-content-container'>
          <section>
            <h1>{line[this.props.gameOver[1]]}</h1>
            <img ref={(img => this.img = img)} style={{visibility: 'hidden'}} alt='celebratory gif!'/>
            <img src={giphy} />
            {this.props.children}
          </section>
        </div>
      </div>
    )
  }
}
