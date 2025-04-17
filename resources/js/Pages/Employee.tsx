import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';4
import Sidebar from '@/Components/Sidebar';
export default function Employee({ auth}: PageProps) {
    return (
        
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Employee" />
            <div className="">
                <div className="">
                    <Sidebar/>
                </div>
                <div className="">
                    <div className="w-full mx-auto px-3 sm:px-5 md:pl-[150px] md:pr-[50px] lg:pl-[170px] lg:pr-[70px]">
                    <p className='pb-3 mb-3 text-3xl mt-5 text-white font-black'>Employee</p>
                    <div className="bg-green-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
                            <div className="p-4 text-white space-y-1">
                                <p>Good to see you, {auth.user.name}</p>
                                <p className="text-sm text-gray-300">Role MotherFucker!</p>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
