import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import Card from '@/Components/Card';
import { GoPeople } from "react-icons/go";
export default function Dashboard({ auth}: PageProps) {
    return (
        
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="">
                    <Sidebar auth={auth}/>  
                <AdminLayout
                    title="Dashboard">
                    <div className="mb-8 bg-green-100 rounded-md bg-clip-padding bg-opacity-10 border border-button-border-color">
                        <div className="py-2 px-4 text-white space-y-1">
                            <p>Good to see you, {auth.user.last_name} </p>
                            <p className="text-sm text-gray-300">Role MotherFucker!</p>
                        </div>
                    </div>
                    <div className="flex w-full gap-4 flex-wrap">
                        <Card
                            className='p-4 text-white space-y-1 w-[40%] h-52  lg:w-[23%]'>
                            <div className="flex justify-between">
                                <p className='text-4xl pt-2 text-custom-word-color font-black'>150</p>
                                <div className='w-[3.2rem] h-[3.2rem] rounded-full p-3 bg-green-100 bg-clip-padding bg-opacity-[50%] border border-gray-100'>
                                    <GoPeople className='font-black text-2xl text-white'/>
                                </div>
                            </div>
                            <p>Total Employee:</p>
                        </Card>  
                        <Card
                            className='p-4 text-white space-y-1 w-[56%] lg:w-[23%]'>
                            <p>Densho</p>
                        </Card>  
                        <Card
                            className='p-4 text-white space-y-1 w-[56%] h-52 lg:w-[23%]'>
                            <p>Densho</p>
                        </Card>  
                        <Card
                            className='p-4 text-white space-y-1 w-[40%] lg:w-[23%]'>
                            <p>Densho</p>
                        </Card>
                    </div>  
                    
                </AdminLayout>
            </div>
        </AuthenticatedLayout>
    );
}
