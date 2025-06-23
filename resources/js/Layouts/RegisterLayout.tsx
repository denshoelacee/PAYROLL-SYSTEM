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
                        <p className='text-center text-5xl text-white pt-6 tracking-widest font-black'>CTU Payroll</p>
                    </Link>
                </div>

                <div style={{
                background: `linear-gradient(
                105.8deg,
                rgba(200, 237, 217, 0.22) 3.42%,
                rgba(177, 198, 186, 0.0484) 101.99%,
                rgba(115, 210, 159, 0) 134.85%
                )`, }}
                className="w-full sm:px-8 sm:h-[100%] sm:w-[70%]  md:px-10 md:w-[70%] md:h-[100%] lg:max-w-md lg:h-[100%] lg:px-8 lg:py-10 mt-6 px-6 py-10 rounded-4xl border-2 border-emerald-200 shadow-md
                rounded-custom-radius">
                    {children}
                </div>
            </div>
            
        </div>
    );
}
