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
    useMemo,
    Children,
    cloneElement,
    isValidElement,
    useRef,
    useLayoutEffect,
} from 'react';
import { Link, InertiaLinkProps } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
type ClickableElement = React.ReactElement<{
    onClick?: React.MouseEventHandler;
}>;

const DropDownContext = createContext<{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    toggleOpen: () => void;
    triggerRef: React.RefObject<HTMLDivElement>;
    onClick?: () => void
}>(null as any);

const Dropdown = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => setOpen(prev => !prev);

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen, triggerRef }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({
    children,
}: {
    children: ReactNode | ((open: boolean) => ReactNode);
}) => {
    const { open, setOpen, toggleOpen, triggerRef } = useContext(DropDownContext);
    const child = typeof children === 'function' ? children(open) : children;
    if (!isValidElement(child)) return null;
    return (
        <div ref={triggerRef} className="inline-block w-full">
            {cloneElement(child as any, {
                onClick: (e: any) => {
                    child.props.onClick?.(e);
                    toggleOpen();
                },
            })}

            {open && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpen(false)}
                />
            )}
        </div>
    );
};

const Content = ({
    align = 'right',
    contentClasses,
    children,
    ableSearch,
}: PropsWithChildren<{
    align?: 'left' | 'right';
    contentClasses?: string;
    ableSearch?: boolean;
}>) => {
    const { open, setOpen, triggerRef } = useContext(DropDownContext);
    const [search, setSearch] = useState('');
    const [width, setWidth] = useState<number>();

    useLayoutEffect(() => {
        if (triggerRef.current) {
            setWidth(triggerRef.current.offsetWidth);
        }
    }, [open]);

    let alignmentClasses = 'origin-top';
    if (align === 'left') {
        alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
    } else if (align === 'right') {
        alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
    }

    const filteredChildren = useMemo(() => {
        const processChild = (child: ReactNode) => {
            if (!isValidElement(child)) return child;

            const shouldInclude =
                !search.trim() ||
                (typeof child.props.children === 'string' &&
                    child.props.children
                        .toLowerCase()
                        .includes(search.toLowerCase()));

            if (!shouldInclude) return null;

            return cloneElement(child, {
                ...child.props,
                onClick: (e: any) => {
                    if (typeof child.props.onClick === 'function') {
                        child.props.onClick(e);
                    }
                    setOpen(false);
                },
            });
        };

        return Children.map(children, processChild);
    }, [children, search, setOpen]);


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
                style={{ width }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={`text-white bg-[#1B4D4E] p-2 rounded-md border border-button-border-color ${contentClasses}`}
                >
                    {ableSearch && (
                        <>
                            <input
                                type="text"
                                className="bg-transparent border-button-border-color w-full px-3 py-1 mb-2 text-white rounded focus:outline-none focus:border-white"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </>
                    )}
                    <div className="max-h-30 w-full overflow-auto">
                        {filteredChildren}
                    </div>
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
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg text-md leading-5 text-white 
                transition-all duration-150 ease-in-out hover:bg-mainColor ${className}`}
        >
            {children}
        </Link>
    );
};


Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
