import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import './home.scss'
import chime from './audio/chime.mp3';

const setCountdown = (totalTime) => {
  // Keep track of initial time
  const initialTime = totalTime;

  // Make buttons inactive
  let buttons = document.querySelectorAll('.timerbutton');
  buttons.forEach(function(btn) {
    btn.setAttribute('disabled', true);
  });

  // Grab countdown element
  let currentTime = document.querySelector('.countdown');

  // FIXME: for dev only
  // totalTime = 3;

  const countdown = () => {
    console.log(totalTime);

    let minutes;
    let seconds;

    switch(totalTime) {
      case 0:
        // TODO: Activate buttons  
        // Play sound and reset timer
        const sound = new Audio(chime);
        sound.play();

        // TODO: abstract this block into a separate function
        // Calculate mins/secs
        minutes = Math.floor(initialTime / 60);
        seconds = initialTime % 60;
        // Display time
        currentTime.innerHTML = `${minutes}:${seconds}`;

        totalTime = initialTime - 1;

        // TODO: Stop timer
        // clearInterval(timer);
        break;

      case 1:
        // Reset totalTime to the length of time selected by the user
        totalTime = totalTime - 1;
        // Calculate mins/secs
        minutes = Math.floor(initialTime / 60);
        seconds = initialTime % 60;
        // Display time
        currentTime.innerHTML = `0:1`;
        break;

      default:
        // Calculate mins/secs
        minutes = Math.floor(totalTime / 60);
        seconds = totalTime % 60;

        // Display time
        currentTime.innerHTML = `${minutes}:${seconds}`;

        // Decrease seconds by one
        totalTime = totalTime - 1;
        break;
    }
  }

  // Call countdown function immediately on button click
  countdown();
  // Decrease time remaining every second
  const timer = setInterval(countdown, 1000);
}

export default class Home extends Component {
  render() {
    return (
      <div>
        <audio ref={ref => this.player = ref} />
        <h1 className='countdown'>00:00</h1>
        <p>5 loops remaining</p>
        <p>Choose number of minutes</p>
        <button className='timerbutton' onClick={() => setCountdown(60)}>1</button>
        <button className='timerbutton' onClick={() => setCountdown(120)}>2</button>
        <button className='timerbutton' onClick={() => setCountdown(180)}>3</button>
        <button className='timerbutton' onClick={() => setCountdown(240)}>4</button>
        <button className='timerbutton' onClick={() => setCountdown(300)}>5</button>
      </div>
    )
  }
}
