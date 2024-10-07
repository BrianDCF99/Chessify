
import { LineChecker } from "@/app/utils/LineChecker";
import { Chessboard } from "../board/Chessboard";
import { Piece } from "./Piece";

export class Rook extends Piece {
    private checker: LineChecker;

    constructor(chessboard: Chessboard, colour: 'white' | 'black', col: string, row: number) {
        super(chessboard, colour, 'Rook', col, row);
        this.checker = new LineChecker(chessboard, this, 'straight');
    }

    public calculateValidMoves(): Array<string> {
        return this.checker.checkAllDirections();
    }

    public getSquaresInDirection(direction: string){
        switch(direction){
            case 'up':     return this.checker.checkDirection1();
            case 'right':  return this.checker.checkDirection2();
            case 'down':   return this.checker.checkDirection3();
            case 'left':   return this.checker.checkDirection4();
        }
    }

    public movesTowardsSquare(col: string, row: number){
        return this.checker.movesTowardsSquare(col, row);
    }


}