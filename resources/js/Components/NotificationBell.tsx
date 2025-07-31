import React from "react";
import { GoBell } from "react-icons/go";

const NotificationBell = ({ count = 3 }) => {
  return (
    <div className="relative inline-block">
      {/* Bell Icon */}
      <div className="text-[#FFBB33] text-2xl">
        <GoBell />
      </div>

      {/* Notification Badge with optional pulse */}
      {count > 0 && (
        <div className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5">
          {/* Pulse animation behind the badge */}
          <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-red-400 opacity-75"></span>

          {/* Solid red badge with number */}
          <div className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">
            {count > 99 ? "99+" : count}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
