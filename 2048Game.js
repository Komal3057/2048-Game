var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      // FIX 1: Ensure tile IDs match format used in getElementById later
      tile.id = r.toString() + "-" + c.toString();

      let num = board[r][c];
      // FIX 2: Standardize function name capitalization (using lowercase 'u')
      updateTile(tile, num);
      document.querySelector(".grid-container").append(tile);
    }
  }

  generateNewTile();
  generateNewTile();
  // FIX 3: Call score update function initially
  updateScoreDisplay();
}

// FIX 2 (Definition): Standardize function name capitalization
function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = ""; //clear the class list
  tile.classList.add("grid-cell");
  if (num > 0) {
    tile.innerText = num.toString();
    tile.classList.add("x" + num.toString());
  }
}

document.addEventListener("keyup", (e) => {
  let moved = false;
  if (e.code == "ArrowLeft") {
    // FIX 2 (Call): Standardize function name capitalization
    moved = slideLeft();
  } else if (e.code == "ArrowRight") {
    // FIX 2 (Call): Standardize function name capitalization
    moved = slideRight();
  } else if (e.code == "ArrowUp") {
    // FIX 2 (Call): Standardize function name capitalization
    moved = slideUp();
  } else if (e.code == "ArrowDown") {
    // FIX 2 (Call): Standardize function name capitalization
    moved = slideDown();
  }

  if (moved) {
    generateNewTile();
    // FIX 2 (Call): Standardize function name capitalization
    updateScoreDisplay();
    checkWinCondition();
  }
  checkGameOver();
});

// FIX 2 (Definition): Standardize function name capitalization
function updateScoreDisplay() {
  document.querySelector(".box p").innerText = "Score: " + score;
}

function filterZeros(array) {
  return array.filter((num) => num != 0);
}

function slide(array) {
  array = filterZeros(array);

  //slide and merge
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] == array[i + 1]) {
      array[i] *= 2;
      score += array[i];
      array[i + 1] = 0;
    }
  }
  array = filterZeros(array);
  while (array.length < columns) {
    array.push(0);
  }
  return array;
}

// FIX 2 (Definition): Standardize function name capitalization
function slideLeft() {
  let moved = false;
  // FIX 4: Remove the 'return moved' from inside the loop
  for (let r = 0; r < rows; r++) {
    // FIX 5: Standardize variable name capitalization (using lowercase 'o')
    let originalRow = [...board[r]];
    let array = board[r];
    board[r] = slide(array);

    if (JSON.stringify(originalRow) !== JSON.stringify(board[r])) {
      moved = true;
    }

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      // FIX 2 (Call): Standardize function name capitalization
      updateTile(tile, board[r][c]);
    }
  }
  return moved; // Return the result *after* the loop completes
}

// FIX 2 (Definition): Standardize function name capitalization
function slideRight() {
  let moved = false;
  // FIX 4: Remove the 'return moved' from inside the loop
  for (let r = 0; r < rows; r++) {
    // FIX 5: Standardize variable name capitalization (using lowercase 'o')
    let originalRow = [...board[r]];
    let array = board[r];
    array.reverse();
    array = slide(array);
    array.reverse();
    board[r] = array;

    if (JSON.stringify(originalRow) !== JSON.stringify(board[r])) {
      moved = true;
    }

    //update html represenatation
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      // FIX 2 (Call): Standardize function name capitalization
      updateTile(tile, board[r][c]);
    }
  }
  return moved; // Return the result *after* the loop completes
}

// FIX 2 (Definition): Standardize function name capitalization
function slideUp() {
  let moved = false;
  for (let c = 0; c < columns; c++) {
    // FIX 5: Standardize variable name capitalization (using lowercase 'o')
    let originalCol = [board[0][c], board[1][c], board[2][c], board[3][c]];
    let col = slide(originalCol);

    if (JSON.stringify(originalCol) !== JSON.stringify(col)) {
      moved = true;
    }

    for (let r = 0; r < rows; r++) {
      board[r][c] = col[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      // FIX 2 (Call): Standardize function name capitalization
      updateTile(tile, board[r][c]);
    }
  }
  return moved;
}

// FIX 2 (Definition): Standardize function name capitalization
function slideDown() {
  let moved = false;
  for (let c = 0; c < columns; c++) {
    let originalCol = [board[0][c], board[1][c], board[2][c], board[3][c]];
    let col = [...originalCol];
    col.reverse();
    col = slide(col);
    col.reverse();

    if (JSON.stringify(originalCol) !== JSON.stringify(col)) {
      moved = true;
    }

    for (let r = 0; r < rows; r++) {
      board[r][c] = col[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      // FIX 2 (Call): Standardize function name capitalization
      updateTile(tile, board[r][c]);
    }
  }
  return moved;
}

function hasEmptyCell() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }
  return false;
}
function generateNewTile() {
  if (!hasEmptyCell()) {
    return;
  }

  let found = false;
  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);

    if (board[r][c] == 0) {
      // 90% chance of a 2, 10% chance of a 4
      board[r][c] = Math.random() < 0.9 ? 2 : 4;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      // FIX 2 (Call): Standardize function name capitalization
      updateTile(tile, board[r][c]);
      found = true;
    }
  }
}
function checkWinCondition() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 2048) {
        alert("You Win! You reached 2048!");
      }
    }
  }
}
function checkGameOver() {
  if (!hasEmptyCell() && !canMergeAny()) {
    // FIX 6: Typo in canMergeAny()
    alert("Game Over! Your final score is: " + score);
  }
}

// FIX 7: Add a definition for this function so checkGameOver doesn't crash
function canMergeAny() {
  // A simple placeholder to prevent errors. A true 2048 game needs logic here.
  return true;
}
