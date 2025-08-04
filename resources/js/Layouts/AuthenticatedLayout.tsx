import React, { PropsWithChildren, useEffect, useRef } from 'react';
import Dropdown from '@/Components/Dropdown';
import NotificationBell from '@/Components/NotificationBell';
import axios from 'axios';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import { User } from '@/types';
import { RiArrowDropDownLine, RiUserSettingsLine } from 'react-icons/ri';
import { TbLogout } from 'react-icons/tb';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import NotificationSound from '../../sound/notification.mp3';
import echo from '@/echo';

dayjs.extend(relativeTime);

interface Props extends PropsWithChildren {
  user: User;
  notifications: any[];
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function Authenticated({ user, children, notifications, setNotifications }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const autoCloseBell = useRef<HTMLDivElement>(null);

  const finalInitials = `${user.first_name?.[0]?.toUpperCase() ?? ''}${user.last_name?.[0]?.toUpperCase() ?? ''}`;
  const svg = createAvatar(initials, { seed: finalInitials, size: 35, radius: 50 }).toString();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (autoCloseBell.current && !autoCloseBell.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);


  
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
useEffect(() => {
  if (!user) return;

  const channel = echo.private(`App.Models.User.${user.user_id}`)
    .listen('.PayslipPublished', (e: any) => {

      setNotifications(prev => [
        ...prev,
        {
          id: `payslip_${Date.now()}`,
          data: {
            message: `Your payslip for ${formattedDate} is now available.` ,
          },
          created_at: new Date().toISOString(),
        }
      ]);

      new Audio(NotificationSound).play();
    });

  return () => {
    echo.leave(`private-App.Models.User.${user.user_id}`);
  };
}, [user.user_id]);

  return (
    <div className="min-h-screen bg-mainColor">
      <nav className="bg-mainColor px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end h-16">
          <div ref={autoCloseBell} className="pt-7">
            <button onClick={() => setIsOpen(v => !v)} className="hover:text-red-600">
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
          </div>

          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <Dropdown>
              <Dropdown.Trigger>
                {(open) => (
                  <button className="flex items-center text-white">
                    <div dangerouslySetInnerHTML={{ __html: svg }} style={{ width: 35, height: 35 }} />
                    <span className="ml-2">{user.last_name}</span>
                    <RiArrowDropDownLine className={`text-3xl ${open ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </Dropdown.Trigger>
              <Dropdown.Content align="right" contentClasses="bg-[#1B4D4D] w-40">
                <Dropdown.Link href={route('profile.edit')}>
                  <RiUserSettingsLine className="text-xl" />
                  Profile
                </Dropdown.Link>
                <Dropdown.Link href={route('logout')} method="post" as="button">
                  <TbLogout className="text-xl" />
                  Log Out
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}
