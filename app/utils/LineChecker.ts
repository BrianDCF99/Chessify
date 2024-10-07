import { Chessboard } from "../logic/board/Chessboard";
import { Piece } from "../logic/pieces/Piece";

export class LineChecker{
    private chessboard: Chessboard;
    private lineOfSight: string[] = [];
    private piece: Piece;
    private offsets: { colOffset: number, rowOffset: number}[];

    constructor(chessboard: Chessboard, piece: Piece, type: 'diagonal' | 'straight'){
        this.chessboard = chessboard;
        this.piece = piece;
        this.offsets = this.initializeOffsets(type);
    }

    private initializeOffsets(type: 'diagonal' | 'straight'){
        if(type === 'diagonal'){
            return [
                {colOffset: 1, rowOffset: 1}, //Right - up
                {colOffset: 1, rowOffset: -1},//Right - down
                {colOffset: -1, rowOffset: -1},//Left - down
                {colOffset: -1, rowOffset: 1}//left - up
            ];
        }

        return [
            {colOffset: 0, rowOffset: 1}, //up
            {colOffset: 1, rowOffset: 0}, //right
            {colOffset: 0, rowOffset: -1},//down
            {colOffset: -1, rowOffset: 0} //left
        ];
    }

    private addToLineOfSight(square: string): void{
        this.lineOfSight.push(square);
    }

    public getLineOfSight(): string[]{
        return this.lineOfSight;
    }

    public checkAllDirections(): string[]{
        const col = this.piece.getCol();
        const row = this.piece.getRow();
        return [
        ...this.checkDirection1(),
        ...this.checkDirection2(),
        ...this.checkDirection3(),
        ...this.checkDirection4(),
        ]
    }

    public movesTowardsSquare(col: string, row: number){
        const square = `${col}${row}`;
        if(this.checkDirection1().includes(square)) return this.checkDirection1();
        if(this.checkDirection2().includes(square)) return this.checkDirection2();
        if(this.checkDirection3().includes(square)) return this.checkDirection3();
        if(this.checkDirection4().includes(square)) return this.checkDirection4();
    }

    public checkDirection1(): string[]{
        const validMoves: string[] = [];
        const { col, row } = this.getCoordinatesAsNumbers();
        const { colOffset, rowOffset } = this.offsets[0];
        this.checkLineRecursive(validMoves, col, row, colOffset, rowOffset, true);
        return validMoves;
    }

    public checkDirection2(): string[]{
        const validMoves: string[] = [];
        const { col, row } = this.getCoordinatesAsNumbers();
        const { colOffset, rowOffset } = this.offsets[1];
        this.checkLineRecursive(validMoves, col, row, colOffset, rowOffset, true);
        return validMoves;
    }

    public checkDirection3(): string[]{
        const { col, row } = this.getCoordinatesAsNumbers();
        const { colOffset, rowOffset } = this.offsets[2];
        const validMoves: string[] = [];
        this.checkLineRecursive(validMoves, col, row, colOffset, rowOffset, true);
        return validMoves;
    }

    public checkDirection4(): string[]{
        const { col, row } = this.getCoordinatesAsNumbers();
        const { colOffset, rowOffset } = this.offsets[3];
        const validMoves: string[] = [];
        this.checkLineRecursive(validMoves, col, row, colOffset, rowOffset, true);
        return validMoves;
    }

    private getCoordinatesAsNumbers(): { col: number, row: number}{
        const col = this.piece.getCol().charCodeAt(0);
        const row = this.piece.getRow();
        return { col, row };
    }


    private checkLineRecursive(
        validMoves: string[],
        currColNum: number,
        currRow: number,
        colOffset: number,
        rowOffset: number,
        addToValidMoves: boolean
    ): void {
        const newColCharCode = currColNum + colOffset;
        const newColChar = String.fromCharCode(newColCharCode);
        const newRowNum = currRow + rowOffset;
    
        if (!this.isWithinBounds(newColCharCode, newRowNum)) return;
    
        this.addToLineOfSight(`${newColChar}${newRowNum}`);
    
        const squarePiece = this.chessboard.getPieceAtSquare(newColChar, newRowNum);
    
        if (!squarePiece) {
            if (addToValidMoves) validMoves.push(`${newColChar}${newRowNum}`);
            this.checkLineRecursive( validMoves, newColCharCode, newRowNum, colOffset, rowOffset, addToValidMoves);
            return;
        }
    
        if (squarePiece.getColour() !== this.piece.getColour() && addToValidMoves) {
            validMoves.push(`${newColChar}${newRowNum}`);
        }
    
        this.checkLineRecursive( validMoves, newColCharCode, newRowNum, colOffset, rowOffset, false);
    }

    private isWithinBounds(colCode: number, row: number): boolean {
        return colCode >= 65 && colCode <= 72 && row >= 0 && row <= 7;
    }

}