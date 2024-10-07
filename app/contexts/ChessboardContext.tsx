'use client';

import React, { createContext, ReactNode, useContext, } from 'react';
import useChessBoard from '../hooks/useChessboard';
import { Piece } from '../logic/pieces/Piece';
import { PieceType } from '../logic/board/Chessboard';

interface ChessboardContextType{
    boardState: (Piece | null)[];
    handleSquareClick: (index:number) => void;
    handleDragStart: (index:number) => void;
    handleDrop: (index:number) => void;
    validMoves: number[];
    promotionSquare?: number | null;
    handlePromotion: (colour: string, pieceType: PieceType, index: number) => void;
    isPromoting: boolean;
    setIsPromoting: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChessboardContext = createContext<ChessboardContextType | undefined>(undefined);

export const ChessboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const { 
        //Board Logic
        boardState,
        handleSquareClick, 
        handleDragStart, 
        handleDrop, 
        validMoves, 
        promotionSquare, 
        handlePromotion,
        isPromoting,
        setIsPromoting,

    } = useChessBoard();

    const ChessboardContextValue: ChessboardContextType = {
        boardState,
        handleSquareClick,
        handleDragStart,
        handleDrop,
        validMoves,
        promotionSquare,
        handlePromotion,
        isPromoting,
        setIsPromoting,
    }
    return (
        <ChessboardContext.Provider value={ChessboardContextValue}>
          {children}
        </ChessboardContext.Provider>
    )
};

export const useChessboardContext = () => {
    const context = useContext(ChessboardContext);
    if (!context) {
      throw new Error('useChessboardContext must be used within a ChessboardProvider');
    }
    return context;
  };