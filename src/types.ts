export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type Player = 'double-pieces' | 'double-moves';

export interface Piece {
  type: PieceType;
  player: Player;
}

export type Board = (Piece | null)[][];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  movesLeft: number;
}