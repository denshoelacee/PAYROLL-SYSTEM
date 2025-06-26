import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps,Employee} from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import PayrollPartial from './partial/Payroll';

export default function Payroll({ auth,payroll}: PageProps<{payroll:Employee[]}>) {

    return (
        
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Employee" />
            <div className="">
                <div className="">
                    <Sidebar auth={auth}/>
                </div>
                <AdminLayout
                    title="Payroll">
                
                <div className="">
                    <PayrollPartial/>
                </div>
                </AdminLayout>
            </div>
        </AuthenticatedLayout>
    );
}
