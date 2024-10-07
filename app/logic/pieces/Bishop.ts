

import { LineChecker } from "@/app/utils/LineChecker";
import { Chessboard } from "../board/Chessboard";
import { Piece } from "./Piece";

export class Bishop extends Piece {
    private checker: LineChecker;
    
    constructor(chessboard: Chessboard,colour: 'white' | 'black', col: string, row: number) {
        super(chessboard, colour, 'Bishop', col, row);
        this.checker = new LineChecker(chessboard, this, 'diagonal');
    }
    
    public calculateValidMoves(): Array<string> {
        return this.checker.checkAllDirections();
    }
    
    public movesTowardsSquare(col: string, row: number){
        const moves = this.checker.movesTowardsSquare(col, row);
;        return moves;
    }

}
