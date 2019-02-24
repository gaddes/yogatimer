import React, { Component } from 'react'
import '../css/home.scss'
import chime from '../audio/chime.mp3';
// import helpers from '../helpers';
// import { Link } from 'react-router-dom';

// Variable used to start and stop the countdown timer
let intervalID;

// Add event listeners on window load
window.onload = function() {
  // Select elements
  const timerButtons = document.querySelectorAll('.timerbutton');
  const cancelButton = document.querySelector('.cancelbutton');

  // Start countdown and disable all buttons, regardless of which one is clicked
  timerButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      startCountdown(btn.innerHTML * 60);
      disableButtons(timerButtons);
      enableButtons([cancelButton]);
    });
  });

  // Reset countdown and enable all buttons
  cancelButton.addEventListener('click', function() {
    resetCountdown();
    enableButtons(timerButtons);
    disableButtons([cancelButton]);
  });
};

/** 
 * @param {array} btnArray - For each element in array, disable button by adding 'disabled = true' attribute
*/
const disableButtons = (btnArray) => {
  btnArray.forEach(function(btn) {
    btn.setAttribute('disabled', true);
  })
};

/** 
 * @param {array} btnArray - For each element in array, enable button by removing 'disabled' attribute
*/
const enableButtons = (btnArray) => {
  btnArray.forEach(function(btn) {
    btn.removeAttribute('disabled');
  })
};

const startCountdown = (timePerLoop) => {
  // TODO: replace this with user-selected number of loops
  let numberOfLoops = 1;
  let totalTime = timePerLoop * numberOfLoops;

  // Keep track of initial time
  const initialTime = timePerLoop;

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
  // Stop countdown
  clearInterval(intervalID);

  // TODO: make all querySelector elements global
  // Reset visual timer to zero
  let currentTime = document.querySelector('.countdown');
  currentTime.innerHTML = `0:00`;
}

export default class Home extends Component {
  render() {
    return (
      <div>
        <audio ref={ref => this.player = ref} />
        <h1 className='countdown'>0:00</h1>
        <p>5 loops remaining</p>
        <p>Choose number of minutes</p>
        <div className="timer-buttons">
          <button className='timerbutton'>1</button>
          <button className='timerbutton'>2</button>
          <button className='timerbutton'>3</button>
          <button className='timerbutton'>4</button>
          <button className='timerbutton'>5</button>
        </div>
        <div className="cancel-button">
          <button className='cancelbutton' disabled>Cancel</button>
        </div>
      </div>
    )
  }
}
