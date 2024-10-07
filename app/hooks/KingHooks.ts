import { Chessboard } from "../logic/board/Chessboard";
import { King } from "../logic/pieces/King";
import { Piece } from "../logic/pieces/Piece";

export class KingHooks{
    private chessboard: Chessboard;
    private whitePieces: Piece[];
    private blackPieces: Piece[];
    private whiteKing: Piece;
    private blackKing: Piece;



    constructor(chessboard: Chessboard){
        this.chessboard = chessboard;
        this.whitePieces = chessboard.getColouredPieceArray('white');
        this.blackPieces = chessboard.getColouredPieceArray('black');
        this.whiteKing = chessboard.getKingOfColour('white') as King;
        this.blackKing = chessboard.getKingOfColour('black') as King;
    }

    public movePiece(col: string, row: number, king: Piece, fromSquare: { col: string, row: number }){
        const check = false;

        if(!king.gethasMoved()){
            if(col === 'C'){
             const rook = this.chessboard.getPieceAtSquare('A', row,);
             this.castleShort(row, king, rook);
            }
            if(col === 'G') {
             const rook = this.chessboard.getPieceAtSquare('H', row,);
             this.castleLong(row, king, rook);
            }
        }

        this.chessboard.setPieceToSquare(col, row, king);
        this.chessboard.setPieceToSquare(fromSquare.col, fromSquare.row, null);
    }

    private castleShort(row: number, king: Piece, rook: Piece | null){
        this.chessboard.setPieceToSquare('C', row, king);
        this.chessboard.setPieceToSquare('D', row, rook);
        this.chessboard.setPieceToSquare('E', row, null);
        this.chessboard.setPieceToSquare('A', row, null)
    }

    private castleLong(row: number, king: Piece, rook: Piece | null){
        this.chessboard.setPieceToSquare('G', row, king);
        this.chessboard.setPieceToSquare('F', row, rook);
        this.chessboard.setPieceToSquare('E', row, null);
        this.chessboard.setPieceToSquare('H', row, null);
    }

    private isMoveCheck(colour: string){
        const piecesChecking: Piece[] = [];
        const pieces = this.chessboard.getColouredPieceArray(colour);

    }

}