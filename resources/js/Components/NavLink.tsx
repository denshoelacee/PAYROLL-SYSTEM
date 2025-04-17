import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-3 py-2 rounded-lg  text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'bg-[#006654] hover:bg-[#006654]'
                    : ' hover:bg-[#006654] hover:border-[#006654]') +
                className
            }
        >
            {children}
        </Link>
    );
}
