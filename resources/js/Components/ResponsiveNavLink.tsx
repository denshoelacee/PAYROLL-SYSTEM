import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${
                active
                    ? 'bg-white text-black border-yellow-500'
                    : 'border-transparent text-white'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
