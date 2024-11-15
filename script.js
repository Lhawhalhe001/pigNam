"use strict";
const score0El = document.querySelector("#score--0");
const score1el = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let score, currentScore, currentPlayer, playing;

// Starting conditions
const init = function () {
  score = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1el.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice);
    console.log(dice);
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      //current0.textContent = currentScore;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    score[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      score[currentPlayer];

    if (score[currentPlayer] >= 20) {
      //console.log("finally");
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
      //console.log("yoo!");
    }
  }
});
btnNew.addEventListener("click", init);
