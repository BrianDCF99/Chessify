import { isatty } from "tty";
import { Chessboard } from "../board/Chessboard";
import { Piece } from "./Piece";

export class King extends Piece {

    constructor(chessboard: Chessboard, colour: 'white'|'black', col: string, row: number) {
        super(chessboard, colour, 'King', col, row);
    }

    public calculateValidMoves(): Array<string> {
        let validMoves = new Array<string>();
        
        validMoves = this.getShoulderSquares();

        validMoves = this.removeSameColourPieces(validMoves);
        validMoves = this.removeOppositeKingShoulderSquares(validMoves);
        this.addCastlingMoves(validMoves); 

        // Check for Checks

        return validMoves;
    }

    public getShoulderSquares(): string[]{
        const col = this.getCol().charCodeAt(0);
        const row = this.getRow();
        let shoulderSquares: {col: number, row: number}[] = [];
        shoulderSquares.push(
            { col: col,     row: row + 1 },    // up
            { col: col + 1, row: row + 1 },  // up-right
            { col: col + 1, row: row },    // right
            { col: col + 1, row: row - 1 },  // down-right
            { col: col,     row: row - 1 },    // down
            { col: col - 1, row: row - 1 },  // down-left
            { col: col - 1, row: row },    // left
            { col: col - 1, row: row + 1 }   // up-left
        );

        return this.removeEdgeMoves(shoulderSquares);
    }


    private removeEdgeMoves(shoulderSquares: { col: number, row: number}[]): string[] {
        const validMoves: string[] = [];

        for(const move of shoulderSquares){
            if(move.col >= 65 && move.col <= 72 && move.row >= 0 && move.row <= 7){
                const column = String.fromCharCode(move.col);
                validMoves.push(`${column}${move.row}`);
            }
        }
        return validMoves;
    }

    private removeSameColourPieces(validMoves: string[]): string[] {
        return validMoves.filter(move => {
            const col = move.charAt(0);
            const row = parseInt(move.charAt(1));
            const piece = this.chessboard.getPieceAtSquare(col, row);
            return !piece || piece.getColour() !== this.getColour();
        });
    }

    private removeOppositeKingShoulderSquares(moves: string[]): string[] {
        const opposingColour = this.getColour() === 'white' ? 'black':'white';
        const opposingKing = this.chessboard.getKingOfColour(opposingColour) as King;
        const kingsShoulders = opposingKing.getShoulderSquares();

        return moves.filter(move => !kingsShoulders.includes(move))
    }

    private addCastlingMoves(validMoves: string[]){
        
        if(this.hasMoved) return;
        const attackingColour = (this.getColour() === 'white' ? 'black':'white');
        const row = (this.colour === 'white' ? 0:7)
        const aRook = this.chessboard.getPieceAtSquare('A',row);
        const hRook = this.chessboard.getPieceAtSquare('H',row);
        

        if(aRook && !aRook.gethasMoved()){
            const squares =[
                { col: 'B', row: row },
                { col: 'C', row: row },
                { col: 'D', row: row }
            ]
            if(this.areSquaresEmptyAndNotAttacked(squares, attackingColour)){
                validMoves.push(`C${row}`)
            }
        }
        if(hRook && !hRook.gethasMoved()){
            console.log("Checking Short castle")
            const squares =[
                { col: 'F', row: row },
                { col: 'G', row: row }
            ]
            if(this.areSquaresEmptyAndNotAttacked(squares, attackingColour)){
                validMoves.push(`G${this.getRow()}`)
            }
        }
        return;
    }

    private areSquaresEmptyAndNotAttacked(squares: { col: string, row: number }[], attackingColour: 'black' | 'white'):boolean {
         console.log("Are squares empty: " + this.areSquaresEmpty(squares))
         const isAttl = this.chessboard.getPiecesAttackingSquare(attackingColour, squares);
        return this.areSquaresEmpty(squares);
    }

    private areSquaresEmpty(squares: { col: string, row: number }[]){
        for(const square of squares){
            if(this.chessboard.getPieceAtSquare(square.col ,square.row)) return false;
        }
        return true;
    }
    private printArrays(moves: {piece: Piece, squares: string[]}[]){
        for(const piece of moves){
            console.log("Piece: " + piece.piece.getType)
            console.log(piece.squares)
        }
    }
}