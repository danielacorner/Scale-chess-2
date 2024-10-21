import React from 'react';
import { Board, Piece } from '../types';

interface ChessBoardProps {
  board: Board;
  onSquareClick: (row: number, col: number) => void;
  selectedSquare: [number, number] | null;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ board, onSquareClick, selectedSquare }) => {
  const renderPiece = (piece: Piece | null) => {
    if (!piece) return null;
    const color = piece.player === 'double-pieces' ? 'text-blue-600' : 'text-red-600';
    const size = piece.player === 'double-pieces' ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl';
    return <span className={`${color} ${size}`}>{getPieceSymbol(piece)}</span>;
  };

  const getPieceSymbol = (piece: Piece): string => {
    const symbols: Record<string, string> = {
      pawn: '♟',
      rook: '♜',
      knight: '♞',
      bishop: '♝',
      queen: '♛',
      king: '♚',
    };
    return symbols[piece.type];
  };

  return (
    <div className="grid grid-cols-8 gap-0.5 bg-gray-300 p-1 sm:p-2 aspect-square">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`aspect-square flex items-center justify-center ${
              (rowIndex + colIndex) % 2 === 0 ? 'bg-white' : 'bg-gray-400'
            } cursor-pointer hover:bg-yellow-200 transition-colors duration-200 ${
              selectedSquare && selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex
                ? 'bg-yellow-300'
                : ''
            }`}
            onClick={() => onSquareClick(rowIndex, colIndex)}
          >
            {renderPiece(piece)}
          </div>
        ))
      )}
    </div>
  );
};

export default ChessBoard;