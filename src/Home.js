import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import './home.scss'
import chime from './audio/chime.mp3';

// Variable used to start and stop the countdown timer
let intervalID;

const startCountdown = (timePerLoop) => {
  // TODO: replace this with user-selected number of loops
  let numberOfLoops = 1;
  let totalTime = timePerLoop * numberOfLoops;

  // Keep track of initial time
  const initialTime = timePerLoop;

  // TODO: extract into separate function
  // Make timer buttons inactive
  const buttons = document.querySelectorAll('.timerbutton');
  buttons.forEach(function(btn) {
    btn.setAttribute('disabled', true);
  });

  // TODO: make all querySelector elements global
  // Grab countdown element
  let currentTime = document.querySelector('.countdown');

  // FIXME: for dev only
  // timePerLoop = 3;

  const updateCountdown = () => {
    console.log(`time left in this loop = ${timePerLoop}`);
    console.log(`totalTime remaining = ${totalTime}`);

    let minutes;
    let seconds;

    switch(timePerLoop) {
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

        timePerLoop = initialTime - 1;
        break;

      case 1:
        // Reset timePerLoop to the length of time selected by the user
        timePerLoop = timePerLoop - 1;
        // Calculate mins/secs
        minutes = Math.floor(initialTime / 60);
        seconds = initialTime % 60;
        // Display time
        currentTime.innerHTML = `0:1`;
        break;

      default:
        // Calculate mins/secs
        minutes = Math.floor(timePerLoop / 60);
        seconds = timePerLoop % 60;

        // Display time
        currentTime.innerHTML = `${minutes}:${seconds}`;

        // Decrease seconds by one
        timePerLoop = timePerLoop - 1;
        break;
    }
  }

  // Call countdown function immediately on button click
  updateCountdown();

  // Decrease time remaining every second
  intervalID = setInterval(function() {
    if (totalTime === 0) {
      resetCountdown();
    } else {
      totalTime -= 1;
      updateCountdown();
    }
  }, 1000);
}

const resetCountdown = () => {
  console.log('it works!');

  // Stop countdown
  clearInterval(intervalID);

  // TODO: make all querySelector elements global
  // Reset visual timer to zero
  let currentTime = document.querySelector('.countdown');
  currentTime.innerHTML = `0:00`;

  // TODO: extract into separate function
  // Activate timer buttons
  const buttons = document.querySelectorAll('.timerbutton');
  buttons.forEach(function(btn) {
    btn.removeAttribute('disabled');
  });
}

export default class Home extends Component {
  render() {
    return (
      <div>
        <audio ref={ref => this.player = ref} />
        <h1 className='countdown'>0:00</h1>
        <p>5 loops remaining</p>
        <p>Choose number of minutes</p>
        <div className="minute-buttons">
          <button className='timerbutton' onClick={() => startCountdown(60)}>1</button>
          <button className='timerbutton' onClick={() => startCountdown(120)}>2</button>
          <button className='timerbutton' onClick={() => startCountdown(180)}>3</button>
          <button className='timerbutton' onClick={() => startCountdown(240)}>4</button>
          <button className='timerbutton' onClick={() => startCountdown(300)}>5</button>
        </div>
        <div className="cancel-button">
          <button className='cancelbutton' onClick={() => resetCountdown()}>Cancel</button>
        </div>
      </div>
    )
  }
}
