import { LineChecker } from "@/app/utils/LineChecker";
import { Chessboard } from "../board/Chessboard";
import { Piece } from "./Piece";
export class Queen extends Piece {
    private straightChecker: LineChecker;
    private diagonalChecker: LineChecker;

    constructor(chessboard: Chessboard, colour:'white'|'black', col: string, row: number) {
        super(chessboard, colour, 'Queen', col, row);
        this.straightChecker = new LineChecker(chessboard, this, 'straight');
        this.diagonalChecker = new LineChecker(chessboard, this, 'diagonal');
    }

    public calculateValidMoves(): Array<string> {
        return [
            ...this.straightChecker.checkAllDirections(),
            ...this.diagonalChecker.checkAllDirections()
        ]
    }

    public movesTowardsSquare(col: string, row: number){
        return this.diagonalChecker.movesTowardsSquare(col, row) || this.straightChecker.movesTowardsSquare(col,row);
    }
}