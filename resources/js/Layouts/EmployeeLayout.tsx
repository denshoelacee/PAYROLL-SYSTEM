import { InfoMessage } from '@/Components/Alert';
import { usePage } from '@inertiajs/react';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import echo from '@/echo';
import NotificationSound from "../../sound/notification.mp3";
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import Authenticated from './AuthenticatedLayout';
import { User } from '@/types'; // 👈 Replace with your user type if needed

export default function EmployeeLayout({ title, children }: PropsWithChildren) {
  const { message, auth }: any = usePage().props;
  const [dismissed, setDismissed] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [avatarSvg, setAvatarSvg] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]); // ✅ shared state

  const hasMessages = message?.information || message?.error || message?.success;

  function getInitials(firstName: string, lastName: string) {
    const firstInitial = firstName?.[0]?.toUpperCase() ?? '';
    const lastInitial = lastName?.[0]?.toUpperCase() ?? '';
    return `${firstInitial}${lastInitial}`;
  }

  useEffect(() => {
    if (hasMessages) {
      setDismissed(true);
      const timer = setTimeout(() => {
        setDismissed(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  
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

      {/* Toast popup */}
      {notification && (
        <div className="fixed bottom-2 right-5 z-50 bg-gray-800 text-white px-4 py-5 rounded-lg shadow-lg animate-slide-in w-[400px] h-[115px]">
          <p className="text-sm text-gray-400 mb-1">New Notification</p>
          <div className="flex gap-4 items-center">
            {avatarSvg && (
              <div
                style={{ width: 50, height: 50 }}
                dangerouslySetInnerHTML={{ __html: avatarSvg }}
              />
            )}
            <div className="flex flex-col">
              <p className="font-semibold">{notification}</p>
              <p className="text-sm text-gray-300">Payslip is available.</p>
            </div>
          </div>
        </div>
      )}

      {/* Render Authenticated layout and pass props */}
      <Authenticated
        user={auth.user}
        notifications={notifications}
        setNotifications={setNotifications}
      >
        <div className="w-full mx-auto px-3 sm:px-5 md:pl-[150px] md:pr-[50px] lg:pl-[170px] lg:pr-[70px]">
          <p className='pb-3 text-3xl text-white font-black'>{title}</p>
          {children}
        </div>
      </Authenticated>
    </>
  );
}
