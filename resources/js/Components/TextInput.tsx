import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    InputHTMLAttributes,
    useState,
} from 'react';
import { CiUser } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline, IoLockClosedOutline } from "react-icons/io5";

    export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',         
        isFocused = false,
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
    ref
    ) {
        const isPassword = type === "password";
        const showUserIcon = props.name === 'employee_id';
        const [showPassword, setShowPassword] = useState(false);
        const localRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
        }));

        useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
        }, [isFocused]);

        return (
        <div className=" w-full flex items-center rounded-xl pl-3 pr-3 border border-button-border-color focus:border-gray-100">
            {showUserIcon  ?  (
            <div className="text-emerald-700">
                <CiUser size={20} />
            </div>
            ) :
            (null)}
    
            {isPassword && (
            <div className=" text-emerald-700">
                <IoLockClosedOutline size={20} />
            </div>
            )}
    
            <input
            {...props}
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            className={`
                w-full py-1.5 pl-${isPassword ? '3' : '3'} pr-10 
                rounded-xl outline-none border-none shadow-sm 
                focus:ring-0 focus:border-transparent ${className}
            `}
            ref={localRef}
            />
    
            {isPassword && (
            <button
                type="button"
                className=" text-emerald-700"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <IoEyeOutline size={23} /> : <IoEyeOffOutline size={23} />}
            </button>
            )}
        </div>
        );
    });
    