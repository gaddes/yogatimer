import React, { Component } from 'react'
import '../css/home.scss'
import chime from '../audio/chime.mp3';
// import helpers from '../helpers';
// import { Link } from 'react-router-dom';

// Variable used to start and stop the countdown timer
let intervalID;

// FIXME:
let timePerLoop;
let numberOfLoops;

// Add event listeners on window load
window.onload = function() {
  // Select elements
  const timerButtons = document.querySelectorAll('.timerbutton');
  const loopButtons = document.querySelectorAll('.loopbutton');
  const startButton = document.querySelector('.startbutton');
  const resetButton = document.querySelector('.resetbutton');
  const countdownElement = document.querySelector('.countdown-text');
  const loopText = document.querySelector('.loop-text');

  // Set time per loop and disable buttons
  timerButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      timePerLoop = btn.innerHTML * 60;
      disableButtons(timerButtons);
      enableButtons([resetButton]);
      console.log(`time per loop = ${timePerLoop}`);
    });
  });

  // Set number of loops and disable buttons
  loopButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      numberOfLoops = btn.innerHTML;
      disableButtons(loopButtons);
      enableButtons([resetButton]);
      console.log(`number of loops = ${numberOfLoops}`);
    });
  });

  // Start timer
  startButton.addEventListener('click', function() {
    // Check that time and number of loops have been specified, otherwise do nothing
    if (timePerLoop !== undefined && numberOfLoops !== undefined) {      
      disableButtons([startButton]);
      enableButtons([resetButton]);
      startCountdown(timePerLoop, numberOfLoops, countdownElement, loopText, timerButtons, loopButtons, startButton, resetButton);
    } else {
      console.log('please set timer and loops!');
    }
  });

  // Reset timer and enable all buttons
  resetButton.addEventListener('click', function() {
    resetCountdown(intervalID, countdownElement, loopText, timerButtons, loopButtons, startButton, resetButton);
  });
};

/** 
 * Disable buttons
 * @param {array} btnArray
*/
const disableButtons = (btnArray) => {
  btnArray.forEach(function(btn) {
    btn.setAttribute('disabled', true);
  })
};

/** 
 * Enable buttons
 * @param {array} btnArray
*/
const enableButtons = (btnArray) => {
  btnArray.forEach(function(btn) {
    btn.removeAttribute('disabled');
  })
};

/**
 * Start the countdown timer
 * @param {number} timePerLoop
 * @param {number} numberOfLoops
 * @param {element} countdownElement
 * @param {element} loopText
 * @param {element} timerButtons
 * @param {element} loopButtons
 * @param {element} startButton
 * @param {element} resetButton
 */
const startCountdown = (timePerLoop, numberOfLoops, countdownElement, loopText, timerButtons, loopButtons, startButton, resetButton) => {
  // For dev only
  // numberOfLoops = 1;

  let totalTime = timePerLoop * numberOfLoops;

  // Keep track of initial values
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
        numberOfLoops -= 1;

        loopText.innerHTML = `${numberOfLoops} loops remaining`
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
  // Update loop text
  loopText.innerHTML = `${numberOfLoops} loops remaining`

  // Decrease time remaining every second
  intervalID = setInterval(function() {
    if (totalTime === 0) {
      resetCountdown(intervalID, countdownElement, loopText, timerButtons, loopButtons, startButton, resetButton);
    } else {
      totalTime -= 1;
      updateCountdown();
    }
  }, 1000);
}

/**
 * Stop timer and reset variables
 * @param {ID} intervalID
 * @param {element} countdownElement
 * @param {element} loopText
 * @param {element} timerButtons
 * @param {element} loopButtons
 * @param {element} startButton
 * @param {element} resetButton
 */
const resetCountdown = (intervalID, countdownElement, loopText, timerButtons, loopButtons, startButton, resetButton) => {
  clearInterval(intervalID);
  resetVariables();
  enableButtons(timerButtons);
  enableButtons(loopButtons);
  enableButtons([startButton]);
  disableButtons([resetButton]);
  countdownElement.innerHTML = `0:00`;
  loopText.innerHTML = `0 loops remaining`
}

/**
 * Reset time per loop and number of loops
 */
const resetVariables = () => {
  timePerLoop = undefined;
  numberOfLoops = undefined;
}

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="home-container">
          <audio ref={ref => this.player = ref} />
          <h1 className='title'>YogaTimer<sup> (TM)</sup></h1>
          <p className='countdown-text'>0:00</p>
          <p className='loop-text'>0 loops remaining</p>
          <div className="btn-container">
            <p>Choose <b>minutes</b> per loop:</p>
            <div className="timer-buttons">
              <button className='btn btn-standard timerbutton'>1</button>
              <button className='btn btn-standard timerbutton'>2</button>
              <button className='btn btn-standard timerbutton'>3</button>
              <button className='btn btn-standard timerbutton'>4</button>
              <button className='btn btn-standard timerbutton'>5</button>
            </div>
            <p>Choose <b>number</b> of loops:</p>
            <div className="loop-buttons">
              <button className='btn btn-standard loopbutton'>1</button>
              <button className='btn btn-standard loopbutton'>2</button>
              <button className='btn btn-standard loopbutton'>3</button>
              <button className='btn btn-standard loopbutton'>4</button>
              <button className='btn btn-standard loopbutton'>5</button>
            </div>
          </div>
          <div className="action-buttons">
            <button className='btn btn-success startbutton'>Start</button>
            <button className='btn btn-warning resetbutton' disabled>Reset</button>
          </div>
        </div>
      </div>
    )
  }
}
