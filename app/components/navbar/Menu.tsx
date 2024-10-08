'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                
                <div
                    onClick={toggleOpen}
                    className="
                    p-3
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3 
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                    bg-black
                    active:bg-gray-400
                    "
                >
                    <AiOutlineMenu className="text-white text-2xl"/>
                </div>
            </div>
            {isOpen && (
                <div 
                    className="
                        absolute
                        rounded-xl
                        shadow-md
                        w-[200px]
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                    "
                >
                    <div className="flex flex-col cursor-pointer">
                        <>
                            <MenuItem 
                                onClick={() => {}}
                                label="Login"
                            />
                            <MenuItem
                                onClick={() => {}}
                                label="Sign-up"
                            />
                        </>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;