import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NotificationBell from '@/Components/NotificationBell';
import axios from 'axios';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import { PageProps, User } from '@/types';
import { RiArrowDropDownLine, RiUserSettingsLine } from 'react-icons/ri';
import { TbLogout } from 'react-icons/tb';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import NotificationSound from '../../sound/notification.mp3';
import echo from '@/echo';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { GoPeople } from 'react-icons/go';
import { FiGrid } from 'react-icons/fi';
dayjs.extend(relativeTime);

interface Props extends PropsWithChildren {
  user: User;
  notifications: any[];
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function Authenticated({user, children, notifications, setNotifications }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const autoCloseBell = useRef<HTMLDivElement>(null);
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
//   const [toastUser, setToastUser] = useState<string | null>(null);
//   const sortedNotifications = [...notifications].sort((a, b) =>
//     dayjs(b.created_at).diff(dayjs(a.created_at))
//   );

  const finalInitials = `${user.first_name?.[0]?.toUpperCase() ?? ''}${user.last_name?.[0]?.toUpperCase() ?? ''}`;
  const svg = createAvatar(initials, { seed: finalInitials, size: 35, radius: 50 }).toString();

//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (autoCloseBell.current && !autoCloseBell.current.contains(e.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handler);
//     return () => document.removeEventListener('mousedown', handler);
//   }, []);

    // const notifHandler = () => {
    //     setIsOpen(prev => !prev);
    //     };

    // const now = new Date();
    // const formattedDate = now.toLocaleDateString('en-US', {
    //     month: 'long',
    //     year: 'numeric',
    // });
    // if(user.role){
    //     useEffect(() => {
    //     if (!user) return;

    //         const channel = echo.private(`App.Models.User.${user.user_id}`)
    //         .listen('.PayslipPublished', (e: any) => {
    //         setToastUser(`${user.last_name}, ${user.first_name}`);

    //         setNotifications(prev => [
    //             ...prev,
    //             {
    //             id: `payslip_${Date.now()}`,
    //             data: {
    //                 message: `Your payslip for ${formattedDate} is now available.` ,
    //             },
    //             created_at: new Date().toISOString(),
    //             }
    //         ]);

    //         new Audio(NotificationSound).play();
    //         });
    //         setTimeout(() => {
    //         setToastUser(null);
    //     }, 5000);
    //     return () => {
    //         echo.leave(`private-App.Models.User.${user.user_id}`);
    //     };
    //     }, [user.user_id]);
    // }

    return (
        <div className="min-h-screen bg-mainColor">
            <nav className="bg-mainColor px-4 sm:px-6 lg:px-8">
                <div className="flex justify-end h-16">
                    {/*<div ref={autoCloseBell} className="pt-7 hidden sm:flex sm:items-center sm:ms-6">
                        {/* <button
                            onClick={notifHandler}
                            className="hover:text-red-600 hover:rounded-full pt-3 transition duration-150"
                        >
                            <NotificationBell count={notifications.length} />
                        </button> */}

                        {/* Notification Stack */}
                        {/* {isOpen && (
                            <div className="absolute top-16 right-10 md:right-52 w-80 bg-[#1B4D4E] rounded-lg shadow-lg z-50 animate-fade-in">
                            <div className="p-4 border-b font-bold text-white">Notifications</div>
                            <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                                {sortedNotifications.length > 0 ? (
                                sortedNotifications.map((notif) => (
                                    <li key={notif.id} className="p-3 text-sm text-white hover:bg-gray-300 hover:text-black flex justify-between items-center">
                                    <div className="flex flex-col pr-5 hover:text-black">
                                        <span>
                                        <strong>{notif.data?.full_name}</strong> {notif.data?.message}
                                        </span>
                                        {notif.data?.month && (
                                        <span>
                                            Your payslip for <strong>{notif.data.month}</strong> is now available.
                                        </span>
                                        
                                        )}
                                        <p className="text-xs">{dayjs(notif.created_at).fromNow()}</p>
                                    </div>
                                    <button
                                        className="ml-2 text-xs bg-green-600 px-2 py-1 rounded text-white hover:bg-green-700"
                                        onClick={() => router.visit(route('admin.employee'))}
                                    >
                                        View
                                    </button>
                                    </li>
                                ))
                                ) : (
                                <li className="p-3 text-sm text-white">No notifications</li>
                                )}
                                </ul>
                        </div>
                        )} 
                    </div>*/}
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
                    <div className="w-full justify-between mt-5 flex items-center sm:hidden ">
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
                        {/* <div ref={autoCloseBell} className="flex items-center sm:hidden space-x-4 relative">
                            <button
                                onClick={notifHandler}
                                className="hover:text-red-600 hover:rounded-full pt-3 transition duration-150"
                            >
                                <NotificationBell count={notifications.length} />
                            </button>
                            {isOpen && (
                            <div className="absolute top-16 right-10 md:right-52 w-80 bg-[#1B4D4E] rounded-lg shadow-lg z-50 animate-fade-in">
                                <div className="p-4 border-b font-bold text-white">Notifications</div>
                                <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                                    {notifications.length > 0 ? notifications.map((notif) => (
                                        <li key={notif.id} className="p-3 text-sm text-white hover:bg-gray-300 hover:text-black flex justify-between items-center">
                                        <div className="flex flex-col pr-5 hover:text-black">
                                            <span>
                                            <strong>{notif.data?.full_name}</strong> {notif.data?.message}   
                                            </span>
                                            {notif.data?.month && (
                                            <span>
                                                Your payslip for <strong>{notif.data.month}</strong> is now available.
                                            </span>
                                            )}
                                        <div className="text-xs text-gray-200">{dayjs(notif.created_at).fromNow()}</div>    
                                        </div>
                                        <button
                                            className="ml-2 text-xs bg-green-600 px-2 py-1 rounded text-white hover:bg-green-700"
                                            onClick={() => router.visit(route('admin.employee'))}
                                        >
                                            View
                                        </button>
                                        </li>
                                    )) : (
                                        <li className="p-3 text-sm text-white">No notifications</li>
                                    )}
                                    </ul>
                            </div>
                            )}
                        </div> */}
                    </div>
                </div>
                
                {/* Mobile Sidebar */}
                {user.role === 'Admin' ? 
                (<div
                    className={
                        'inset-0 z-50 block fixed w-52 bg-mainColor transform transition-transform ease-in-out duration-300 sm:hidden ' +
                        (showingNavigationDropdown ? 'translate-x-0' : 'translate-x-[-500px]')
                    }
                >
                    <div className="flex justify-end p-2 border-b border-gray-700">
                        <button
                        onClick={() => setShowingNavigationDropdown(false)}
                        className="text-white text-2xl hover:text-red-500"
                        aria-label="Close menu"
                        >
                        X
                        </button>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('admin.dashboard')} active={route().current('admin.dashboard')}>
                        <FiGrid className={`text-2xl 
                            ${route().current('admin.dashboard') ? 'bg-white text-white' : 'text-white'} rounded p-1`}
                            />                            
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.employee')} active={route().current('admin.employee')}>
                        <GoPeople className={`text-2xl 
                            ${route().current('admin.employee') ? 'bg-white text-white' : 'text-white'} rounded p-1`}
                        />          
                            Employee
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.payroll')} active={route().current('admin.payroll')}>
                            <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEdElEQVR4nO2be6gVRRzHP95bFlZWUNGDHkSplRKVRS9MwYgS0goKepAhZEFEYSFIcaEiTmB/FVjcKCEI7EFQGHKT8kKhlH+IZkJ4sizt9qRSb2rpiR98L8wdds+55+7s2d3jfOHH2TMzOzP7mZ3fzM7OQlRUVFTUEa+LgeeAQWAn8DuwDVgDPA6c04lKnApcA8wt0G4GPgAajv0H/OGFHQRWAKflAeIqtcRhr9AirQ4sAaYAvarnROAy4BngV6X7AbgiJIz5wP4mFbOWeA14NWfb6twNy3Txrs70/p+o8+ycvcDlIWCcAewZQ2tZS+WpaarHv8CtCfFXKu6EhLgnVUfzM6dkrcizY7x9h4Ae8tM6lfOYF25lLgTWKv5jYDkw00vXr/iXslZksI0+fQn5aJby3+RBnwC879Vhv3M3uDpJo9AB4KwslfmqDSCzE84/Gzi/DTs9IY8Vyv9eL/wGhX8I3Klj6+IzUhrneaV5JAuQrW0AmZPSd9sxG8UWePnU5R+slV0t0jmPqjEamhY0GylHABYC5FrgI/Xrsdpq4EInjx7B+C6hbhcB/8g+UR3ObXItk5Rmc1FAQuhk5b0xJd4maTucOpiPeA+4ICX9Xg0AlQXSqzuk3iLNw85kbcSpGkxXx6pLfltlIKbv1fLHkS7XhyzX8e1emksVPkAGrc0A5LYWM9xmNgzMUz6vK+wOL397Rrlbk60RIDZKvaljG65dPaXwp7MAuScDkFm6w+rjsC3OBc1T/p95+S9R+CHgZx3/pd9PvTmLOdRdSmvPPpm0ENjQpPJ/59xlbAL2pcq4zwmfqAZ7C/hG8Z8DS4FjvDxqin+XDqg/ZyCm6/QQOazlBxKG+MMJcxUEzeL+7NQaSX8HgOCMJAblft057khjEy9XRwN96iYHHZ9UGJA5wNfj9CGuvePk+ZAuzspbD9wFTE5wtg863WhPyhNyx4HMB/aNc5RxbaPnIK+WTxuJN0A/6uFvt+4I93x/dOqaLuPKustNWgDa7gzv+zRCvahHAQu7kSMASJKOT3lKLhWQyVrPzNOmpyxOlQ7IFOC3AD5kLLYmAUrpgPS1uAh7h/J2ANup/GzdtdRAXmgBxGaPIbRK+fmvGiIQRisCYbQiECoOZFtgp1p5II3AVnkgKwNNzAa6BUgtUPld40NqgcqPQLoVyCttvvdNs9XdAqQRRxlG2Y423/um2VC3AKkFKr9rfEgtUPkRiKcIpKpA+loA2RRou2a9KitmU7XRrRND7kAV1lTRu9bZOW/1nunsZC49kCIVgVQNyFHAYuCNQCtlrWy76jXohK3SftWpRQOZoC2ajZLYcOgvJNoFcn0JIPhm2zcLA/JACQD4tqVIIItKAMA32xCYqze/pUmaxSUAkDRTzkXLVID9punlEgDwzb7by0UztMtvKOWLpWny6o2SmXXj3LTSeRs3V3tIe7W9encJLt63zQnf7AXVJG+ecUCfbTRKaNZo59EB9WiTrO2P/0nf0ZbFfgG+AJ5Q40VFRUVF0SH9DxhHHSakLcUoAAAAAElFTkSuQmCC" alt="external-Payroll-budget-smashingstocks-mixed-smashing-stocks" // your full base64 here
                            style={{ filter: 'invert(1) brightness(2)' }}
                            className="w-6 h-6"
                            />
                            Payroll
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.payroll.summary')} active={route().current('admin.payroll.summary')} >
                            <img 
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFE0lEQVR4nO2ceagVdRTHxy2xQn3tlq1aEGTweiYuZdlCKlFJGVZUGFEuBOlrF1tosYUCW15FWUhqZBvVH21WSIVWUlEQSRupyCPNbIGyl33ivHsGTj/mN829d+bemel+4Qfvnvnd38z5vJnfcs5vbhC0lEzAQOB04B5gGbCyQOVpYDFwATAkDRjnAxsph34GrgP61QrjbsqpV4BdqoUxl3Lr0Wpg7K23V9k1PimQa/l/aFlSIG/FNLIN6AQuBNbF1PsDeA94M4PyDrA9BSBbkgL5KqaRc029PYBfPPXGBRkKGAZsTQHK7klO1h3TwEin7mcRdX7NEoY59+oUgAyrF8hCU68d+NNT7xpg14xA9AfOjDl3Q4GIXgeekjuB4isVIGVSC4ijFhBHLSD1ALkKuKykZXstQPYNSipgcwuIUQuIoxaQIgAB+gEnALcAT2gM9AFgnrtmKjUQYAAwx1yUTxI+mFBqIFSW7WupTotrDgznGQiwP/C9x2lZud4fA2U50Kc0QKjkdj6McXgDMEIjcj4tKBOQeR4nJcA00f73gf2Amz1hyUMLD4TK3bElwkG5G/YBTgSe0zvkEx1xnvQAXFIGIFM9zkmasa/GZX8EjvTUcyEOKDqQ+zzOvaTH360CiGhs0YE8q+39DdwAPGxGlt7+AzgeGA585zj/m85ZXo6K/BcVyCptb7M6L5nBUD26o2CqqX8ssEaPv602ARfq8qIDWWGceVFnoK7kkRmpd9NYYCjwE7ATWAp8YeqeVXQgt0UAiAIS9iEb9HuSoYvSqKIDGedxrFvTpj0OkC4dfdz+pBdWGjPWZgPpC6yPcG6lJp3agDHAbgpF6t/qgXh7WWaq53gc3KrzEcn07QksAj6PqTtU2zsKeEjTmetqKGHW7yM9/xmNBtJHF2g+yeTsmJjjMmRPM9u80khjunos8nHMcLU7SIbRmAvqiYHRqW0cDPyu9iXAKUBHHWWC7juT+Y7o4oYBMcGhLnUyiWToPdt8XyZ2oueNbYj2Q7WU3jgLcKm2uzpoRggRGK2b33Z4QPwA3Cv9ivM9ua1Fs/SzdMz1SHZYDgYO0s+bmgIklF7MFE0eXQ1cpBOzyAiZroRFM/Xzf4Uhk+ho8VX/7i5U1J0WkJIAofIozMwgJ/t+UYEsJFuFQHyTuKSSxeOBjQAyAnhQdgynXL50gBymQ2atd9xEbaccfUhaKhUQKhO98HWQTpMDWmHsU9R+svPqyCGpA6GyTmlrUFkeAeQv0yd8oDYJSVrdpXY3vTE5CyCP03jlGsj1mnfZ1oCyIwLIx8A3WpaqTeIqXxv7HLVfYmxyvD0JkPV68IggZ2pWp/qaHpwRFKNTPQmYrqXdZAunGfsBZvfBZA0bSBmUBMgVNgVQACA2jrJWbcc5fcWdar/RsZ+WBMhgk4udHeQfSLadqlaYoUGcnUp1YJBfIDacuEZt4x3HF3mWFKcmAmK2MAgQ0SbgEbU1c8PtvxZ3ep0dpk84XG39dVdBaN9L7W3GNil8OzMRENNhfUr+1LhRxjMT7QCu1Ex+2gu2mhd3en3fmnnKC2obpWmL0D5f7bONTZJjY6oGkic1rVPNq1pAHOljI5prbHeYR2qWcbDL2CeZ+Ulok30qw01cRbQxKJKA+Xrhq1LepimvwojeCIokKpv0wnddXtW47fQ6ynm6nTyc7fpzvHmVTKYy+G0CmYTeFBRVVBZpCzRgVM8PrjyjPxQzutk+BXnXP3jaN7yxnA3mAAAAAElFTkSuQmCC" alt="external-Payroll-audit-smashingstocks-mixed-smashing-stocks"
                            className='w-6 h-6'
                            />
                            Reports
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.department')} active={route().current('admin.department')}>
                            <img 
                            className="w-6 h-6 "
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACyElEQVR4nO2YO2hUQRSGRyFoCoOKpEkEDYrgC7GKtQ/YjUK0EoyldgpCJE2QGEwaSSGIVQot1Eob4xNjoYWNWGih8VH6wMJH4gvFfDLuuXAye3fu5u7u3VnZHy67zP3/c+bMzD1zZoxp4j8FsAZ4AcwAk0CPaSQA/RRj2DTYDEzFBJE3gXe63/6qtg5gQgVw14QKCmveYsppX6kC+GJCBTCtOtrZiAFMqo7aZdMpz/W6LSFgG3BT0qGLH8CI4vaQjJzij4oNF3YmbwDdlXZ+H/AroUMzjmbYwz2peAtKDIqG9b03beeXAZ8SHMyZAaXN26UiIzkt/3MxvJESM6DxEViaJoCDysgT/VHWGhS+m6fK/4E0RgaVgaJRrjUozE6EwTQGhpSBoTL4uyULffUsh7LrIubpvyIDwCnmD29dlFkAMvJpkQ8hgHvO5tWR8HHa/J64qZFhALHlg4dfVllBhgG8V7y+MuxuVfwPIQQwrnizUnb0ARuAthh+TvHHQwigHXiGvxw4q/gLgePAad8Om3UaXQFcBP6UCOI30FIr/1UzAKwDTkhmegf8lFpnLAv/1TVQIahCAAPKwEBNellL/0AX8EqeLpMxqLP/MACsAjYCSxpKD/QCL9UatNnkArA8eD2wX3bUODwGFgerB1okf0ewZ+LnjsEjoeqNrLcIb6KtXrb+CFc8elv/RHibtd4AuxTxlmrvVu0PPfqdinc7a70BViviNzFoDyGXVPv5hKwR4XvW+n8AHuHHHhOw3gCbnEOKxjmvOAC9kdL4aozYXpf0Bq0H1jppLA5jQeqBVuC1Is7KSeu+PXw7Rg6HpjfAMUX4DOxQ79qAy+q9HaXWkPQGeKAIh2ICXOSM0PaQ9EausaOpay+aogLnjDJwNCS9Aa7JiztxYuFskYssW6Osd95N1FNvpJDanHR7IFM5d/0FoG+iCZMOfwHdI6EQg62yLQAAAABJRU5ErkJggg==" alt="organization-chart-people"
                            />
                            Hr Configuration
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
                </div>)
                :
                (
                    <div
                    className={
                        'inset-0 z-50 block fixed w-52 bg-mainColor transform transition-transform ease-in-out duration-300 sm:hidden ' +
                        (showingNavigationDropdown ? 'translate-x-0' : 'translate-x-[-500px]')
                    }
                >
                    <div className="flex justify-end p-2 border-b border-gray-700">
                        <button
                        onClick={() => setShowingNavigationDropdown(false)}
                        className="text-white text-2xl hover:text-red-500"
                        aria-label="Close menu"
                        >
                        X
                        </button>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('employee.dashboard')} active={route().current('employee.dashboard')}>
                        <FiGrid className={`text-2xl 
                            ${route().current('employee.dashboard') ? 'bg-white text-black' : 'text-white'} rounded p-1`}
                            />                            
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('employee.payslip.summary')} active={route().current('employee.payslip.summary')}>
                            <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEdElEQVR4nO2be6gVRRzHP95bFlZWUNGDHkSplRKVRS9MwYgS0goKepAhZEFEYSFIcaEiTmB/FVjcKCEI7EFQGHKT8kKhlH+IZkJ4sizt9qRSb2rpiR98L8wdds+55+7s2d3jfOHH2TMzOzP7mZ3fzM7OQlRUVFTUEa+LgeeAQWAn8DuwDVgDPA6c04lKnApcA8wt0G4GPgAajv0H/OGFHQRWAKflAeIqtcRhr9AirQ4sAaYAvarnROAy4BngV6X7AbgiJIz5wP4mFbOWeA14NWfb6twNy3Txrs70/p+o8+ycvcDlIWCcAewZQ2tZS+WpaarHv8CtCfFXKu6EhLgnVUfzM6dkrcizY7x9h4Ae8tM6lfOYF25lLgTWKv5jYDkw00vXr/iXslZksI0+fQn5aJby3+RBnwC879Vhv3M3uDpJo9AB4KwslfmqDSCzE84/Gzi/DTs9IY8Vyv9eL/wGhX8I3Klj6+IzUhrneaV5JAuQrW0AmZPSd9sxG8UWePnU5R+slV0t0jmPqjEamhY0GylHABYC5FrgI/Xrsdpq4EInjx7B+C6hbhcB/8g+UR3ObXItk5Rmc1FAQuhk5b0xJd4maTucOpiPeA+4ICX9Xg0AlQXSqzuk3iLNw85kbcSpGkxXx6pLfltlIKbv1fLHkS7XhyzX8e1emksVPkAGrc0A5LYWM9xmNgzMUz6vK+wOL397Rrlbk60RIDZKvaljG65dPaXwp7MAuScDkFm6w+rjsC3OBc1T/p95+S9R+CHgZx3/pd9PvTmLOdRdSmvPPpm0ENjQpPJ/59xlbAL2pcq4zwmfqAZ7C/hG8Z8DS4FjvDxqin+XDqg/ZyCm6/QQOazlBxKG+MMJcxUEzeL+7NQaSX8HgOCMJAblft057khjEy9XRwN96iYHHZ9UGJA5wNfj9CGuvePk+ZAuzspbD9wFTE5wtg863WhPyhNyx4HMB/aNc5RxbaPnIK+WTxuJN0A/6uFvt+4I93x/dOqaLuPKustNWgDa7gzv+zRCvahHAQu7kSMASJKOT3lKLhWQyVrPzNOmpyxOlQ7IFOC3AD5kLLYmAUrpgPS1uAh7h/J2ANup/GzdtdRAXmgBxGaPIbRK+fmvGiIQRisCYbQiECoOZFtgp1p5II3AVnkgKwNNzAa6BUgtUPld40NqgcqPQLoVyCttvvdNs9XdAqQRRxlG2Y423/um2VC3AKkFKr9rfEgtUPkRiKcIpKpA+loA2RRou2a9KitmU7XRrRND7kAV1lTRu9bZOW/1nunsZC49kCIVgVQNyFHAYuCNQCtlrWy76jXohK3SftWpRQOZoC2ajZLYcOgvJNoFcn0JIPhm2zcLA/JACQD4tqVIIItKAMA32xCYqze/pUmaxSUAkDRTzkXLVID9punlEgDwzb7by0UztMtvKOWLpWny6o2SmXXj3LTSeRs3V3tIe7W9encJLt63zQnf7AXVJG+ecUCfbTRKaNZo59EB9WiTrO2P/0nf0ZbFfgG+AJ5Q40VFRUVF0SH9DxhHHSakLcUoAAAAAElFTkSuQmCC" alt="external-Payroll-budget-smashingstocks-mixed-smashing-stocks" // your full base64 here
                            style={{ filter: 'invert(1) brightness(2)' }}
                            className="w-6 h-6"
                            />
                            Payslip
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
                )}
            </nav>
            {/* {user.role === 'User' && toastUser && (
                <div className="fixed bottom-2 right-5 z-50 bg-gray-800 text-white px-4 py-5 rounded-lg shadow-lg animate-slide-in w-[400px] h-[115px]">
                    <p className="text-sm text-gray-200 mb-1">Heads up, {toastUser}!</p>
                    <div className="flex gap-4 items-center">
                        <div className="flex flex-col">
                            <p className="font-semibold">{toastUser}, your latest payslip is ready!</p>
                            <p className="text-sm text-gray-100">You can view and download it anytime.</p>
                        </div>
                    </div>
                </div>
            )} */}
        <main>{children}</main>
        </div>
    );
}

