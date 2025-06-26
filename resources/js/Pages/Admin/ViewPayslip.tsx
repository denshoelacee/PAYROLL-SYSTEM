import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import { CtuLogo } from '@/Components/CtuLogo';

export default function Payslip({ auth}: PageProps) {
    return (
        
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="">
                    <Sidebar auth={auth}/>  
                <AdminLayout
                    title="Payslip">
                    {/* <div className="mb-8 bg-green-100 rounded-md bg-clip-padding bg-opacity-10 border border-button-border-color">
                        <div className="py-2 px-4 text-white space-y-1">
                            <p>Good to see you, {auth.user.last_name} </p>
                            <p className="text-sm text-gray-300">Role MotherFucker!</p>
                        </div>
                    </div>
                    */}
                    <div className="bg-[#16423C] flex w-full gap-4 px-3 flex-wrap max-w-6xl border rounded-md">
                        <p className='justify-center flex w-full text-white text-lg py-2'>Employee Payslip</p>
                        <div className='flex justify-between w-full px-5'>
                            <div className='flex flex-col'>
                                <div className="flex place-items-center">
                                    <CtuLogo className='w-14'/>
                                    <p className='px-3 text-white'>CTU - DANAO</p>
                                </div>
                                <div className="flex-col text-gray-400 ">
                                    <p className=''>Sabang, Danao City, 6004</p>
                                    <p className=''>accountingdanao@ctu.edu.ph</p>
                                    <p className=''>(032) 354-3660</p>
                                </div>
                            </div> 
                            <div className='px-1'>
                                <p className='text-white'>PAYSLIP#OTEN3221838</p>
                                <p className='text-gray-400'>Date: April 1-30, 2025</p>
                            </div>
                        </div>
                        <p className='w-full border mx-5 border-gray-200'></p>
                        <div className="px-5 text-gray-500">
                            <p className='text-lg text-white'>Billing Address</p>
                            <p className='text-white text-lg'>Aaron Gabriel Fulgar</p>
                            <p>Designation: Admin Aide </p>
                            <p>Department: DAN-AD</p>
                        </div>
                        <p className='w-full border mx-5 border-gray-200'></p>
                        <div className='mx-5 w-full h-12 rounded-lg'>
                            <p className='border text-white'>Earning</p>
                        </div>
                    </div>  
                    
                </AdminLayout>
            </div>
        </AuthenticatedLayout>
    );
}
