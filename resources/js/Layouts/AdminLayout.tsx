import { usePage, router } from "@inertiajs/react";
import React, { PropsWithChildren, useEffect, useState } from "react";
import Authenticated from "./AuthenticatedLayout";
import Loader from "@/Components/Loader"; // 👈 loader
import { InfoMessage } from "@/Components/Alert";

export default function AdminLayout({ title, children }: PropsWithChildren) {
  const { auth, notif, message }: any = usePage().props;
  const [notifications, setNotifications] = useState<any[]>(notif || []);
  const [dismissed, setDismissed] = useState(true);
  const [loading, setLoading] = useState(true); 

  const hasMessages = message?.information || message?.error || message?.success;

  // Loader for SPA navigation
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleFinish = () => setLoading(false);

    router.on("start", handleStart);
    router.on("finish", handleFinish);
    router.on("error", handleFinish);

    // Cleanup
    return () => {
      router.on("start", handleStart);
      router.on("finish", handleFinish);
      router.on("error", handleFinish);
    };
  }, []);

  // Auto-hide loader after first mount (page reload)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300); // show loader for 300ms min
    return () => clearTimeout(timer);
  }, []);

  // Info message auto-dismiss
  useEffect(() => {
    if (hasMessages) {
      setDismissed(true);
      const timer = setTimeout(() => setDismissed(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      {loading && <Loader />} {/* ✅ overlay loader */}

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

      <Authenticated user={auth.user} notifications={notifications} setNotifications={setNotifications}>
        <div className="w-full mx-auto px-3 sm:px-5 md:pl-[150px] md:pr-[50px] lg:pl-[170px] lg:pr-[70px]">
          <p className="pb-3 text-2xl text-white font-black">{title}</p>
          {children}
        </div>
      </Authenticated>
    </>
  );
}