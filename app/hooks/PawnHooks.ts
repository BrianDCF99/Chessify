import { Pawn } from "../logic/pieces/Pawn";
import { Chessboard } from "../logic/board/Chessboard";
import { Piece } from "../logic/pieces/Piece";
import { BoardUtils } from "../utils/BoardUtils";

export class PawnHooks {
  private chessboard: Chessboard;
  private validEnPassantPawns: Pawn[];
  private utils: BoardUtils;

  constructor(chessboard: Chessboard, validEnPassantPawns: Pawn[]) {
    this.chessboard = chessboard;
    this.validEnPassantPawns = validEnPassantPawns;
    this.utils = new BoardUtils(chessboard);
  }

  public movePiece(col: string, row: number, draggedPiece: Piece, fromSquare: { col: string, row: number }, promotionSquare: number | null) {
    let newEnPassantPawns: Pawn[] = [];
    let isPawnPromoting = false;
    const pawn = draggedPiece as Pawn;
    const rowOffset = draggedPiece.getColour() === 'white' ? -1 : 1;
    const promotionRow = draggedPiece.getColour() === 'white' ? 7 : 0;

    if (pawn.getEPMoves().includes(col + row)) {
      this.chessboard.removePieceFromSquare(col, row + rowOffset);
    }
    this.chessboard.removePieceFromSquare(fromSquare.col, fromSquare.row);
    this.chessboard.setPieceToSquare(col, row, draggedPiece);

    if (row == promotionRow) {
      promotionSquare = this.utils.getIndex(pawn.getCol() + pawn.getRow());
      isPawnPromoting = true;
    }

    this.removeEnPassantPossibilities(this.validEnPassantPawns);
    newEnPassantPawns = this.checkEnPassantPossibility(this.chessboard, draggedPiece, fromSquare, row);

    return { newEnPassantPawns, isPawnPromoting};
  }

  private checkEnPassantPossibility(
    chessboard: Chessboard,
    draggedPiece: Piece,
    fromSquare: { col: string; row: number },
    row: number,
  ): Pawn[] {
    let newEnPassantPawns: Pawn[] = [];
    const rowOffset = draggedPiece.getColour() === 'white' ? 2 : -2;
    if (draggedPiece instanceof Pawn && fromSquare.row + rowOffset === row) {
      const pawn = draggedPiece as Pawn;
      newEnPassantPawns = pawn.alertEnPassant(chessboard);
    }
    return newEnPassantPawns;
  }

  private removeEnPassantPossibilities(pawns: Pawn[]) {
    for (const pawn of pawns) {
      pawn.clearEPMoves();
    }
  }


}
