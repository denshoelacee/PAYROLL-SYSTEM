// resources/js/Components/Dropdown.tsx

import {
    useState,
    createContext,
    useContext,
    Fragment,
    PropsWithChildren,
    Dispatch,
    SetStateAction,
    ReactNode,
} from 'react';
import { Link, InertiaLinkProps } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

const DropDownContext = createContext<{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    toggleOpen: () => void;
}>({
    open: false,
    setOpen: () => {},
    toggleOpen: () => {},
});

const Dropdown = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen(prev => !prev);

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

//  Updated Trigger to support children as a function
const Trigger = ({
    children,
}: {
    children: ReactNode | ((open: boolean) => ReactNode);
}) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div onClick={toggleOpen}>
                {typeof children === 'function' ? children(open) : children}
            </div>

            {open && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpen(false)}
                ></div>
            )}
        </>
    );
};

const Content = ({
    align = 'right',
    contentClasses,
    children,
}: PropsWithChildren<{
    align?: 'left' | 'right';
    contentClasses?: string;
}>) => {
    const { open, setOpen } = useContext(DropDownContext);

    let alignmentClasses = 'origin-top';
    if (align === 'left') {
        alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
    } else if (align === 'right') {
        alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
    }

    return (
        <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <div
                className={`absolute z-50 rounded-md shadow-lg ${alignmentClasses}`}
                onClick={() => setOpen(false)}
            >
                <div
                    className={`text-white bg-[#145858] p-2 rounded-md border border-button-border-color ${contentClasses}`}
                >
                    {children}
                </div>
            </div>
        </Transition>
    );
};

const DropdownLink = ({
    className = '',
    children,
    ...props
}: InertiaLinkProps & { children: ReactNode }) => {
    return (
       <Link
        {...props}
        className={`flex items-center gap-2  w-full px-4 py-2 rounded-lg text-md leading-5 text-white 
            transition-all duration-150 ease-in-out hover:bg-[#012424] ${className}`}
        >
         {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
