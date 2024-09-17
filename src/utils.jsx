
export function calculateWinner(board) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
  
    return null;
  }
  
  export function evaluate(board) {
    const winner = calculateWinner(board);
    if (winner === 'O') return 10;
    if (winner === 'X') return -10;
    return 0;
  }
  
  export function minimax(board, depth, isMaximizing) {
    const score = evaluate(board);
  
    if (score === 10 || score === -10) return score;
    if (board.every((square) => square !== null)) return 0;
  
    if (isMaximizing) {
      let best = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          best = Math.max(best, minimax(board, depth + 1, false));
          board[i] = null;
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          best = Math.min(best, minimax(board, depth + 1, true));
          board[i] = null;
        }
      }
      return best;
    }
  }
  
  export function findBestMove(board) {
    let bestVal = -Infinity;
    let bestMove = -1;
  
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        let moveVal = minimax(board, 0, false);
        board[i] = null;
  
        if (moveVal > bestVal) {
          bestMove = i;
          bestVal = moveVal;
        }
      }
    }
  
    return bestMove;
  }
  