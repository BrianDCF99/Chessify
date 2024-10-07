import { Chessboard } from "../board/Chessboard";

export abstract class Piece {
    protected chessboard: Chessboard;
    protected colour: 'white'|'black';
    protected type: string;
    protected hasMoved: boolean;
    private col: string;
    private row: number;
    


    constructor(chessboard: Chessboard, colour: 'white'|'black', type: string, col: string, row: number) {
        this.chessboard = chessboard;
        this.colour = colour;
        this.type = type;
        this.hasMoved = false;
        this.row = row;
        this.col = col;
    }

    public getColour():'white'|'black'{
        return this.colour;
    }

    public gethasMoved(): boolean{
        return this.hasMoved;
    }

    public getType(): string {
        return this.type;
    }

    public moved(){
        this.hasMoved = true;
    }
    public getRow() {
        return this.row;
    }

    private setRow(row: number) {
        this.row = row;
    }

    //should retturn a string
    public getCol() {
        return this.col;
    }
    private setCol(col: string) {
        this.col = col;
    }

    public setNewCoordinates(col: string, row: number){
        this.setCol(col);
        this.setRow(row);
    }


    public abstract calculateValidMoves(): Array<string> ;

    protected getPieceWithOffset(colOffset: number, rowOffset: number): Piece | null {
        const col = String.fromCharCode(this.getCol().charCodeAt(0) + colOffset);
        const row = this.getRow() + rowOffset;
        return this.chessboard.getPieceAtSquare(col, row);
    }

    public addEnPassantMove(col: string, row: number){}
}