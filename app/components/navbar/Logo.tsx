'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const routeer = useRouter();
    
    return (
        <Image 
            alt = "Logo"
            className="
                md:block
                cursor-pointer
                rounded-full
                w-12
                h-12
                object-cover"
            height="100"
            width="100"
            src="/images/logo.jpg"
        />
    )

}

export default Logo;