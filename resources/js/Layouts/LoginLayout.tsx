import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import {CtuLogo} from '@/Components/CtuLogo';

export default function LoginLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex justify-between bg-mainColor">
            <div className='sm:flex justify-evenly items-center w-full'>
                <Link href="/">
                    <CtuLogo/>
                    <p className='text-center text-5xl text-white pt-6 tracking-widest font-black'>CTU - Pay</p>
                </Link>

                <div className="w-full sm:max-w-md mt-6 px-6 h-3/4 bg-green-100 rounded-4xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-2 border-emerald-200 shadow-md overflow-hidden 
                rounded-custom-radius">
                    {children}
                </div>
            </div>
            
        </div>
    );
}
