import { Piece } from "../pieces/Piece";
import { Rook } from "../pieces/Rook"; 
import { Knight } from "../pieces/Knight";
import { Bishop } from "../pieces/Bishop";
import { Queen } from "../pieces/Queen";
import { King } from "../pieces/King";
import { Pawn } from "../pieces/Pawn";
import { Square } from "./Square";

export enum PieceType {
    Rook = 'Rook',
    Knight = 'Knight',
    Bishop = 'Bishop',
    Queen = 'Queen',
    King = 'King',
    Pawn = 'Pawn'
}

export class Chessboard {
    private board: Map<string, Array<Square>>;
    private blackPieces: Piece[] = [];
    private whitePieces: Piece[] = [];

    private pieceConstructors: { [key in PieceType]: new (chessboard: Chessboard, color: 'white' | 'black', col: string, row: number) => Piece } = {
        [PieceType.Rook]: Rook,
        [PieceType.Knight]: Knight,
        [PieceType.Bishop]: Bishop,
        [PieceType.Queen]: Queen,
        [PieceType.King]: King,
        [PieceType.Pawn]: Pawn
    };

    constructor() {
        this.board = new Map();
        this.createBoard();
        this.initializePieces();
    }

    private createBoard() {
        for(let col = 0; col < 8; col++){
            let squares = new Array<Square>();
            for(let row = 0; row < 8; row++){
                squares.push(new Square());
            }
            this.board.set(String.fromCharCode(65 + col), squares);
        }
    }

    public getBoard() {
        return this.board;
    }

    public getColouredPieceArray(colour: string): Piece[]{
        if(colour === 'white'){
            return this.whitePieces;
        }
        return this.blackPieces;
    }
    private initializePieces() {
        const backRow: PieceType[] = [PieceType.Rook, PieceType.Knight, PieceType.Bishop, PieceType.Queen, PieceType.King, PieceType.Bishop, PieceType.Knight, PieceType.Rook];
        for (let i = 0; i < 8; i++) {
            this.addPieceToBoard(PieceType.Pawn, 'white', i, 1);
            this.addPieceToBoard(PieceType.Pawn, 'black', i, 6);
            this.addPieceToBoard(backRow[i], 'white', i, 0);
            this.addPieceToBoard(backRow[i], 'black', i, 7);
        }
    }

    private addPieceToBoard(pieceName: PieceType, color: 'white' | 'black', colOffset: number, row: number) {
        const col = String.fromCharCode(65 + colOffset);
        const PieceConstructor = this.pieceConstructors[pieceName];
        if (PieceConstructor) {
            const piece = new PieceConstructor(this, color, col, row);
            if (color === 'white') {
                this.whitePieces.push(piece);
            } else {
                this.blackPieces.push(piece);
            }
            this.setPieceToSquare(col, row, piece);
        }
    }

    public setPieceToSquare(col: string, row: number, piece: Piece | null) {
        const squares = this.board.get(col);
        if (squares && squares[row]) {
            squares[row].setPiece(piece);
            piece?.setNewCoordinates(col, row);
        }
    }

    public getPieceAtSquare(col: string, row: number): Piece | null {
        const squares = this.board.get(col);
        
        if (squares && squares[row]) {
            return squares[row].getPiece();
        }
        return null;
    }

    public removePieceFromSquare(col: string, row: number) {
        const squares = this.board.get(col);
        if (squares && squares[row]) {
            squares[row].removePiece();
        }
    }

    public removeFromColourArrays(pieceRemoved: Piece){
        if(pieceRemoved.getColour() === 'white'){
            this.whitePieces = this.whitePieces.filter(piece => piece !== pieceRemoved)
        }else{
            this.blackPieces = this.blackPieces.filter(piece => piece !== pieceRemoved);
        }
    }

    public addNewPieceToBoard(type: PieceType, colour: 'white' | 'black', col: string, row: number){
        const columnNumber = col.charCodeAt(0) - 65;
        this.addPieceToBoard(type, colour, columnNumber, row);
    }
    

    public getRooksOfColour(colour: string): Array<Rook> {
        const rooks = new Array<Rook>();
        
        if (colour === 'white') {
            for (const piece of this.whitePieces) {
                if (piece instanceof Rook) {
                    rooks.push(piece);
                }
            }
        }else {
            for (const piece of this.blackPieces) {
                if (piece instanceof Rook) {
                    rooks.push(piece);
                }
            }
        }
        
        return rooks;
    }


    public getPiecesAttackingSquare(colour: 'white' | 'black', squares: { col: string, row: number }[]){
        const piecesAndAttackedSquares: {square: string, pieceAndAttacker: {piece: Piece, squares: string[]}[]}[] = [];
        let isAttacked = false;
        for(const square of squares){
            const pieceAttackingSquares = this.isSquareUnderAttackedByColour(colour, square.col, square.row);
            if(pieceAttackingSquares){ 
                piecesAndAttackedSquares.push({square: `${square.col}${square.row}`, pieceAndAttacker: pieceAttackingSquares});
                isAttacked = true;
            }
        }

        if(isAttacked) return piecesAndAttackedSquares;
    }
    

    public isSquareUnderAttackedByColour(colour: 'white' | 'black', col: string, row: number){
        const pieceArray = (colour === 'white' ? this.whitePieces : this.blackPieces);
        const piecesAndAttackedSquares: {piece: Piece, squares: string[]}[] = [];
        for (const piece of pieceArray) {

            if(piece instanceof Knight){
                const validMoves = piece.calculateValidMoves();
                if(validMoves.includes(`${col}${row}`)) piecesAndAttackedSquares.push({piece: piece, squares: [`${col}${row}`]});
                continue;
            } 
            if(piece instanceof Bishop){
                const validMoves = piece.movesTowardsSquare(col, row);
                if(validMoves && (validMoves.length != 0)) piecesAndAttackedSquares.push({piece: piece, squares: validMoves});
                continue;
            } 
            if(piece instanceof Rook){
                const validMoves = piece.movesTowardsSquare(col, row);
                if(validMoves && (validMoves.length != 0)) piecesAndAttackedSquares.push({piece: piece, squares: validMoves});
                continue;
            } 
            if(piece instanceof Queen){
                const validMoves = piece.movesTowardsSquare(col, row);
                if(validMoves && (validMoves.length != 0)) piecesAndAttackedSquares.push({piece: piece, squares: validMoves});
                continue;
            } 
            if(piece instanceof Pawn){
                const captureSquares = piece.getCaptureSquares();
                if(captureSquares.includes(`${col}${row}`)) piecesAndAttackedSquares.push({piece: piece, squares: [`${col}${row}`]});
                continue;
            }

            if(piece instanceof King){
                const shoulderMoves = piece.getShoulderSquares();
                if(shoulderMoves.includes(`${col}${row}`)) piecesAndAttackedSquares.push({piece: piece, squares: [`${col}${row}`]});
                continue;
            }

        }
        
        return piecesAndAttackedSquares;
    }

    public getKingOfColour(colour: string){
        const pieceArray = (colour === 'white' ? this.whitePieces : this.blackPieces);
        for(const piece of pieceArray){
            if(piece instanceof King)
                return piece;
        } 
    }

}
