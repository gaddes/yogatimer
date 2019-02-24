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
  const countdownElement = document.querySelector('.countdown');

  // Start countdown and disable all buttons, regardless of which one is clicked
  timerButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      startCountdown(btn.innerHTML * 60, countdownElement);
      disableButtons(timerButtons);
      enableButtons([cancelButton]);
    });
  });

  // Reset countdown and enable all buttons
  cancelButton.addEventListener('click', function() {
    resetCountdown(intervalID, countdownElement);
    enableButtons(timerButtons);
    disableButtons([cancelButton]);
  });
};

/** 
 * Disable buttons
 * @param {array} btnArray - For each element in array, disable button by adding 'disabled = true' attribute
*/
const disableButtons = (btnArray) => {
  btnArray.forEach(function(btn) {
    btn.setAttribute('disabled', true);
  })
};

/** 
 * Enable buttons
 * @param {array} btnArray - For each element in array, enable button by removing 'disabled' attribute
*/
const enableButtons = (btnArray) => {
  btnArray.forEach(function(btn) {
    btn.removeAttribute('disabled');
  })
};

/**
 * Start the countdown timer
 * @param {number} timePerLoop 
 * @param {element} countdownElement 
 */
const startCountdown = (timePerLoop, countdownElement) => {
  // TODO: replace this with user-selected number of loops
  let numberOfLoops = 1;
  let totalTime = timePerLoop * numberOfLoops;

  // Keep track of initial time
  const initialTime = timePerLoop;

  // For dev only
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
        countdownElement.innerHTML = `${minutes}:${seconds}`;

        timePerLoop = initialTime - 1;
        break;

      case 1:
        // Reset timePerLoop to the length of time selected by the user
        timePerLoop = timePerLoop - 1;
        // Calculate mins/secs
        minutes = Math.floor(initialTime / 60);
        seconds = initialTime % 60;
        // Display time
        countdownElement.innerHTML = `0:1`;
        break;

      default:
        // Calculate mins/secs
        minutes = Math.floor(timePerLoop / 60);
        seconds = timePerLoop % 60;

        // Display time
        countdownElement.innerHTML = `${minutes}:${seconds}`;

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
      resetCountdown(intervalID, countdownElement);
    } else {
      totalTime -= 1;
      updateCountdown();
    }
  }, 1000);
}

/**
 * @param {ID} intervalID - tempName = param1
 * @param {element} countdownElement - tempName = param2
 */
const resetCountdown = (intervalID, countdownElement) => {
  // Stop countdown
  clearInterval(intervalID);
  // Reset visual timer to zero
  countdownElement.innerHTML = `0:00`;
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
