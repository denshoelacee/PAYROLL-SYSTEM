import PayslipView from '@/Components/Payslip/PayslipView';
import { PageProps } from '@/types';

export default function ViewPayslip({ auth }: PageProps) {
    return (
        <PayslipView
            auth={auth}
            className="font-Inter"
            employeeName={(payroll) => `${payroll.last_name}, ${payroll.first_name}`}
        />
    );
}
