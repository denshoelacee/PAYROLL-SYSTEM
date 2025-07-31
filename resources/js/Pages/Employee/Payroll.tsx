import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps,Employee,UserPayroll} from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import EmployeePayrollPartial from '../Employee/partial/Payroll';
import EmployeeLayout from '@/Layouts/EmployeeLayout';
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
       <>
        <Sidebar auth={auth}/>
        <EmployeeLayout>
            <Head title="Employee" />
                    <EmployeePayrollPartial
                    userPayslip={userPayslip}
                    availableYears={availableYears}
                    selectedYear={selectedYear}/>
        </EmployeeLayout>
       </>
    );
}
