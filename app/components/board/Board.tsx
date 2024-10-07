'use client';
import React from 'react';
import Square from './Square';
import { Piece } from '@/app/logic/pieces/Piece';
import { useChessboardContext } from '@/app/contexts/ChessboardContext';


const Board = () => {
  const {
    boardState
  } = useChessboardContext();

  return (
    <div
      className="
        my-10 
        z-10
        w-[70vw]
        md:max-w-[800px]
        max-w-[600px]
        h-[70vw]
        md:max-h-[800px]
        max-h-[600px]
        border-black
        border-[3px]"
    >
      <div
        className="
          grid
          grid-cols-8
          grid-rows-8
          gap-0
          w-full
          h-full"
      >
        {boardState.map((item: Piece | null, i: number) => (
          <Square
            key={i}
            piece={item}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
