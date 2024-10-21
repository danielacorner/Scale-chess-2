import { Board, Piece, Player, GameState } from '../types';

export const initializeBoard = (): Board => {
  const emptyBoard: Board = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Set up double-pieces player (bottom)
  for (let i = 0; i < 8; i++) {
    emptyBoard[6][i] = { type: 'pawn', player: 'double-pieces' };
    emptyBoard[7][i] = { type: 'pawn', player: 'double-pieces' };
  }
  
  const backRowPieces: Piece['type'][] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  backRowPieces.forEach((type, i) => {
    emptyBoard[7][i] = { type, player: 'double-pieces' };
    emptyBoard[6][i] = { type, player: 'double-pieces' };
  });

  // Set up double-moves player (top)
  for (let i = 0; i < 8; i++) {
    emptyBoard[1][i] = { type: 'pawn', player: 'double-moves' };
  }
  backRowPieces.forEach((type, i) => {
    emptyBoard[0][i] = { type, player: 'double-moves' };
  });

  return emptyBoard;
};

export const isValidMove = (
  board: Board,
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number,
  currentPlayer: Player
): boolean => {
  const piece = board[fromRow][fromCol];
  if (!piece || piece.player !== currentPlayer) return false;

  // Implement chess move validation logic here
  // This is a simplified version and doesn't include all chess rules
  switch (piece.type) {
    case 'pawn':
      // Simplified pawn movement
      const direction = piece.player === 'double-pieces' ? -1 : 1;
      return toCol === fromCol && (toRow === fromRow + direction || (piece.player === 'double-moves' && toRow === fromRow + 2 * direction));
    case 'rook':
      return fromRow === toRow || fromCol === toCol;
    case 'knight':
      const rowDiff = Math.abs(toRow - fromRow);
      const colDiff = Math.abs(toCol - fromCol);
      return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
    case 'bishop':
      return Math.abs(toRow - fromRow) === Math.abs(toCol - fromCol);
    case 'queen':
      return (
        fromRow === toRow ||
        fromCol === toCol ||
        Math.abs(toRow - fromRow) === Math.abs(toCol - fromCol)
      );
    case 'king':
      return Math.abs(toRow - fromRow) <= 1 && Math.abs(toCol - fromCol) <= 1;
    default:
      return false;
  }
};

export const movePiece = (
  board: Board,
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number
): Board => {
  const newBoard = board.map(row => [...row]);
  newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
  newBoard[fromRow][fromCol] = null;
  return newBoard;
};

export const getInitialGameState = (): GameState => ({
  board: initializeBoard(),
  currentPlayer: 'double-pieces',
  movesLeft: 1,
});

export const nextTurn = (gameState: GameState): GameState => {
  if (gameState.currentPlayer === 'double-pieces' || gameState.movesLeft === 0) {
    return {
      ...gameState,
      currentPlayer: gameState.currentPlayer === 'double-pieces' ? 'double-moves' : 'double-pieces',
      movesLeft: gameState.currentPlayer === 'double-pieces' ? 2 : 1,
    };
  }
  return {
    ...gameState,
    movesLeft: gameState.movesLeft - 1,
  };
};