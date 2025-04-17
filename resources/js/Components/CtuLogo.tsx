import React from 'react';
import CTULOGO from '/resources/images/CTULOGO.png';

type CtuLogoProps = {
  className?: string;
};

export function CtuLogo({ className = '' }: CtuLogoProps) {
  return (
    <div>
      <img src={CTULOGO} alt="CTU Logo" className={`${className}`} />
    </div>
  );
}
