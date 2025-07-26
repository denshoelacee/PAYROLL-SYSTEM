import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps,Employee,UserPayroll} from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import PayrollPartial from './partial/Payroll';

type MonthOption = {
    number: string;
    name: string;
};
type Props = PageProps<{
    thisMonth : UserPayroll[];
    newPayroll: Employee[];
    payslips: UserPayroll[];
    availableYears: number[];
    availableMonths: MonthOption[];
    selectedYear: string;
    selectedMonth: string;
}>;
export default function Payroll({ auth,thisMonth,newPayroll,payslips,
    availableYears,
    availableMonths,
    selectedYear,
    selectedMonth}:Props) {

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
                    <PayrollPartial 
                    payrollthisMonth={thisMonth} 
                    newPayroll={newPayroll} 
                    payslips={payslips} 
                    availableMonths={availableMonths}
                    availableYears={availableYears}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}/>
                </div>
                </AdminLayout>
            </div>
        </AuthenticatedLayout>
    );
}
