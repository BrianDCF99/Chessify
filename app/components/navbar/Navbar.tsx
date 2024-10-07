'use client';
 
import Container from '../Container';
import Title from './Title';
import Logo from './Logo';
import Menu from './Menu';

const NavBar = () => {
    return (
        <div className="w-full bg-grey-400 z-10 shadow-sm">
            <div className="
                py-3
                border-b-[1px]
            ">
                <Container>
                    <div className="
                        flex
                        flex-row
                        items-center
                        justify-between
                        gap-3
                        md:gap-0
                    ">
                        <Logo />
                        <Title />
                        <Menu />
                    </div>
                   

                </Container>
            </div>
        </div>

    );

}

export default NavBar;