import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps, UserPayroll } from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import CTULOGO from '../../../images/CTULOGO.png';
import DisplayItem from '@/Components/payslipDisplay';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Payslip({ auth }: PageProps) {
    const [payroll, setPayroll] = useState<UserPayroll | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('selectedPayroll');
        if (stored) {
        setPayroll(JSON.parse(stored));
        }
    }, []);

    const handleDownloadPDF = () => {
    if (!payroll) return;

    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageHeight = doc.internal.pageSize.getHeight();
    const startY = 40;
    let y = startY;
    let fontSize = 10;
    doc.setFontSize(fontSize);

    const marginX = 60;
    const rightX = 460;
    const maxContentHeight = pageHeight - 60;

    const addText = (label: string, value: string | number = '', indent = marginX-10, alignRight = false) => {
        if (y > maxContentHeight) {
            fontSize = Math.max(8, fontSize - 1);
            doc.setFontSize(fontSize);
            y = startY;
            doc.addPage();
        }

        doc.text(label, indent, y);
        if (value !== '') {
            doc.text(format(value), alignRight ? rightX : 550, y, { align: 'right' });
        }
        y += 14;
    };

    const addSectionTitle = (title: string) => {
        y += 2;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(fontSize+2);
        y += 8;
        doc.setLineWidth(0.5);
        doc.line(marginX - 10, y, 550, y);
        y += 15;
        doc.text(title, marginX-10, y);
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', 'normal');
        y += 15;
    };

    const formatDateRange = getDateRange(payroll.created_at);
    const halfMonths = getHalfMonthRanges(payroll.created_at);

    doc.setFontSize(14);
    doc.text("Employee Payslip", 240, y);
    y += 25;

    // === Header Section ===
    doc.setFontSize(5);

    // Left logo
    const logoX = 50;
    const logoY = y;
    const logoWidth = 45;
    const logoHeight = 45;

    doc.addImage(CTULOGO, 'PNG', logoX, logoY, logoWidth, logoHeight);

    const rightTextX = logoX + logoWidth + 10;
    const rightTextY = logoY + 12; // vertically aligned with top of logo
    
    doc.setFontSize(12);
    doc.text("CTU - DANAO", rightTextX, rightTextY + 15);

    doc.setFontSize(10);

    const belowTextX = logoX;
    const belowTextYStart = logoY + logoHeight + 14;

    doc.text("Sabang, Danao City, 6004", belowTextX, belowTextYStart + 14);
    doc.text("accountingdanao@ctu.edu.ph", belowTextX, belowTextYStart);
    doc.text("(032) 354–3660", belowTextX, belowTextYStart + 28);

    doc.text(
    `PAYSLIP #${payroll.employee_id}${new Date(payroll.created_at).toLocaleDateString('en-GB').replace(/[^0-9]/g, '')}`,
    400,
    rightTextY+4
    );
    doc.text(`Date: ${formatDateRange}`, 400, rightTextY-5 + 20);


    y = belowTextYStart + 30;

    // Billing Info
    addSectionTitle("Billing Address");
    addText(`Name: ${payroll.employee_name}`);
    addText(`Designation: ${payroll.designation}`);
    addText(`Department: ${payroll.department}`);
     y -= 10;
    // Earning
    addSectionTitle("Earning");
    addText("Salaries & Wages", payroll.basic_salary ?? 0);
    addText("OTHERS: PERA", payroll.pera ?? 0);
    
    y += 10;
    doc.setFont("helvetica", "bold");
    addText("TOTAL", (Number(payroll.basic_salary) || 0) + (Number(payroll.pera) || 0));
    y -= 15;
    doc.setFont("helvetica", "normal");
    
    // Deductions
    addSectionTitle("Deductions");
    if (shouldDisplay(payroll.absent)) addText("Absences w/o pay", payroll.absent ?? 0);
    if (shouldDisplay(payroll.holding_tax)) addText("W/holding Tax", payroll.holding_tax ??0);
    if (shouldDisplay(payroll.late)) addText("Late/Undertime", payroll.late?? 0);
    
    y -= 10;
    
    addSectionTitle("GSIS");
    if (shouldDisplay(payroll.rlip)) addText("RLIP", payroll.rlip ?? 0);
    if (shouldDisplay(payroll.policy_loan)) addText("Policy Loan", payroll.policy_loan ?? 0);
    if (shouldDisplay(payroll.consol_loan)) addText("Consol Loan", payroll.consol_loan ?? 0);
    if (shouldDisplay(payroll.emerg_loan)) addText("Emergency Loan", payroll.emerg_loan ?? 0);
    if (shouldDisplay(payroll.gel)) addText("GEL", payroll.gel ?? 0);
    if (shouldDisplay(payroll.gfal)) addText("GFAL", payroll.gfal ?? 0);
    if (shouldDisplay(payroll.mpl)) addText("MPL", payroll.mpl ?? 0);
    if (shouldDisplay(payroll.mpl_lite)) addText("MPL LITE", payroll.mpl_lite ?? 0);

    y -= 10;
    
    addSectionTitle("HDMF");
    if (shouldDisplay(payroll.contributions)) addText("Contributions", payroll.contributions ?? 0);
    if (shouldDisplay(payroll.loans)) addText("Loans", payroll.loans ?? 0);
    if (shouldDisplay(payroll.housing_loan)) addText("Housing Loan", payroll.housing_loan ?? 0);
    
    y -= 10;

    addSectionTitle("OTHER DEDUCTIONS");
    if (shouldDisplay(payroll.philhealth)) addText("Philhealth", payroll.philhealth ?? 0);
    if (shouldDisplay(payroll.cfi)) addText("CFI", payroll.cfi ?? 0);
    if (shouldDisplay(payroll.tipid)) addText("TIPID", payroll.tipid ?? 0);
    if (shouldDisplay(payroll.city_savings_bank)) addText("City Savings Bank", payroll.city_savings_bank ?? 0);
    if (shouldDisplay(payroll.fea)) addText("FEA", payroll.fea ?? 0);
    if (shouldDisplay(payroll.canteen)) addText("Canteen", payroll.canteen ?? 0);
    if (shouldDisplay(payroll.disallowance)) addText("Disallowance", payroll.disallowance ?? 0);
    if (shouldDisplay(payroll.unliquidated_ca)) addText("Unliquidate Cash Advances", payroll.unliquidated_ca ?? 0);
    if (shouldDisplay(payroll.disallowance_honoraria)) addText("Disallowance Honoraria", payroll.disallowance_honoraria ?? 0);
    if (shouldDisplay(payroll.coop)) addText("COOP", payroll.coop ?? 0);
    if (shouldDisplay(payroll.landbank)) addText("LANDBANK", payroll.landbank ?? 0);
    if (shouldDisplay(payroll.ucpb)) addText("UCPB", payroll.ucpb ?? 0);


    y -= 5;
    doc.setFont("helvetica", "bold");
    doc.setLineWidth(0.5);
    doc.line(marginX - 10, y, 550, y);
    y += 15;    

    const addText2 = (
    label: string,
    value: string | number,
    rightMargin = 550 
    ) => {
    const labelWidth = doc.getTextWidth(label);
    const valueText = format(value);
    const valueWidth = doc.getTextWidth(valueText);

    doc.text(label, rightMargin - valueWidth - labelWidth - 10, y); 
    doc.text(valueText, rightMargin - valueWidth, y);

    y += 20;
    };


    doc.setFont("helvetica", "bold");
    addText2("TOTAL DEDUCTIONS:", payroll.total_deduction ?? 0);
    addText2("NET PAY:", payroll.net_pay?? 0);

    doc.setFont("helvetica", "normal");
    halfMonths.forEach((label) => {
    addText2(label, (Number(payroll.net_pay) / 2).toFixed(2));
    });
    
    doc.save('PAYSLIP.pdf');
    };

    

    const getDateRange = (created_at: string): string => {
        const date = new Date(created_at);
        const year = date.getFullYear();
        const month = date.getMonth();
        const monthName = date.toLocaleString('default', { month: 'long' });
        const lastDay = new Date(year, month + 1, 0).getDate();
        return `${monthName} 1–${lastDay}, ${year}`;
    };

    const getHalfMonthRanges = (created_at: string): string[] => {
        const date = new Date(created_at);
        const year = date.getFullYear();
        const month = date.getMonth();
        const monthName = date.toLocaleString('default', { month: 'long' });
        const lastDay = new Date(year, month + 1, 0).getDate();
        return [
        `${monthName} 1–15, ${year}:`,
        `${monthName} 16–${lastDay}, ${year}:`,
        ];
    };

    const format = (val: any) =>
        Number(val || 0).toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        });

    const shouldDisplay = (val: any) => Number(val) > 0;

return (
    <AuthenticatedLayout user={auth.user}>
        <Head title="Payslip" />
        <div className="">
            <Sidebar auth={auth} />
            <AdminLayout title="Payslip">   
            <div
                className="lg:w-[200mm] lg:min-h-[277mm] bg-[#16423C] flex gap-4 px-2 md:p-8 flex-wrap border rounded-md text-black"
            >
                <p className="justify-center flex w-full text-white text-lg pt-2 pb-1 md:text-xl">
                Employee Payslip
                </p>

                <div className="flex justify-between w-full px-5 ">
                    <div className="flex flex-col w-full text-white">
                        <div className="flex justify-between">
                            <div className="flex place-items-center">
                                <img src={CTULOGO} className="w-14" alt="CTU Logo" />
                                <p className="px-2 text-sm md:px-3 lg:text-lg">CTU - DANAO</p>
                            </div>
                            <div className="text-xs md:text-sm ">
                                <p>
                                PAYSLIP #{payroll?.employee_id}
                                {payroll?.created_at &&
                                    `${new Date(payroll.created_at).toLocaleDateString('en-GB').replace(/[^0-9]/g, '')}`}
                                </p>                    
                                <p className="">
                                Date: {payroll?.created_at ? getDateRange(payroll.created_at) : ''}
                                </p>
                            </div>
                        </div>
                        <div className="flex-col  text-xs md:text-sm">
                            <p>Sabang, Danao City, 6004</p>
                            <p>accountingdanao@ctu.edu.ph</p>
                            <p>(032) 354-3660</p>
                        </div>
                    </div>
                </div>

                <p className="w-full border-b mx-5 border-white"></p>

                <div className="px-5 text-white text-sm lg:text-md">
                    <p className="text-md md:text-xl">Billing Address</p>
                    <p>{payroll?.employee_name}</p>
                    <p>Designation: {payroll?.designation}</p>
                    <p>Department: {payroll?.department}</p>
                </div>

                <p className="w-full border-b mx-5 border-white"></p>

                <div className="mx-5 w-full rounded-lg h-full text-white">
                    <p className="text-md md:text-lg">Earning</p>
                    <div className="flex justify-between text-sm lg:text-md">
                        <div>
                            <p>Salaries & Wages</p>
                            <p>OTHERS: PERA</p>
                            <br />
                            <p>TOTAL</p>
                        </div>
                        <div className="text-right">
                            <p>{format(payroll?.basic_salary)}</p>
                            <p>{format(payroll?.pera)}</p>
                            <br />
                            <p>
                                {format(
                                (Number(payroll?.basic_salary) || 0) + (Number(payroll?.pera) || 0)
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                <p className="w-full border-b mx-5 border-white"></p>

                {/* Deductions */}
                <div className="mx-5 w-full rounded-lg h-full text-white">
                    <p className="text-md md:text-lg">Deductions</p>
                        <div className="w-full flex flex-col justify-between text-sm lg:text-md">
                            {shouldDisplay(payroll?.absent) && <DisplayItem label="Absences w/o pay" value={format(payroll?.absent)} />}
                            {shouldDisplay(payroll?.holding_tax) && <DisplayItem label="W/holding Tax" value={format(payroll?.holding_tax)} />}
                            {shouldDisplay(payroll?.late) && <DisplayItem label="Late/Undertime" value={format(payroll?.late)} />}
                        </div>
                </div>

                <p className="w-full border-b mx-5 border-white"></p>

                {/* GSIS */}
                <div className="mx-5 w-full rounded-lg h-full text-white">
                    <p className="text-md md:text-lg">GSIS</p>
                        <div className="w-full flex flex-col justify-between text-sm lg:text-md">
                            {shouldDisplay(payroll?.rlip) && <DisplayItem label="RLIP" value={format(payroll?.rlip)} />}
                            {shouldDisplay(payroll?.policy_loan) && <DisplayItem label="Policy Loan" value={format(payroll?.policy_loan)} />}
                            {shouldDisplay(payroll?.consol_loan) && <DisplayItem label="Consol Loan" value={format(payroll?.consol_loan)} />}
                            {shouldDisplay(payroll?.emerg_loan) && <DisplayItem label="Emergency Loan" value={format(payroll?.emerg_loan)} />}
                            {shouldDisplay(payroll?.gel) && <DisplayItem label="GEL" value={format(payroll?.gel)} />}
                            {shouldDisplay(payroll?.gfal) && <DisplayItem label="GFAL" value={format(payroll?.gfal)} />}
                            {shouldDisplay(payroll?.mpl) && <DisplayItem label="MPL" value={format(payroll?.mpl)} />}
                            {shouldDisplay(payroll?.mpl_lite) && <DisplayItem label="MPL LITE" value={format(payroll?.mpl_lite)} />}
                        </div>
                </div>

                <p className="w-full border-b mx-5 border-white"></p>

                {/* HDMF */}
                <div className="mx-5 w-full rounded-lg h-full text-white">
                    <p className="text-md md:text-lg">HDMF</p>
                        <div className="flex flex-col w-full justify-between text-sm lg:text-md">
                            {shouldDisplay(payroll?.contributions) && <DisplayItem label="Contributions" value={format(payroll?.contributions)} />}
                            {shouldDisplay(payroll?.loans) && <DisplayItem label="LOANS" value={format(payroll?.loans)} />}
                            {shouldDisplay(payroll?.housing_loan) && <DisplayItem label="Housing Loan" value={format(payroll?.housing_loan)} />}
                        </div>
                </div>

                <p className="w-full border-b mx-5 border-white"></p>

                {/* Other Deductions */}
                <div className="mx-5 w-full rounded-lg h-full text-white">
                    <p className="text-md md:text-lg">OTHER DEDUCTIONS</p>
                        <div className="flex flex-col w-full justify-between text-sm lg:text-md">
                            {shouldDisplay(payroll?.philhealth) && <DisplayItem label="Philhealth" value={format(payroll?.philhealth)} />}
                            {shouldDisplay(payroll?.cfi) && <DisplayItem label="CFI" value={format(payroll?.cfi)} />}
                            {shouldDisplay(payroll?.tipid) && <DisplayItem label="TIPID" value={format(payroll?.tipid)} />}
                            {shouldDisplay(payroll?.city_savings_bank) && <DisplayItem label="CITY SAVINGS BANK" value={format(payroll?.city_savings_bank)} />}
                            {shouldDisplay(payroll?.fea) && <DisplayItem label="FEA" value={format(payroll?.fea)} />}
                            {shouldDisplay(payroll?.canteen) && <DisplayItem label="CANTEEN" value={format(payroll?.canteen)} />}
                            {shouldDisplay(payroll?.disallowance) && <DisplayItem label="Disallowance" value={format(payroll?.disallowance)} />}
                            {shouldDisplay(payroll?.unliquidated_ca) && <DisplayItem label="Unliquidated Cash Advances" value={format(payroll?.unliquidated_ca)} />}
                            {shouldDisplay(payroll?.disallowance_honoraria) && <DisplayItem label="Disallowance Honoraria" value={format(payroll?.disallowance_honoraria)} />}
                            {shouldDisplay(payroll?.coop) && <DisplayItem label="COOP" value={format(payroll?.coop)} />}
                            {shouldDisplay(payroll?.landbank) && <DisplayItem label="LANDBANK" value={format(payroll?.landbank)} />}
                            {shouldDisplay(payroll?.ucpb) && <DisplayItem label="UCPB" value={format(payroll?.ucpb)} />}
                        </div>
                </div>
                <p className="w-full border-b mx-5 border-white"></p>
                <div className="flex flex-col w-full justify-between text-sm lg:text-md px-5 pb-5 text-white">
                    {payroll?.created_at && (
                    <>
                        <p className="text-end text-md font-semibold">TOTAL DEDUCTIONS: {format((payroll.total_deduction))}</p>
                        <p className="text-end text-md font-semibold">NET PAY: {format((payroll.net_pay))}</p>
                        {getHalfMonthRanges(payroll.created_at).map((range, index) => (
                        <p key={index} className="text-end text-sm">
                            {range}: {(Number(payroll.net_pay) / 2).toFixed(2)}
                        </p>
                        ))}
                    </>
                    )}
                </div>
            </div>
            <div className="w-32 py-2">
                <PrimaryButton onClick={handleDownloadPDF}>PRINT</PrimaryButton>
            </div>
            </AdminLayout>
        </div>
    </AuthenticatedLayout>
    );
}
