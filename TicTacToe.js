const turnElement = document.getElementById("turn");
const boxes = Array.from(document.querySelectorAll(".box"));
const resetButton = document.getElementById("reset");
const bodyElement = document.body;
let gameOver = false;
let confettiCleanupTimeout = null;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getCurrentTurn() {
  if (!turnElement) return "X";
  const text = turnElement.textContent.replace(/^Turn:\s*/i, "").trim();
  if (text === "X" || text === "O") return text;
  return "X";
}

function setNextTurn(nextTurn) {
  if (!turnElement) return;
  turnElement.textContent = `Turn: ${nextTurn}`;
}

function toggleTurn(turn) {
  return turn === "X" ? "O" : "X";
}

function getBoardState() {
  return boxes.map((box) => box.textContent.trim());
}

function checkWin(board) {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function checkTie(board) {
  return board.every((value) => value === "X" || value === "O");
}

function clearConfetti() {
  const confettiContainer = document.querySelector(".confetti-container");
  if (confettiContainer) {
    confettiContainer.remove();
  }
  if (confettiCleanupTimeout) {
    clearTimeout(confettiCleanupTimeout);
  }
}

function createConfetti() {
  clearConfetti();

  const container = document.createElement("div");
  container.className = "confetti-container";
  const colors = ["#ff4757", "#1e90ff", "#ffe56b", "#2ed573", "#ffa502"];

  const pieces = 90;
  for (let i = 0; i < pieces; i += 1) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    const size = Math.floor(Math.random() * 10) + 8;
    const left = Math.random() * 100;
    const delay = Math.random() * 0.8;
    const duration = 1.5 + Math.random() * 1.2;
    const color = colors[Math.floor(Math.random() * colors.length)];

    piece.style.width = `${size}px`;
    piece.style.height = `${size * 0.4}px`;
    piece.style.backgroundColor = color;
    piece.style.left = `${left}%`;
    piece.style.top = `${Math.random() * -40}px`;
    piece.style.animationDelay = `${delay}s`;
    piece.style.animationDuration = `${duration}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;

    container.appendChild(piece);
  }

  bodyElement.appendChild(container);
  confettiCleanupTimeout = setTimeout(clearConfetti, 2500);
}

function finishGame(message) {
  if (!turnElement) return;
  turnElement.textContent = message;
  gameOver = true;

  bodyElement.classList.add("celebration-active");
  turnElement.classList.add("celebration-text");

  if (message.includes("wins")) {
    createConfetti();
  }
}

function ClickBox(event) {
  if (gameOver) return;

  const box = event.currentTarget;
  if (!box || box.textContent.trim() !== "") return;

  const currentTurn = getCurrentTurn();
  box.textContent = currentTurn;

  const board = getBoardState();
  const winner = checkWin(board);
  if (winner) {
    finishGame(`${winner} wins!`);
    return;
  }

  if (checkTie(board)) {
    finishGame("Tie!");
    return;
  }

  const nextTurn = toggleTurn(currentTurn);
  setNextTurn(nextTurn);
}

function resetBoard() {
  boxes.forEach((box) => {
    box.textContent = "";
  });
  gameOver = false;
  setNextTurn("X");
  bodyElement.classList.remove("celebration-active");
  turnElement.classList.remove("celebration-text");
  clearConfetti();
}

boxes.forEach((box) => {
  box.addEventListener("click", ClickBox);
});

if (resetButton) {
  resetButton.addEventListener("click", resetBoard);
}
console.log(boxes);
