import { useState, useEffect } from "react";
import { Chessboard } from "../logic/board/Chessboard";
import { Piece } from "../logic/pieces/Piece";
import { Pawn } from "../logic/pieces/Pawn";
import { PawnHooks } from "./PawnHooks";
import { PieceType } from "../logic/board/Chessboard";
import { King } from "../logic/pieces/King";
import { BoardUtils } from "../utils/BoardUtils";
import { KingHooks } from "./KingHooks";

const useChessBoard = () => {
  const [chessboard] = useState(new Chessboard()); // Initialize once
  const [boardState, setBoardState] = useState<(Piece | null)[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<Piece | null>(null);
  const [fromSquare, setFromSquare] = useState<{ col: string; row: number } | null>(null);
  const [validMoves, setValidMoves] = useState<number[]>([]);
  const [promotionSquare, setPromotionSquare] = useState<number | null>(null);
  const [isPromoting, setIsPromoting] = useState<boolean>(false);
  const [validEnPassantPawns, setValidEnPassantPawns] = useState<Pawn[]>([]);

  const [currentTurn, setCurrentTurn] = useState<"white" | "black">("white");

  const pawnHooks = new PawnHooks(chessboard, validEnPassantPawns);
  const kinghooks = new KingHooks(chessboard)
  const utils = new BoardUtils(chessboard);

  useEffect(() => {
    updateBoardState();
  }, [chessboard]);

  const updateBoardState = () => {
    setBoardState(utils.convertChessBoardToState());
  };

  const updateFromSquare = (index: number | null) => {
    if(!index){
      setFromSquare(null);
      return;
    }
    setFromSquare(utils.getCoordinates(index));

  }

  const setDraggedPieceAndValidMoves = (piece:Piece | null, validMoves: number[]) => {
    setDraggedPiece(piece);
    setValidMoves(validMoves);
  }


  const handleSquareClick = (index: number) => {
    setDraggedPieceAndValidMoves(null, []);
    
    const { col, row } = utils.getCoordinates(index);

    if (draggedPiece) {
      movePiece(col, row);
    } else {
      selectPiece(col, row);
    }
  };

  const handleDragStart = (index: number) => (event: React.DragEvent<HTMLDivElement>) => {
    const piece = chessboard.getPieceAtSquare(utils.getCol(index), utils.getRow(index));
    if (piece) {
      setDraggedPiece(piece);
      updateFromSquare(index);
      event.dataTransfer.setData('text/plain', JSON.stringify(utils.getCoordinates(index)));
    }
  };

  const handleDrop = (index: number) => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (draggedPiece && fromSquare) {
      movePiece(utils.getCol(index), utils.getRow(index));
    }
  };

  const selectPiece = (col: string, row: number) => {
    const piece = chessboard.getPieceAtSquare(col, row);
  
    if (piece) {
      setDraggedPieceAndValidMoves(piece, utils.getIndexArray(piece.calculateValidMoves()));
      updateFromSquare(utils.getIndex(`${col}${row}`));
    } else {
      setValidMoves([]);
    }
  };

  const movePiece = (col: string, row: number) => {
    const pieceAtSquare = chessboard.getPieceAtSquare(col, row);
    if(!draggedPiece || !fromSquare) return;

    const moveIndex = utils.getIndex(`${col}${row}`);
    if(!utils.isIndexValid(moveIndex, validMoves)) return;

    if(draggedPiece instanceof Pawn){
      handlePawnMove(col, row, draggedPiece, fromSquare);
    } else if(draggedPiece instanceof King){
      kinghooks.movePiece(col, row, draggedPiece, fromSquare)
    } else{
      chessboard.removePieceFromSquare(fromSquare.col, fromSquare.row);
      chessboard.setPieceToSquare(col, row, draggedPiece);
    }


    if(pieceAtSquare) chessboard.removeFromColourArrays(pieceAtSquare);
    setDraggedPieceAndValidMoves(null, []);
    updateFromSquare(null);
    updateBoardState();
    draggedPiece.moved();
  };

  const handlePawnMove = (
    col: string,
    row: number, 
    piece: Piece,
    fromSquare: { col: string; row: number; },
  ) => {
    const { newEnPassantPawns, isPawnPromoting } = pawnHooks.movePiece(col, row, piece, fromSquare, promotionSquare);
    setValidEnPassantPawns(newEnPassantPawns);
    setIsPromoting(isPawnPromoting);
    if(isPawnPromoting) {
      setPromotionSquare(utils.getIndex(`${col}${row}`));
    }
  }
  

  const handlePromotion = (colour: 'white' | 'black', pieceType: PieceType, index: number) => {
    chessboard.addNewPieceToBoard(pieceType, colour, utils.getCol(index), utils.getRow(index));
    setPromotionSquare(null);
    updateBoardState();
  }


  return { 
    boardState, 
    validMoves, 
    handleSquareClick, 
    handleDragStart, 
    handleDrop, 
    promotionSquare, 
    handlePromotion, 
    isPromoting, 
    setIsPromoting, 
    updateBoardState};
};


export default useChessBoard;
