'use client';

import React from 'react';
import Holder from './Holder';
import ValidMove from './ValidMove';
import { Piece } from '@/app/logic/pieces/Piece';
import { PieceType } from '@/app/logic/board/Chessboard';
import PromotionHolder from './promotion/PromotionHolder';
import { useChessboardContext } from '@/app/contexts/ChessboardContext';

interface SquareProps {
  piece: Piece | null;
  index: number;
}

const Square: React.FC<SquareProps> = ({ piece, index }) => {
  const {
    handleSquareClick,
    handleDragStart,
    handleDrop,
    validMoves,
    promotionSquare,
  } = useChessboardContext();

  const isValidMove = validMoves.includes(index);
  let isPromotingSquare = promotionSquare === index;

  const updateDisplayToPiece = () => {
    console.log("updating square")
    displayPiece(onDragStart, onDrop, piece);
    isPromotingSquare = false;
  }

  const handleClick = () => {
    if (isPromotingSquare) {
      // Prevent piece movement when promotion is active
      return;
    }
    handleSquareClick(index);
  };

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text/plain', index.toString());
    handleDragStart(index);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const draggedIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
    handleDrop(draggedIndex);
  };

  return (
    <div
      className={`
        ${index % 2 === Math.floor(index / 8) % 2 ? 'bg-cWhite' : 'bg-cBlack'}
        border-black
        border-[1px]
        flex
        justify-center
        items-center
        relative
      `}
      onClick={handleClick}
    >
      {isValidMove && <ValidMove />}
      
      {isPromotingSquare ? 
        displayPromotion(index, updateDisplayToPiece, piece)
        : displayPiece(onDragStart, onDrop, piece)
      }
    </div>
  );
};

function displayPiece(
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void, 
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void,
  piece?: Piece | null,
): JSX.Element {
  const pieceData = piece ? { colour: piece.getColour(), piece: piece.getType() } : null;
  if (pieceData) {
    return (
      <div
        draggable
        onDragStart={onDragStart}
        className="w-16 h-16 flex items-center justify-center z-40"
        onDragOver={(e) => e.preventDefault()} // Required for drop to work
        onDrop={onDrop}
      >
        <Holder piece={pieceData.piece} colour={pieceData.colour} />
      </div>
    );
  }
  return <></>;
}

function displayPromotion(
  index: number,
  updateDisplayToPiece: () => void,
  piece?: Piece | null
  
): JSX.Element {
  if (piece) {
    const colour = piece.getColour();
    return (
      <div className="
        grid
        grid-cols-2
        grid-rows-2
        w-full
        h-full
      ">
        <PromotionHolder colour={colour} type="Queen" pieceType={PieceType.Queen} index={index} updateSquare={updateDisplayToPiece}/>
        <PromotionHolder colour={colour} type="Rook" pieceType={PieceType.Rook} index={index} updateSquare={updateDisplayToPiece}/>
        <PromotionHolder colour={colour} type="Knight" pieceType={PieceType.Knight} index={index} updateSquare={updateDisplayToPiece}/>
        <PromotionHolder colour={colour} type="Bishop" pieceType={PieceType.Bishop} index={index} updateSquare={updateDisplayToPiece}/>
      </div>
    );
  }
  return <></>;
}

export default Square;
