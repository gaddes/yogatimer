import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import './home.scss'
import chime from './audio/chime.mp3';

const setCountdown = (minutes) => {
  // Make buttons inactive
  let buttons = document.querySelectorAll('.timerbutton');
  buttons.forEach(function(btn) {
    btn.setAttribute('disabled', true);
  });

  // Grab countdown element
  let currentTime = document.querySelector('.countdown');
  // Convert mins to seconds
  let seconds = minutes * 60;
  // Show initial time
  currentTime.innerHTML = `${minutes}:00`;

  // FIXME: for dev only
  seconds = 3;

  const countdown = () => {
    // let remainder = seconds / 60;

    // if (seconds === 0) {
    //   // activate buttons
    //   buttons.forEach(function(btn) {
    //     btn.setAttribute('disabled', false);
    //   });
    // }

    console.log(`seconds = ${seconds}`);

    if (seconds === 0) {
      // play chime and reset timer

      // stop timer
      clearInterval(timer);
    } else {
      console.log(seconds);
      
      // Decrease seconds by one
      seconds = seconds - 1;
      // Update element on page
      currentTime.innerHTML = `${minutes}:${seconds}`;
    }
  }

  // Call countdown function immediately on button click
  countdown(seconds);
  // Decrease time remaining every second
  const timer = setInterval(countdown, 1000);
}

export default class Home extends Component {

  constructor(props) {
    super(props);

    // this.url = "http://streaming.tdiradio.com:8000/house.mp3";
    // this.audio = new Audio(this.url);
    this.audio = new Audio(chime);

    // Bind methods so 'this' refers to instance of component
    this.play = this.play.bind(this);
  }

  play() {
    console.log(this.audio);
    this.audio.play();
  }

  render() {
    return (
      <div>
        <audio ref={ref => this.player = ref} />
        <h1 className='countdown'>02:47</h1>
        <p>5 loops remaining</p>
        <p>Choose number of minutes</p>
        <button className='timerbutton' onClick={() => setCountdown(1)}>1</button>
        <button className='timerbutton' onClick={() => setCountdown(2)}>2</button>
        <button className='timerbutton' onClick={() => setCountdown(3)}>3</button>
        <button className='timerbutton' onClick={() => setCountdown(4)}>4</button>
        <button className='timerbutton' onClick={() => setCountdown(5)}>5</button>
        <button className='timerbutton' onClick={this.play}>BUTTON</button>
      </div>
    )
  }
}
