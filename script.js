const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // Human
let gameActive = true;

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// --- GAME LOGIC ---

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive || currentPlayer !== "X") return;

  makeMove(index, "X");
  if (!checkEndGame("X")) {
    setTimeout(aiMove, 500); // Delay for realism
  }
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
}

function aiMove() {
  if (!gameActive) return;

  let available = board.map((val, i) => (val === "" ? i : null)).filter(i => i !== null);
  if (available.length === 0) return;

  let move = available[0]; // Simple AI: First empty
  makeMove(move, "O");

  checkEndGame("O");
}

function checkEndGame(player) {
  if (checkWinner(player)) {
    statusText.textContent = `Player ${player} wins!`;
    gameActive = false;
    return true;
  } else if (!board.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    return false;
  }
}

function checkWinner(player) {
  return winCombos.some(combo => combo.every(i => board[i] === player));
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => (cell.textContent = ""));
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player X's turn`;
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);
