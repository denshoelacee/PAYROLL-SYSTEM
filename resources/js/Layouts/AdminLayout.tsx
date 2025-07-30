import { InfoMessage } from '@/Components/Alert';

import { usePage } from '@inertiajs/react';
import React, { ReactNode, useEffect, useState } from 'react'
import { PropsWithChildren } from 'react';
import echo from '@/echo';
import NotificationSound from "../../sound/notification.mp3"


export default function AdminLayout({title, children}:PropsWithChildren ){
      const {message}:any = usePage().props;
      const [dismissed, setDismissed] = useState(true);
      const [notification, setNotification] = useState<string | null>(null);

      const hasMessages = message?.information || message?.error || message?.success;
      useEffect(() => {
        if (hasMessages) {
          setDismissed(true);
          const timer = setTimeout(() => {
            setDismissed(false);
          }, 2000);
          return () => clearTimeout(timer);
        }
      }, [message]);

//Toast
    useEffect(() => {
    const channel = echo.channel('hr.notifications')
      .listen('.user.created', (e: any) => {
        setNotification(`Hey! A new account is waiting for your approval!. Please take a look when you get a chance.`);
        new Audio(NotificationSound).play(); // Play sound

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });

    return () => {
      echo.leaveChannel('hr.notifications'); // cleanup
    };
  }, []);

  return (
    <>
    {hasMessages && dismissed &&
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
                {message.information && (
                    <InfoMessage severity="info" info={message.information} onClose={() => {
                        setDismissed(false)
                    }}/>  
                )}
                {message.error && (
                    <InfoMessage severity="error" info={message.error} onClose={() => {
                        setDismissed(false)
                    }}/>
                )}
                {message.success && (
                    <InfoMessage severity="success" info={message.success} onClose={() => {
                        setDismissed(false)
                    }}/>
                )}
            </div>
    }
    {notification && (
    <div className="fixed bottom-2 right-5 z-50 bg-gray-800 text-white px-4 py-5 rounded-lg shadow-lg animate-slide-in w-[400px] h-[115px]">
        <p>New Notification</p>
        {notification}
    </div>
    )}

    <div className="w-full mx-auto px-3 sm:px-5 md:pl-[150px] md:pr-[50px] lg:pl-[170px] lg:pr-[70px]">
        <p className='pb-3 text-3xl text-white font-black'>{title}</p>
            {children}           
    </div>
    </>
  )
}
