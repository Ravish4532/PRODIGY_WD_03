// Initialize game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');

// Add event listeners to cells
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Handle cell click
function handleCellClick(index) {
  // If cell is already occupied or game is over, do nothing
  if (board[index] !== '' || !gameActive) {
    return;
  }

  // Update game state
  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  // Check for win or draw
  if (checkWin()) {
    statusDisplay.textContent =  `${currentPlayer} win!`;
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    statusDisplay.textContent = 'It\'s a draw!';
    gameActive = false;
    return;
  }

  // Switch to the next player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `Turn for: ${currentPlayer}`;
                          
}

// Check for a win
function checkWin() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      cells[a].style.backgroundColor = 'red';
      cells[b].style.backgroundColor = 'red';
      cells[c].style.backgroundColor = 'red';
      return true;
    }
  }
  return false;
}

// Check for a draw
function checkDraw() {
  return board.every(cell => cell !== '');
}
// Reset the game
function resetGame() {
// Clear the board
board = ['', '', '', '', '', '', '', '', ''];
cells.forEach(cell =>{
  cell.textContent = '';
  cell.style.backgroundColor = '';
});

// Reset game state
currentPlayer = 'X';
gameActive = true;
statusDisplay.textContent = `Turn for: ${currentPlayer}`;
}