import { usePage } from '@inertiajs/react';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import echo from '@/echo';
import NotificationSound from '../../sound/notification.mp3';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import Authenticated from './AuthenticatedLayout';
import { InfoMessage } from '@/Components/Alert';

//@ts-ignore
export default function AdminLayout({ title, children }: PropsWithChildren) {

  const { auth, notif,message }: any = usePage().props;
  const [notifications, setNotifications] = useState<any[]>(notif || []);
  const [toastUser, setToastUser] = useState<string | null>(null);
  const [avatarSvg, setAvatarSvg] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(true);
  
  const getInitials = (first: string, last: string) =>
    `${first?.[0]?.toUpperCase() ?? ''}${last?.[0]?.toUpperCase() ?? ''}`;
  
  useEffect(() => {
    const channel = echo.channel('hr.notifications')
      .listen('.user.created', (e: any) => {
        const { first_name, last_name } = e.user;
        const fullName = `${last_name}, ${first_name}`;
        setNotifications(prev => [
          ...prev,
          {
            id: e.user.id + '_' + Date.now(),
            data: { user_id: e.user.id, full_name: fullName, message: 'registered! Needs approval.' },
          },
        ]);

        setToastUser(fullName);
        new Audio(NotificationSound).play();

        const seed = getInitials(first_name, last_name);
        const avatar = createAvatar(initials, { seed, size: 50, radius: 50 });
        setAvatarSvg(avatar.toString());

        setTimeout(() => {
          setToastUser(null);
          setAvatarSvg(null);
        }, 5000);
      });

    return () => {
      echo.leaveChannel('hr.notifications');
    };
  }, []);

  useEffect(() => {
      if (hasMessages) {
        setDismissed(true);
        const timer = setTimeout(() => {
          setDismissed(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [message]);
  
    const hasMessages = message?.information || message?.error || message?.success;


  return (
    <>
        {/* Show Inertia messages */}
          {hasMessages && dismissed && (
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
              {message.information && (
                <InfoMessage severity="info" info={message.information} onClose={() => setDismissed(false)} />
              )}
              {message.error && (
                <InfoMessage severity="error" info={message.error} onClose={() => setDismissed(false)} />
              )}
              {message.success && (
                <InfoMessage severity="success" info={message.success} onClose={() => setDismissed(false)} />
              )}
            </div>
          )}


      {toastUser && (
        <div className="fixed bottom-2 right-5 z-50 bg-gray-800 text-white px-4 py-5 rounded-lg shadow-lg animate-slide-in w-[400px] h-[115px]">
          <p className="text-sm text-gray-400 mb-1">New Notification</p>
          <div className="flex gap-4 items-center">
            {avatarSvg && <div dangerouslySetInnerHTML={{ __html: avatarSvg }} style={{ width: 50, height: 50 }} />}
            <div className="flex flex-col">
              <p className="font-semibold">{toastUser}</p>
              <p className="text-sm text-gray-300">registered! Needs approval.</p>
            </div>
          </div>
        </div>
      )}

      <Authenticated
        user={auth.user}
        notifications={notifications}
        setNotifications={setNotifications}
      >
        <div className="w-full mx-auto px-3 sm:px-5 md:pl-[150px] md:pr-[50px] lg:pl-[170px] lg:pr-[70px]">
          <p className="pb-3 text-3xl text-white font-black">{title}</p>
          {children}
        </div>
      </Authenticated>
    </>
  );
}
