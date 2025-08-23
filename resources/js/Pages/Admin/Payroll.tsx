import { Head } from '@inertiajs/react';
import { PageProps,Employee,UserPayroll,filteredSelectedTypeUser} from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import PayrollPartial from './partial/Payroll';

type MonthOption = {
    number: string;
    name: string;
};
type Props = PageProps<{
    thisMonth : UserPayroll[];
    newPayroll: UserPayroll[];
    payslips: UserPayroll[];
    availableYears: number[];
    availableMonths: MonthOption[];
    selectedYear: string;
    selectedMonth: string;
    filteredEmployementType: filteredSelectedTypeUser[];
}>;
export default function Payroll({ auth,thisMonth,newPayroll,payslips,
    availableYears,
    availableMonths,
    selectedYear,
    selectedMonth,
    filteredEmployementType }:Props) {
             
        console.log(filteredEmployementType,newPayroll)
    return (
        
        <>            
        <Head title="Payroll" />
            <div className="font-Inter">
                    <Sidebar auth={auth}/>  
                <AdminLayout
                    title="Payroll">
                
                <div className="">
                    <PayrollPartial 
                    filteredEmployementType={filteredEmployementType}
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
        </>

    );
}
