import React from 'react'

type CardProps = {
    className?: string;
    children?: React.ReactNode;
    }

export default function Card({ className = '', children}: CardProps) {
  return (
    <div className={`bg-green-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-button-border-color ${className}`}>
        {children}
    </div>
  )
}
