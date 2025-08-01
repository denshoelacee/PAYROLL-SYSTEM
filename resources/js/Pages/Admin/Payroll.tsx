import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps,Employee,UserPayroll} from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import PayrollPartial from './partial/Payroll';


type Props = PageProps<{
    thisMonth : UserPayroll[];
    newPayroll: Employee[];
}>;
export default function Payroll({ auth,thisMonth,newPayroll}:Props) {

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
                    <PayrollPartial payrollthisMonth={thisMonth} newPayroll={newPayroll}/>
                </div>
                </AdminLayout>
            </div>
        </AuthenticatedLayout>
    );
}
