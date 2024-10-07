'use client'

import { PieceType } from "@/app/logic/board/Chessboard";
import Avatar from "../Avatar";
import { useChessboardContext } from "@/app/contexts/ChessboardContext";

interface PromotionHolderProps {
  colour: string;
  type: string;
  pieceType: PieceType;
  index: number;
  updateSquare: () => void;
}

const PromotionHolder: React.FC<PromotionHolderProps> = ({ colour, type, pieceType, index, updateSquare}) => {

  const {
    handlePromotion,
    setIsPromoting,
} = useChessboardContext();


  return (
    <div
      className="w-full h-full flex items-center justify-center border-black border-[1px]"
      onClick={() => handleOnClick(colour, pieceType, index, handlePromotion, setIsPromoting, updateSquare)}
    >
      {formatAvatar(type, colour)}
    </div>
  );
}


export default PromotionHolder;

function formatAvatar(piece: string, colour: string): JSX.Element {
  const fileName = `${colour.charAt(0).toUpperCase() + colour.slice(1)}${piece}`;
  return <Avatar path={fileName} />;
}

const handleOnClick = (
  colour: string, 
  pieceType: PieceType, 
  index: number,
  handlePromotion: (colour: string, pieceType: PieceType, index: number) => void,
  setIsPromoting: React.Dispatch<React.SetStateAction<boolean>>,
  updateSquare: () => void,

) => {
  handlePromotion(colour, pieceType, index);
  setIsPromoting(false);
  updateSquare();
  
};
