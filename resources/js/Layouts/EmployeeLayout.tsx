
export default function EmployeeLayout({title, children }: React.PropsWithChildren) {
    return (
        <div className="w-full mx-auto px-3 sm:px-5 md:pl-[150px] md:pr-[50px] lg:pl-[170px] lg:pr-[70px]">
            <p className='pb-3 text-3xl text-white font-black'>{title}</p>
            {children}
        </div>
    );
}