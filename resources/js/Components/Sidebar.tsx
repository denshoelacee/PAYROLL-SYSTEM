import React from 'react'
import {CtuLogo} from '@/Components/CtuLogo'
import { Link } from '@inertiajs/react'
import NavLink from '@/Components/NavLink'
import { FiGrid } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { BiCoinStack } from "react-icons/bi";
import { PageProps } from '@/types';
import { User } from '@/types';
import { PropsWithChildren, ReactNode } from 'react';

export default function Sidebar({ user }: PropsWithChildren<{user: User}>) {
  return (
    <div className="hidden md:block">
        <div className='fixed top-0 left-2 rounded-2xl w-[5em] max-h-screen h-[93%] mx-5 my-6 bg-green-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 flex flex-col justify-between '>
            {/*{user.role === 'admin' ? (
            <div className="p-2">
                <Link href='/' className='flex items-center justify-center'>
                    <CtuLogo className='p-1 w-20 h-15'/>
                </Link>

                <div className="flex flex-col items-center  justify-center gap-5 h-[500px]">
                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                        <FiGrid className='text-2xl text-white'/>
                    </NavLink>
                    <NavLink href={route('employee')} active={route().current('employee')} className='text-[#67CFD5] text-lg'>
                        <GoPeople className='font-black text-2xl text-white'/>
                    </NavLink>
                    <NavLink href={route('payroll')} active={route().current('payroll')} className='text-[#67CFD5] text-lg'>
                        <BiCoinStack className='font-black text-2xl text-white'/>
                    </NavLink>
                </div>
            </div>
            ) : (
                null
            )}*/}
            <div className="p-2">
                <Link href='/' className='flex items-center justify-center'>
                    <CtuLogo className='p-1 w-20 h-15'/>
                </Link>
                
                <div className="flex flex-col items-center  justify-center gap-5 h-[500px]">
                    <NavLink href={route('admin.dashboard')} active={route().current('admin.dashboard')}>
                        <FiGrid className='text-2xl text-white'/>
                    </NavLink>
                    <NavLink href={route('admin.employee')} active={route().current('admin.employee')} className='text-[#67CFD5] text-lg '>
                        <GoPeople className='font-black text-2xl text-white'/>
                    </NavLink>
                    <NavLink href={route('admin.payroll')} active={route().current('admin.payroll')} className='text-[#67CFD5] text-lg'>
                        <BiCoinStack className='font-black text-2xl text-white'/>
                    </NavLink>
                </div>
            </div>
        </div>
    </div>
  )
}
