import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
// TODO: get chime sound working!
import chime from '../src/audio/chime.mp3';
import './home.scss'

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

    console.log(this.player);
    

    console.log(`seconds = ${seconds}`);
    

    if (seconds === 0) {
      // play chime and reset timer
      // TODO: get chime sound working!
      // chime.play();

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
      </div>
    )
  }
}
