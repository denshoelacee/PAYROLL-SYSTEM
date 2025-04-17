import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react';
import { CiUser } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";


import { useState } from 'react';
export default forwardRef(function TextInput(
    {   
        type = 'text', className = '', 
        isFocused = false,
        ...props }: InputHTMLAttributes<HTMLInputElement> 
        & { isFocused?: boolean },
        ref
    ) 
    {
    const isPassword = (type === "password" ? true : false);
    const isNumber = (type === "text-number" ? true : false);
    const [showPassword, setShowPassword] = useState(false);
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <>
            <div className="relative">
                <input
                {...props}
                type={isPassword ? (showPassword ? "text" : "password") : type}
                className={`py-2.5 rounded-xl shadow-sm focus:outline-none focus:ring-0 focus:border-transparent 
                ${isPassword || isNumber ? "pl-10" : "pl-5"} 
                ${className}`}

                ref={localRef}
                />
                    {isNumber && (
                    <div className="absolute top-3 left-3 text-emerald-700">
                        <CiUser
                        size={20}/>
                    </div>
                    )}
                    
                    {isPassword && (
                    <div>
                        <div className="absolute top-3 left-3 text-emerald-700">
                            <IoLockClosedOutline
                            size={20}/>
                        </div>
                        <button
                            type="button"
                            className="absolute right-1 top-2.5 -translate-y-1/2 text-gray-600 hover:text-black"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <div className="absolute top-0 right-1 text-emerald-700">
                            {showPassword ? (
                                <IoEyeOutline 
                                size={23}/>
                            ) : (
                                <IoEyeOffOutline 
                                size={23}/>
                            )}
                            </div>
                        </button>
                    </div>
                    )}
            </div>
        </>
    );
});
