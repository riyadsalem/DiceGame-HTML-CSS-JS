'use strict';

console.log('live server is working');

let cureentScore, activePlayer, scores, tag;

const data = {
  scoreOnePerson: document.getElementById('score0'),
  scoreTwoPerson: document.getElementById('score1'),
  diceOneTwo: document.querySelector('.goDice'),
  currentOnePerson: document.getElementById('current0'),
  currentTwoPerson: document.getElementById('current1'),
  inputTotalNumWin: document.querySelector('.Total_num_stopGame'),
  GobtnRoll: document.querySelector('.rollNow'),
  GobtnHold: document.querySelector('.goHold'),
  GobtnNew: document.querySelector('.newGame'),
  playerOne: document.querySelector('.player0'),
  playerTwo: document.querySelector('.player1'),
}; // End Obj data

const clearAll = () => {
  data['inputTotalNumWin'].value = '';
  data['diceOneTwo'].classList.add('hidden');
  data['playerOne'].classList.remove('WinnerNow');
  data['playerTwo'].classList.remove('WinnerNow');
  data['playerOne'].classList.add('ActivePersonNow');
  data['playerTwo'].classList.remove('ActivePersonNow');
  cureentScore = 0;
  activePlayer = 0;
  data['scoreOnePerson'].textContent = 0;
  data['scoreTwoPerson'].textContent = 0;
  data['currentOnePerson'].textContent = 0;
  data['currentTwoPerson'].textContent = 0;
  scores = [0, 0];
  tag = true;
}; // End Function: clearAll

clearAll(); // Call Function For Clear All Element

const __another__player = () => {
  document.getElementById(`current${activePlayer}`).textContent = 0;
  cureentScore = 0;
  activePlayer = activePlayer == 1 ? 0 : 1;
  data.playerOne.classList.toggle('ActivePersonNow');
  data.playerTwo.classList.toggle('ActivePersonNow');
}; // End Function: __another__player

const Roll = () => {
  if (tag) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    data.diceOneTwo.classList.remove('hidden');
    data.diceOneTwo.src = `Dice___Images/dice[${dice}].png`;

    if (dice !== 1) {
      cureentScore += dice;
      document.getElementById(
        `current${activePlayer}`
      ).textContent = `${cureentScore}`;
    } else {
      __another__player();
    } // End: If dice Condation === 1
  } // End: If tag
}; // End Function: Roll

const Hold = () => {
  if (tag) {
    scores[activePlayer] += cureentScore;
    document.getElementById(`score${activePlayer}`).textContent =
      scores[activePlayer];

    if (
      scores[activePlayer] >=
      (data.inputTotalNumWin.value === '' || data.inputTotalNumWin.value < 0
        ? 10
        : data.inputTotalNumWin.value)
    ) {
      tag = false;
      document
        .querySelector(`.player${activePlayer}`)
        .classList.remove('ActivePersonNow');
      document
        .querySelector(`.player${activePlayer}`)
        .classList.add('WinnerNow');
    } else {
      __another__player();
    }
  } // End: If tag
}; // End Function: Hold

// Use CallBack Function For Action Listener
data.GobtnRoll.addEventListener('click', Roll);

data.GobtnHold.addEventListener('click', Hold);

data.GobtnNew.addEventListener('click', clearAll);
