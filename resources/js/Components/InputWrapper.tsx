import React from 'react';

type CardProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function InputWrapper({ className = '', children }: CardProps) {
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
      {children}
    </div>
  );
}
