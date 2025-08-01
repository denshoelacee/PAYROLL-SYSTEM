import { useState, PropsWithChildren, ReactNode } from 'react';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { User } from '@/types';
import { RiArrowDropDownLine,RiUserSettingsLine } from 'react-icons/ri';
import { TbLogout } from "react-icons/tb";
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    function getInitals(firstName: string, lastName: string) {
        const firstInitial = firstName?.[0]?.toUpperCase() ?? '';
        const lastInitial = lastName?.[0]?.toUpperCase() ?? '';
        return `${firstInitial}${lastInitial}`;
    }

    const finalInitials = getInitals(user.first_name, user.last_name);

    const avatar = createAvatar(initials, {
        seed: finalInitials,
        size: 35,
        radius: 50,
        backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9'],
        textColor: ['black'],
    });

    const svg = avatar.toString();

    return (
        <div className="min-h-screen bg-mainColor">
            {/* PC SIZE */}
            <nav className="bg-mainColor">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-end h-16">
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="pt-10 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        {(open) => (
                                            <span className="inline-flex rounded-md w-40">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-2 py-1 border-transparent text-md font-medium rounded-md text-white focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    <div
                                                        style={{ width: 45, height: 35 }}
                                                        dangerouslySetInnerHTML={{ __html: svg }}
                                                    />
                                                    {user.last_name}
                                                    <RiArrowDropDownLine
                                                        className={`text-3xl transition-transform duration-500 ease-in-out ${
                                                            open ? 'rotate-180' : ''
                                                        }`}
                                                    />
                                                </button>
                                            </span>
                                        )}
                                    </Dropdown.Trigger>

                                    <Dropdown.Content align="right" contentClasses="bg-[#1B4D4D] w-40">
                                        <Dropdown.Link href={route('profile.edit')}><RiUserSettingsLine className='text-xl'/>
                                            Profile
                                            </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button"><TbLogout className='text-xl'/>
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown((previousState) => !previousState)
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Sidebar */}
                <div
                    className={
                        'inset-0 z-50 block fixed w-52 bg-red-500 transform transition-transform ease-in-out duration-300 sm:hidden ' +
                        (showingNavigationDropdown ? 'translate-x-0' : 'translate-x-[-300px]')
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('admin.dashboard')} active={route().current('admin.dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.employee')} active={route().current('admin.employee')}>
                            Employee
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.payroll')} active={route().current('admin.payroll')}>
                            Payroll
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-white">{user.last_name}</div>
                            <div className="font-medium text-sm text-white">{user.employee_id}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header */}
            {header && (
                <header className="bg-mainColor">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            {/* Page Content */}
            <main>{children}</main>
        </div>
    );
}
