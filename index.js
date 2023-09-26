const dictionary = ["earth", "plane", "crane", "audio", "house"];
const state = {
  secret: dictionary[Math.floor(Math.random() * dictionary.length)],
  grid: Array(6)
    .fill()
    .map(() => Array(5).fill(``)),
  currentRow: 0,
  currentCol: 0,
};
function updateGrid() {
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid[i].length; j++) {
      const box = document.getElementById(`box${i}${j}`);
      box.textContent = state.grid[i][j];
    }
  }
}

function drawbox(row, col, letter = "") {
  const box = document.createElement("div");
  box.className = "box";
  box.id = `box${row}${col}`;
  box.textContent = letter;

  // container[0].appendchild(box);
  return box;
}

function drawGrid() {
  const grid = document.createElement("div");
  grid.className = "grid";

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      const val = drawbox(i, j, "");
      grid.appendChild(val);
    }
  }

  return grid;
}

function drawButton() {
  const btn = document.createElement("button");
  btn.id = "btn";
  btn.textContent = " Restart Game";

  btn.onclick = () => {
    for (let i in state.grid) {
      for (let j in state.grid[i]) {
        state.grid[i][j] = "";
        const box = document.getElementById(`box${i}${j}`);
        const boxColer = box.classList[1];
        if (boxColer!=undefined) {
          box.classList.remove(boxColer);
        }
      }
    }
    state.currentCol = 0;
    state.currentRow = 0;

    updateGrid();
  };
  return btn;
}

function iswordvalid(word) {
  return dictionary.includes(word);
}

function registerkeyboardEvents() {
  document.body.onkeydown = (e) => {
    const key = e.key;
    if (key === "Enter") {
      if (state.currentCol === 5) {
        const word = getcurrentword();
        if (iswordvalid(word) || state.currentRow < 6) {
          revealword(word);
          state.currentRow++;
          state.currentCol = 0;
        } else {
          alert("Not a velid word");
        }
      }
    }
    if (key === "Backspace") {
      removeletter();
    }
    if (isletter(key)) {
      addletter(key);
    }
    updateGrid();
  };
}

function getcurrentword() {
  return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function revealword(guess) {
  const row = state.currentRow;

  for (let i = 0; i < 5; i++) {
    const box = document.getElementById(`box${row}${i}`);
    const letter = box.textContent;

    if (letter === state.secret[i]) {
      box.classList.add("right");
    } else if (state.secret.includes(letter)) {
      box.classList.add("wrong");
    } else {
      box.classList.add("empty");
    }
  }
  const isWinner = state.secret === guess;
  const isGameover = state.currentRow === 5;

  if (isWinner) {
    alert("congratulations");
  } else if (isGameover) {
    alert(`better luck next time! the word was ${state.secret}`);
  }
}

function isletter(key) {
  return key.length === 1 && key.match(/[a-z]/i);
}

function addletter(letter) {
  if (state.currentCol === 5) return;
  state.grid[state.currentRow][state.currentCol] = letter;
  state.currentCol++;
}

function removeletter() {
  if (state.currentCol === 0) return;
  state.grid[state.currentRow][state.currentCol - 1] = "";
  state.currentCol--;
}

function clearGame() {}

function startup() {
  const game = document.getElementById("game");
  const btnContainer = document.getElementById("btnContainer");
  const val = drawGrid();
  const btn = drawButton();
  game.appendChild(val);
  btnContainer.appendChild(btn);
  registerkeyboardEvents();
  updateGrid();
}

startup();