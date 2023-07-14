'use strict';

//---------------------------------Selecting elements-------------

//  Players

const p0El = document.querySelector(`.player--0`);
const p1El = document.querySelector(`.player--1`);
//  Scores
const score0El = document.querySelector(`#score--0`);
const score1El = document.querySelector(`#score--1`);

const current0El = document.querySelector(`#current--0`);
const current1El = document.querySelector(`#current--1`);
//Roll
const diceEl = document.querySelector(`.dice`);
//Btns
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// ---------------------------------Functions---------------------

let activePlayer, scores, currentScore, playing;

const init = function () {
  activePlayer = 0;
  scores = [0, 0];
  currentScore = 0;
  playing = true;

  score0El.textContent = 0; //
  score1El.textContent = 0; //
  current0El.textContent = 0; //
  current1El.textContent = 0; //

  diceEl.classList.add(`hidden`);
  p0El.classList.remove(`player--winner`); //
  p1El.classList.remove(`player--winner`); //
  p1El.classList.remove(`player--active`); //
  p0El.classList.add(`player--active`);
  btnNew.classList.add(`hidden`); //££hiding newGame button
  btnHold.classList.remove(`hidden`);
  btnRoll.classList.remove(`hidden`);
};

// Switch to next player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // * updating the total score of the current player in case he rolled a 1/2
  // document.getElementById(`score--${activePlayer}`).textContent =
  // scores[activePlayer];

  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  p0El.classList.toggle(`player--active`);
  p1El.classList.toggle(`player--active`);
};
// Rolling dice

btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // Generating a random diceroll
    const dice = Math.trunc(Math.random() * 6 + 1);

    // display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // * updating the total score of the current player in case he rolled a 2/2
      // scores[activePlayer] = 0;
      switchPlayer();
    }
    // check for a rolled 1 => if true switch to next player
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    // Add current score to active player score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if the current score is >= 100;
    if (scores[activePlayer] >= 100) {
      // Finish the game
      diceEl.classList.add(`hidden`);
      btnHold.classList.add(`hidden`);
      btnRoll.classList.add(`hidden`);
      btnNew.classList.remove(`hidden`);
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle(`player--active`);
    }
    switchPlayer();
  }
});

init();

btnNew.addEventListener(`click`, init);
