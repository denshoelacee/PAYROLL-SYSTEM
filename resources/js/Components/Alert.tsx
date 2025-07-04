import { Alert, AlertTitle } from '@mui/material';
import { IoMdClose } from 'react-icons/io';
import { ReactNode } from 'react';

type InfoMessageProps = {
    info: string | ReactNode;           
    title?: string | ReactNode;          
    severity?: 'info' | 'error' | 'success';
    className?: string;
    onClose: () => void;
    backdrop?: boolean;
};

export function InfoMessage({
    info,
    title,
    severity = 'info',
    className = '',
    onClose,
    backdrop = true,
    }: InfoMessageProps) {
    const config = {
        info: {
        bg: 'rgb(184, 231, 251)',
        color: '#29b6f6',
        defaultTitle: 'Heads Up!',
        },
        success: {
        bg: 'rgb(200, 230, 201)',
        color: '#4caf50',
        defaultTitle: 'Success!',
        },
        error: {
        bg: 'rgb(255, 205, 210)',
        color: '#e53935',
        defaultTitle: 'Error',
        },
    };

    const current = config[severity];

    return (
        <>
        {backdrop && <div className="absolute inset-0 backdrop-blur-sm z-0" />}

        <div className="max-w-xl">
            <div className={`relative z-10 w-full  md:h-auto p-2 ${className}`}>
            <Alert
                className="w-full"
                severity={severity}
                sx={{
                    backgroundColor: current.bg,
                    color: current.color,
                    fontWeight: 400,
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    '& .MuiAlert-icon': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'between',
                    },
                    '& svg': {
                    width: 34,
                    height: 25,
                    },
                }}
                >
                <div className="flex w-full items-start">
                    <div className="pr-2 w-full">
                    {title && (
                        <AlertTitle
                        sx={{
                            fontWeight: 600,
                            fontSize: 19,
                        }}
                        >
                        {title ?? current.defaultTitle}
                        </AlertTitle>
                    )}
                    {info}
                    </div>
                    <div className="flex justify-end ">
                        <button
                    onClick={onClose}
                    className="h-10 p-2"
                    aria-label="Close Message"
                    >
                        <IoMdClose color={current.color} size={24} />
                    </button>
                    </div>
                </div>
            </Alert>
        </div>
        </div>
        </>
    );
}
