import React, { useState } from 'react';
import ChessBoard from './components/ChessBoard';
import GameInfo from './components/GameInfo';
import MoveConfirmation from './components/MoveConfirmation';
import { GameState } from './types';
import { getInitialGameState, isValidMove, movePiece, nextTurn } from './utils/gameLogic';

function App() {
  const [gameState, setGameState] = useState<GameState>(getInitialGameState());
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [moveConfirmation, setMoveConfirmation] = useState<{
    from: [number, number];
    to: [number, number];
  } | null>(null);

  const handleSquareClick = (row: number, col: number) => {
    if (selectedSquare) {
      const [fromRow, fromCol] = selectedSquare;
      if (isValidMove(gameState.board, fromRow, fromCol, row, col, gameState.currentPlayer)) {
        setMoveConfirmation({ from: [fromRow, fromCol], to: [row, col] });
      } else {
        setSelectedSquare(null);
      }
    } else {
      if (gameState.board[row][col]?.player === gameState.currentPlayer) {
        setSelectedSquare([row, col]);
      }
    }
  };

  const confirmMove = () => {
    if (moveConfirmation) {
      const { from, to } = moveConfirmation;
      const newBoard = movePiece(gameState.board, from[0], from[1], to[0], to[1]);
      setGameState(prevState => nextTurn({ ...prevState, board: newBoard }));
      setSelectedSquare(null);
      setMoveConfirmation(null);
    }
  };

  const cancelMove = () => {
    setSelectedSquare(null);
    setMoveConfirmation(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-2 text-gray-800">Scale Chess</h1>
      <p className="text-lg mb-6 text-gray-600">
        invented by Greg Egan in his book <a href="https://g.co/kgs/seHT9Bs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Scale</a>
      </p>
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
        <ChessBoard 
          board={gameState.board} 
          onSquareClick={handleSquareClick}
          selectedSquare={selectedSquare}
        />
        <GameInfo currentPlayer={gameState.currentPlayer} movesLeft={gameState.movesLeft} />
      </div>
      {moveConfirmation && (
        <MoveConfirmation
          from={moveConfirmation.from}
          to={moveConfirmation.to}
          onConfirm={confirmMove}
          onCancel={cancelMove}
        />
      )}
    </div>
  );
}

export default App;