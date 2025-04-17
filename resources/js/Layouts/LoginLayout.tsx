import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import {CtuLogo} from '@/Components/CtuLogo';

export default function LoginLayout({ children }: PropsWithChildren) {
    return (
        <div className="h-screen flex justify-center  bg-mainColor">
            <div className='px-5 w-full my-auto lg:my-5 sm:flex justify-evenly items-center '>
                <div className="hidden sm:hidden md:hidden lg:flex">
                    <Link href="/">
                        <CtuLogo className='w-[25em] h-[25em]'/>
                        <p className='text-center text-5xl text-white pt-6 tracking-widest font-black'>CTU - Pay</p>
                    </Link>
                </div>

                <div className="w-full  sm:px-8 sm:h-[80%] sm:w-[70%]  md:px-10 md:w-[70%] md:h-[70%] lg:max-w-md lg:h-[80%] lg:px-8 mt-6 px-6  bg-green-100 rounded-4xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-2 border-emerald-200 shadow-md
                rounded-custom-radius">
                    {children}
                </div>
            </div>
            
        </div>
    );
}
