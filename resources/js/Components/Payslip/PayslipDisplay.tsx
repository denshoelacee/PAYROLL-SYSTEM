import React from 'react';

interface displayValueProps {
  label: string;
  value?: string | number | null;
}

const displayValue: React.FC<displayValueProps> = ({ label, value }) => {
  if (value === null || value === undefined || value === '') return null;

  return (
    <div className="flex justify-between">
      <p>{label}</p>
      <p className="text-right">{value}</p>
    </div>
  );
};

export default displayValue;
