/**
 * @param {string} boardString 
 * @returns {string[][]}
 */
function stringToBoard(boardString) {
  let board = Array(15);
  for (let i = 0; i < 15; i++) {
    board[i] = [...boardString.substring(i * 15, (i + 1) * 15)];
  }
  return board;
} 

/**
 * @param {string} rack 
 * @param {Move[]} move 
 * @returns {boolean}
 */
function hasLettersOnRack(rack, move) {
  let counts = Array(24).fill(0);
  for (const l of rack) {
    const lNum = l.charCodeAt(0) - 'a'.charCodeAt(0);
    counts[lNum]++;
  }
  for (const { i, j, l } of move) {
    const lNum = l.charCodeAt(0) - 'a'.charCodeAt(0);
    if (counts[lNum] <= 0) {
      return false;
    }
    counts[lNum]--;
  }
  return true;
}

/**
 * @param {string[][]} board 
 * @param {Move[]} move 
 * @returns {boolean}
 */
function spacesAreOpen(board, move) {
  for (const { i, j, l } of move) {
    if (board[i][j] !== ' ') {
      return false;
    }
  }
  return true;
}

/**
 * @param {Move[]} move 
 * @returns {boolean}
 */
function lettersAreInALine(move) {
  let inRow = true, inCol = true;
  let row = move[0].i, col = move[0].j;
  for (const { i, j, l } of move) {
    if (i !== row) {
      inRow = false;
    }
    if (j !== col) {
      inCol = false;
    }
  }
  return inRow || inCol;
}

/**
 * @param {string} boardString 
 * @returns {boolean}
 */
function isFirstMove(boardString) {
  for (const l of boardString) {
    if (l !== ' ') {
      return false;
    }
  }
  return true;
}

/**
 * @param {string[][]} board 
 * @param {Move[]} move 
 * @returns {boolean}
 */
function isConnectedToOtherWord(board, move) {
  const dirs = [[-1, 0], [0, -1], [1, 0], [0, 1]];
  let isConnected = false;
  for (const { i, j, l } of move) {
    for (const [di, dj] of isConnected) {
      let ni = i + di, nj = j + dj;
      if (0 <= ni && ni < 15 && 0 <= nj && nj < 15 && board[ni][nj] !== ' ') {
        isConnected = true;
      }
    }
  }
  return isConnected;
}

/**
 * @param {string[][]} board 
 * @param {Move[]} move 
 * @returns {boolean}
 */
function isConnectedToSelf(board, move) {
  if (move.length === 1) {
    return true;
  }
  const moveSorted = move.toSorted((a, b) => (a.i + a.j) - (b.i + b.j));
  const startI = moveSorted[0].i, startJ = moveSorted[0].j;
  const endI = moveSorted[moveSorted.length - 1].i, endJ = moveSorted[moveSorted.length - 1].i;
  if (startI !== endI) {
    
  }
  // finish this
}

/**
 * @param {Game} game 
 * @param {Move[]} move 
 * @returns {boolean}
 */
function isValidMove(game, move) {
  if (move.length === 0) {
    return false;
  }
  const { email1, email2, rack1, rack2, score1, score2, boardString, bag, player1Turn } = game;
  const board = stringToBoard(boardString);
  const rack = player1Turn ? rack1 : rack2;
  if (!hasLettersOnRack(rack, move)) {
    return false;
  }
  if (!spacesAreOpen(board, move)) {
    return false;
  }
  if (!lettersAreInALine(move)) {
    return false;
  }
  if (!isFirstMove(boardString) && !isConnectedToOtherWord(board, move)) {
    return false;
  }




  return true;
}

async function playMove(gameId, move) {
  const updatedGame = await GameModel.findOneAndUpdate(
    { _id: gameId },
    { $set: { } },
    { new: true }
  );
  return updatedGame;
}

export {
  isValidMove,
  playMove,
};