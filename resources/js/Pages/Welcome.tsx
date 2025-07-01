import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';
import { FaChevronUp } from "react-icons/fa6";
import { CtuLogo } from '@/Components/CtuLogo';
import { Developers } from '@/Components/Developers';
import Modal from '@/Components/Modal';
import '../../styles/style.css';
import { FaChevronDown } from 'react-icons/fa';

export default function Welcome({ auth }: PageProps) {
    const [isActive, setActive] = useState(false);

    const toggleActive = () => {
        setActive(!isActive);
    };

    //useAOS();

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-mainColor min-h-svh flex flex-col">
                {/* Header */}
                <div className=" sm:fixed sm:top-2 sm:right-0 p-6 text-end h-full">
                    {auth.user ? (
                        <div>   
                            {auth.user.role === 'admin' && (
                                <Link
                                    href={route('admin.dashboard')}
                                    className="border-2 border-button-border-color rounded py-2 px-8 text-[#67CFD5]"
                                >
                                    Dashboard
                                </Link>
                            )}

                            {auth.user.role === 'user' && (
                                <Link
                                    href={route('employee.dashboard')}
                                    className="border-2 border-button-border-color rounded py-2 px-8 text-[#67CFD5]"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    ) : (
                        <Link
                            href={route('login')}
                            className="border-2 border-button-border-color rounded py-2 px-8 text-[#67CFD5] hover:bg-button-border-color hover:text-mainColor transition-all duration-300"
                        >
                            Login
                        </Link>
                        
                    )}

                </div>

                {/* Main Content */}
                <div className="flex-grow w-full flex flex-col justify-center items-center px-8 py-21 md:px-20 bg-mainColor">
                    <div className="flex justify-center items-center flex-wrap gap-10">
                        <div className="w-[20em] md:w-[40em]">
                            <p className="font-bold text-4xl md:text-5xl text-white">
                                Welcome to <span className="text-custom-word-color">CTU Payroll Management System</span>
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
                    {/*<FaChevronDown className={`mt-14 bouncy-button text-3xl text-white`}/>*/}
                    <button onClick={toggleActive} className="text-white bouncy-button mt-20 md:mt-22">
                        <FaChevronUp
                            className={`text-3xl transition-transform duration-500 ease-in-out ${isActive ? 'rotate-180 opacity-0' : ''}`}
                        />
                    </button>
                </div>
                {/* Footer Slide  */}
                
                <div className="relative h-5">
                    <div
                        className={`
                            w-full h-[400px] py-4 rounded-t-3xl bg-[#012424] transition-all duration-500 ease-in-out
                            overflow-hidden
                            ${isActive ? 'bg-mainColor -translate-y-[405px] opacity-100 max-h-[400px]' : 'translate-y-0 max-h-14'}
                        `}
                    >
                        <div className="w-full flex justify-center items-center">
                            <button onClick={toggleActive} className="text-white bouncy-button">
                                <FaChevronUp
                                    className={`text-3xl transition-transform duration-500 ease-in-out ${isActive ? 'rotate-180' : 'opacity-0'}`}
                                />
                            </button>
                        </div>
                        <div className={`text-center transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                            <p className='text-2xl text-white'>Developers</p>
                        </div>
                        
                        <div className={`w-full flex justify-center items-center transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="pt-5 py-5 h-[350px] overflow-y-auto w-[100%] md:w-[70%] md:h-[450px]">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                    <Developers />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                 {/*
                 <div className=' h-auto w-full'>
                    <div className="text-2xl py-2 text-white flex justify-center">Meet the Team</div>
                    <div className='flex w-full justify-evenly pt-5'>
                        <Developers/>
                    </div>
                 </div>
                  */}
            </div>
        </>
    );
}
