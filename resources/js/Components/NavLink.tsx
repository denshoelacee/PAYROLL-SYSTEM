import { Link, InertiaLinkProps } from '@inertiajs/react';

interface NavLinkProps extends Omit<InertiaLinkProps, 'as'> {
  active?: boolean;
}

export default function NavLink({ active = false, className = '', children, href, title }: NavLinkProps) {
  return (
    <Link
      href={href}
      title={title}
      className={
        'inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition duration-300 ease-in-out ' +
        (active
          ? 'bg-[#006654] hover:bg-[#006654]'
          : 'hover:bg-[#006654] hover:border-[#006654]') +
        ' ' + className
      }
    >
      {children}
    </Link>
  );
}