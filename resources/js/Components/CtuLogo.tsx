import React from 'react';
import CTULOGO from '/resources/images/CTULOGO.png';
import CTUBG from '/resources/images/asdd.png';

type CtuLogoProps = {
  className?: string;
};

export function CtuLogo({ className = '' }: CtuLogoProps) {
  return (
    <div className='w-auto'>
      <img src={CTUBG} alt="CTU Logo" className={`${className}`} />
    </div>
  );
}
