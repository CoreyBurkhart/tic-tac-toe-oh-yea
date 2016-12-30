import React, { Component } from 'react';
import '../css/gameover.css'
import giphy from '../media/giphy.png';

export default class Gameover extends Component {
  // componentDidMount() {
  // }
  componentWillMount() {
    this.getGif(this.props.winner)
    .then((response => response.json()))
    .then((response) => {
      const r = Math.floor(Math.random() * 25);
      const gif = response.data[r].images.original;
      const url = gif.url;
      this.width = gif.width;
      this.height = gif.height;
      this.img.src = url;
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

  loadHandler(e) {
    this.img.style = 'position: static';
    this.img.classList -= 'loaded';
    this.loader.style = 'display: none'
  }

  render() {
    const line = {
        player: "Congratulations! You won!",
        ai: "C'mon really?? you lost!",
        draw: "Well. You didn't lose."
      }

    return (
      <div className='gameover-container'>
        <div className='gameover-content-container'>
          <section>
            <h1>{line[this.props.winner]}</h1>
            <div id='loader' ref={(div => this.loader = div)} >
              <span />
            </div>
            <img className='loading' ref={(img => this.img = img)} onLoad={this.loadHandler.bind(this)} style={{display: 'none', position: 'absolute', top: '0', left: '0'}} alt='celebratory gif!'/>
            <img src={giphy} alt='powered by Giphy'/>
            {this.props.children}
          </section>
        </div>
      </div>
    )
  }
}
