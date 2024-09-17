import React, { useState, useEffect } from 'react';
import './App.css';
import { calculateWinner, findBestMove } from './utils';
import { triggerConfetti } from './confetti';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState(null);

  useEffect(() => {
    if (gameMode === 'AI' && !isXNext && !winner) {
      handleAIMove(board);
    }
  }, [isXNext, gameMode, winner, board]);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      triggerConfetti();
    }

    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const handleAIMove = (currentBoard) => {
    const bestMove = findBestMove(currentBoard);
    if (bestMove !== -1) {
      setTimeout(() => {
        const newBoard = [...currentBoard];
        newBoard[bestMove] = 'O';
        setBoard(newBoard);

        const newWinner = calculateWinner(newBoard);
        if (newWinner) {
          setWinner(newWinner);
          triggerConfetti();
        }
        setIsXNext(true);
      }, 500);
    }
  };

  const selectGameMode = (mode) => {
    setGameMode(mode);
    resetGame();
  };

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>

      {gameMode === null ? (
        <div className="game-mode">
          <button onClick={() => selectGameMode('PvP')}>Player vs Player</button>
          <button onClick={() => selectGameMode('AI')}>Player vs AI</button>
        </div>
      ) : (
        <>
          <div className="board">
            {board.map((value, index) => (
              <button key={index} className="square" onClick={() => handleClick(index)}>
                {value}
              </button>
            ))}
          </div>
          <div className="info">
            {winner ? <p>Winner: {winner}</p> : <p>Next Player: {isXNext ? 'X' : 'O'}</p>}
          </div>
          <button className="reset-btn" onClick={resetGame}>Reset Game</button>
        </>
      )}
    </div>
  );
}

export default App;
