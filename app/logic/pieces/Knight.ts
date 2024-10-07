import { Chessboard } from "../board/Chessboard";
import { Piece } from "./Piece";

export class Knight extends Piece {
    constructor(chessboard: Chessboard, colour: 'white' | 'black', col: string, row: number) {
        super(chessboard, colour, 'Knight', col, row);
    }

    public calculateValidMoves(): Array<string> {
        return this.getValidMoves();
    }

    public getValidMoves(): string[]{
        const col = this.getCol().charCodeAt(0);
        const row = this.getRow();
        let potentialSquares: {col: number, row: number}[] = [];
        potentialSquares.push(
            { col: col - 1, row: row + 2 },    // 2up-1left
            { col: col + 1, row: row + 2 },    // 2up-right
            { col: col + 2, row: row + 1 },    // 2right-1up
            { col: col + 2, row: row - 1 },    // 2right-1down
            { col: col + 1, row: row - 2 },    // 2down-1right
            { col: col - 1, row: row - 2 },    // 2down-1left
            { col: col - 2, row: row + 1 },    // 2left-1up
            { col: col - 2, row: row - 1 }     // 2left-1down
        );

        return this.removeEdgeMoves(potentialSquares);
    }


    private removeEdgeMoves(potentialSquares: { col: number, row: number}[]): string[] {
        const validMoves: string[] = [];

        for(const move of potentialSquares){
            if(move.col >= 65 && move.col <= 72 && move.row >= 0 && move.row <= 7){
                const column = String.fromCharCode(move.col);
                validMoves.push(`${column}${move.row}`);
            }
        }
        return this.removeSameColourPieces(validMoves);
    }

    private removeSameColourPieces(validMoves: string[]): string[] {
        return validMoves.filter(move => {
            const col = move.charAt(0);
            const row = parseInt(move.charAt(1));
            const piece = this.chessboard.getPieceAtSquare(col, row);
        
            return !piece || piece.getColour() !== this.getColour();
        });
    }
    
    
}
