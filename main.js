const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winningMessageText = document.querySelector('[data-winning-message-text]');
const winningMessage = document.querySelector('[data-winning-message]');
const restartButton = document.querySelector('[data-restart-button]');

const classX = 'x';
const classCircle = 'circle';
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let circleTurn;

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(classX);
  board.classList.remove(classCircle);
  if(circleTurn) {
    board.classList.add(classCircle);
  } else {
    board.classList.add(classX);
  }
}

function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    })
  })
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(classX) || 
    cell.classList.contains(classCircle);
  })
}

function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = 'Draw!';
  } else {
    winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }

  winningMessage.classList.add('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? classCircle : classX;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass(); 
  }
}

function actionGame() {
  circleTurn = false;
  cells.forEach(cell => {
    cell.classList.remove(classX);
    cell.classList.remove(classCircle);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  })
  setBoardHoverClass();
  winningMessage.classList.remove('show');
}

actionGame();
restartButton.addEventListener('click', actionGame);
