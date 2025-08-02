import React, { ReactNode } from 'react';

type CardProps = {
  className?: string;
  children?: React.ReactNode;
  data?: any
  label?: string
  icon?: ReactNode
  fontsize?:string
};

export default function CardWrapper({ className = '',children,data,label,icon,fontsize}: CardProps) {
  return (
    <div
      className={`border border-button-border-color rounded-lg ${className}`}
      style={{
        background: `linear-gradient(
          105.8deg,
          rgba(200, 237, 217, 0.22) 3.42%,
          rgba(177, 198, 186, 0.0484) 101.99%,
          rgba(115, 210, 159, 0) 134.85%
        )`,
      }}
    >
        <div className="">
          <div className={`flex justify-between`}>
            <div className="text-lg">
              <p className={`text-[25px] text-yellow-500 font-black`}>{data}</p>
              <p className={`${fontsize} text-white tracking-wider`}>{label}</p>
            </div>
              {icon}
          </div>
          {children}
        </div>
    </div>
  );
}
