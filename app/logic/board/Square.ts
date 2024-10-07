import { Piece } from "../pieces/Piece";


export class Square {
    private piece: Piece | null;

    constructor() {
        this.piece = null;
    }

    public setPiece(piece: Piece | null) {
        this.piece = piece;
    }

    public removePiece() {
        this.piece = null;
    }

    public getPiece() {
        return this.piece;
    }
    
}