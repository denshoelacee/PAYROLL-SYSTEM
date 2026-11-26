import PayslipView from '@/Components/Payslip/PayslipView';
import { PageProps } from '@/types';

export default function ViewPayslip({ auth }: PageProps) {
    return <PayslipView auth={auth} employeeName={(payroll) => payroll.employee_name ?? ''} />;
}
