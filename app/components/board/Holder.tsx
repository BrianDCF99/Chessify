'use client';
import React, { forwardRef } from 'react';
import Avatar from './Avatar';

interface HolderProps {
  piece: string;
  colour: string;
}

const Holder = forwardRef<HTMLDivElement, HolderProps>(({ piece, colour }, ref) => {
  if (!piece || !colour) return null;

  return (
    <div
      ref={ref}
      className="w-full h-full flex items-center justify-center"
    >
      {formatAvatar(piece, colour)}
      
    </div>
  );
});

export default Holder;

function formatAvatar(piece: string, colour: string): JSX.Element {
  const fileName = `${colour.charAt(0).toUpperCase() + colour.slice(1)}${piece}`;
  return <Avatar path={fileName} />;
}
