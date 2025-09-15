import { Head } from '@inertiajs/react';
import { PageProps} from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import EmployeePayrollPartial from '../Employee/partial/Payroll';

type MonthlySummaryRow = {
    month: number;
    month_name: string;
    assigned_designation: string;
    assigned_department: string;
    payslip_type: string;
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
        <AdminLayout>
            <Head title="Employee" />
                    <EmployeePayrollPartial
                    userPayslip={userPayslip}
                    availableYears={availableYears}
                    selectedYear={selectedYear}/>
        </AdminLayout>

       </>
    );
}
