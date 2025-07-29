import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps,Employee,UserPayroll} from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import EmployeePayrollPartial from '../Employee/partial/Payroll';
type MonthlySummaryRow = {
        month: number;
        month_name: string;
    };

type Props = PageProps<{

    userPayslip: MonthlySummaryRow[];
    availableYears: number[];
    selectedYear: string;

}>;
export default function Payroll({ auth,userPayslip,availableYears,selectedYear,}:Props) {

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
                    <EmployeePayrollPartial
                    userPayslip={userPayslip}
                    availableYears={availableYears}
                    selectedYear={selectedYear}/>
                </div>
                </AdminLayout>
            </div>
        </AuthenticatedLayout>
    );
}
