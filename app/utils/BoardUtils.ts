import { Chessboard } from "../logic/board/Chessboard";
import { Piece } from "../logic/pieces/Piece";

export class BoardUtils{
    private chessboard: Chessboard;

    constructor(chessboard: Chessboard){
        this.chessboard = chessboard;
    }

    public convertChessBoardToState(): (Piece | null)[]{
        const newState: (Piece | null)[] = [];
        for (let row = 7; row >= 0; row--) {
          for (let col = 0; col < 8; col++) {
            const piece = this.chessboard.getPieceAtSquare(String.fromCharCode(65 + col), row);
            newState.push(piece);
          }
        }
    
        return newState;
    };

    public getCoordinates(index: number): { col: string, row: number }{
        const col = this.getCol(index);
        const row = this.getRow(index);
        return { col, row};
    }

    public getCol(index: number): string{
        return String.fromCharCode(65 + (index % 8));
    }

    public getRow(index:number): number{
        return 8 - Math.floor(index / 8) - 1;
    }


    public getIndex(coordinate: string): number{
        const col = coordinate.charCodeAt(0) - 65; 
        const row = 8 - parseInt(coordinate.charAt(1), 10); 
        return (row * 8 + col) -8; 
    }

    public getIndexArray(validMoves: string[]){
        return validMoves.map(this.getIndex)
    }

    public isIndexValid(index: number, validIndexes: number[]){
        return validIndexes.includes(index);
    }
}