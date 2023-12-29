let score = JSON.parse(localStorage.getItem('score'));
if (!score) {
  score = {
    losses: 0,
    wins: 0,
    ties: 0,
  };
}
updateScoreElet();
function updateScoreElet() {
  localStorage.setItem('score', JSON.stringify(score));
  document.querySelector(
    '.game-score'
  ).innerHTML = `wins: ${score.wins} , losses: ${score.losses} , ties: ${score.ties}`;
}
function pickCoputerMove() {
  const randomNum = Math.random();
  let computerMove = '';
  if (randomNum >= 0 && randomNum < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }
  return computerMove;
}
let autoPlaying = false;
let intervalId;

function autoplay() {
  if (!autoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickCoputerMove();
      playGame(playerMove);
    }, 1000);
    autoPlaying = true;
  } else {
    clearInterval(intervalId);
    autoPlaying = false;
  }
}
document.querySelector('js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickCoputerMove();
  let result = '';
  if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else {
      result = 'You lose.';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else {
      result = 'You win.';
    }
  } else if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else {
      result = 'Tie.';
    }
  }
  if (result === 'You win.') {
    score.wins = score.wins + 1;
  } else if (result === 'You lose.') {
    score.losses = score.losses + 1;
  } else if (result === 'Tie.') {
    score.ties = score.ties + 1;
  }
  updateScoreElet();
  document.querySelector('.game-result').innerHTML = result;
  document.querySelector(
    '.game-move'
  ).innerHTML = `you <img class="game-option-icon" src="icons/${playerMove}.png" alt=""> <img class="game-option-icon" src="icons/${computerMove}.png" alt=""> computer`;
  /*alert(
          `You picked ${playerMove}. Computer picked ${computerMove}. ${result}.\nwins: ${score.wins} , losses: ${score.losses} , ties: ${score.ties}`
        ); */
}
