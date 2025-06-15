import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import Card  from '@/Components/Card';
export default function Payroll({ auth}: PageProps) {
    return (
        
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Employee" />
            <div className="">
                <div className="">
                    <Sidebar/>
                </div>
                <AdminLayout
                    title="Payroll">
                    <div className="flex w-full gap-4 flex-wrap">
                    <Card className='p-4 text-white space-y-1 w-[40%] h-40  lg:w-[23%]'>
                    <p>Total Employee:</p>
                    </Card>                   
                    <Card className='p-4 text-white space-y-1 w-[56%] lg:w-[23%]'>
                        <p>Densho</p>
                    </Card>  
                    <Card className='p-4 text-white space-y-1 w-[56%] h-40 lg:w-[23%]'>
                        <p>Densho</p>
                    </Card>  
                    <Card className='p-4 text-white space-y-1 w-[40%] lg:w-[23%]'>
                        <p>Densho</p>
                    </Card>
                </div> 
                </AdminLayout>
            </div>
        </AuthenticatedLayout>
    );
}
