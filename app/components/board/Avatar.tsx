'use client';
import Image from "next/image";

interface AvatarProps {
    path: string;
}

const Avatar: React.FC<AvatarProps> = ({ path }) => {
    // Create a human-readable alt text from the path
    const altText = path.replace(/([A-Z])/g, ' $1').trim();
  
    return (
      <Image
        src={`/images/${path}.png`}
        width={90}
        height={90}
        alt={altText}
      />
    );
  };
  
export default Avatar;