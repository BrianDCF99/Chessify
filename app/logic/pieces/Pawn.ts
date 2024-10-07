import { Chessboard } from "../board/Chessboard";
import { Piece } from "./Piece";

export class Pawn extends Piece {

    private EPMoves: string[];
    private direction: number;

    constructor(chessboard: Chessboard, colour: 'white' | 'black', col: string, row: number) {
        super(chessboard, colour, 'Pawn', col, row);
        this.EPMoves = new Array<string>;
        this.direction = colour === 'white' ?  1: -1;
    }

    public getEPMoves(): string[] {
        return this.EPMoves;
    }
    
    public calculateValidMoves(): Array<string> {
        const validMoves = new Array<string>();
        const direction = this.getColour() === 'white' ? 1 : -1;

        if (!this.hasMoved) validMoves.push(...this.twoSquaresUp(direction));
        validMoves.push(...this.forwardMoves(direction));
        validMoves.push(...this.captureMoves(direction));
        validMoves.push(...this.EPMoves);

        return validMoves;
    }

    private twoSquaresUp(direction: number): Array<string> {
        const validMoves = new Array<string>();

        const squareInFront = this.getPieceWithOffset(0, direction);
        const squareTwoInFront = this.getPieceWithOffset(0, direction * 2);
        
        if (!squareInFront && !squareTwoInFront) {
            validMoves.push(this.getCol() + (this.getRow() + direction * 2));
        }

        return validMoves;
    }

    private forwardMoves(direction: number): Array<string> {
        const validMoves = new Array<string>();

        const squareInFront = this.getPieceWithOffset(0, direction);

        if (!squareInFront) {
            validMoves.push(this.getCol() + (this.getRow() + direction));
        }

        return validMoves;
    }

    private captureMoves(direction: number): Array<string> {
        const validMoves = new Array<string>();

        if (this.getCol().charCodeAt(0) > 65) {
            const leftDiagonal = this.getPieceWithOffset(-1, direction);

            if (leftDiagonal && leftDiagonal.getColour() !== this.getColour()) {
                validMoves.push(leftDiagonal.getCol() + leftDiagonal.getRow());
            }
        }

        if (this.getCol().charCodeAt(0) < 72) {
            const rightDiagonal = this.getPieceWithOffset(1, direction);

            if (rightDiagonal && rightDiagonal.getColour() !== this.getColour()) {
                validMoves.push(rightDiagonal.getCol() + rightDiagonal.getRow());
            }
        }

        return validMoves;
    }

    public getCaptureSquares(){
        const column = this.getCol().charCodeAt(0);
        const row = this.getRow();
        const captureSquares: { col: number ,row:number }[] = [
           {col: column+1, row: row+this.direction},
           {col: column-1, row: row+this.direction}
        ]
        return this.removeEdgeMoves(captureSquares)

    }
    private removeEdgeMoves(potentialSquares: { col: number, row: number}[]): string[] {
        const validMoves: string[] = [];

        for(const move of potentialSquares){
            if(move.col >= 65 && move.col <= 72 && move.row >= 0 && move.row <= 7){
                const column = String.fromCharCode(move.col);
                validMoves.push(`${column}${move.row}`);
            }
        }
        return validMoves;
    }

    

    //Used in the middle of the Move function in useChessboard class
    // piece that is alerting already has new coordinates updated
    public alertEnPassant(chessboard: Chessboard){
        const rowOffset = (this.getColour() == 'white' ? -1 : 1)
        const enPassantPossibilityPawns = new Array<Pawn>;
        const currentPawnColumn = this.getCol().charCodeAt(0);
        const leftColumnPawn = chessboard.getPieceAtSquare(String.fromCharCode(currentPawnColumn - 1), this.getRow());
        const rightColumnPawn = chessboard.getPieceAtSquare(String.fromCharCode(currentPawnColumn + 1), this.getRow()) as Pawn;

       
        if(leftColumnPawn) {
            leftColumnPawn.addEnPassantMove(this.getCol(), this.getRow()+ rowOffset);
            enPassantPossibilityPawns.push(leftColumnPawn as Pawn);
        }
        if(rightColumnPawn){
            rightColumnPawn.addEnPassantMove(this.getCol(), this.getRow()+ rowOffset);
            enPassantPossibilityPawns.push(rightColumnPawn);
        }
        
        return enPassantPossibilityPawns;
    }

     addEnPassantMove(col: string, row: number){
        this.EPMoves.push(col+row);
    }

    public clearEPMoves(){
        this.EPMoves = [];
    }

}
