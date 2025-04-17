import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';
import { FaChevronUp } from "react-icons/fa6";
import { CtuLogo } from '@/Components/CtuLogo';
import { Developers } from '@/Components/Developers';

export default function Welcome({ auth }: PageProps) {
    const [isActive, setActive] = useState(false);

    const toggleActive = () => {
        setActive(!isActive);
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-mainColor min-h-screen flex flex-col">
                {/* Header */}
                <div className="sm:fixed sm:top-8 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="border-2 border-[#67CFD5] rounded py-2 px-8 text-[#67CFD5]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            className="border-2 border-[#67CFD5] rounded py-2 px-8 text-[#67CFD5]"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Main Content */}
                <div className="flex-grow w-full flex justify-center items-center py-40 px-8 md:px-32 bg-mainColor">
                    <div className="flex justify-center items-center flex-wrap gap-10">
                        <div className="w-[20em] md:w-[45em]">
                            <p className="font-bold text-4xl md:text-6xl text-white">
                                Welcome to <span className="text-custom-word-color">CTU-Pay Payroll Management System</span>
                            </p>
                            <div className="pt-5 md:pt-6 w-full md:w-[70%]">
                                <p className="text-xl text-white">
                                    Our platform is designed to simplify your leave management and payroll processing, ensuring efficiency, accuracy, and convenience for both employees and employers.
                                </p>
                            </div>
                        </div>
                        <div className="hidden md:flex justify-center items-center mx-auto">
                            <CtuLogo className='w-[25em] h-[25em]'/>
                        </div>
                    </div>
                </div>

                {/* Footer Slide */}
                <div className="relative h-6">
                    <div
                        className={`
                            w-full h-[550px] py-4 rounded-t-3xl bg-[#012424] transition-all duration-500 ease-in-out
                            overflow-hidden
                            ${isActive ? 'bg-custom-gradient-test -translate-y-[405px] opacity-100 max-h-[500px]' : 'translate-y-0 max-h-20'}
                        `}
                    >
                        <div className="w-full flex justify-center items-center">
                            <button onClick={toggleActive} className="text-white">
                                <FaChevronUp
                                    className={`text-3xl transition-transform duration-500 ease-in-out ${isActive ? 'rotate-180' : ''}`}
                                />
                            </button>
                        </div>
                        <div className={`text-center transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                            <p className='text-2xl text-white'>Developers</p>
                        </div>
                        <div className={`w-full flex justify-center items-center transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="pt-5 max-h-[450px] overflow-y-auto w-[100%] md:w-[70%]">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                    <Developers />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
