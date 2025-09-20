import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import { jsPDF } from 'jspdf';
import CTULOGO from '../../../images/CTULOGO.png';
import DisplayItem from '@/Components/payslipDisplay';
import PrimaryButton from '@/Components/PrimaryButton';

// Define the payslip interface based on your array structure
interface PayslipData {
    payslip_id: string;
    user_id: number;
    full_name: string;
    basic_salary: number;
    daily_rate: number;
    duty_count: number;
    units: number;
    service_rendered:number;
    hourly_rate:number;
    pera: number;
    absent: number;
    late: number;
    holding_tax: number;
    tax_bal_due: number;
    rlip: number;
    policy_loan: number;
    consol_loan: number;
    emerg_loan: number;
    gel: number;
    gfal: number;
    mpl: number;
    mpl_lite: number;
    contributions: number;
    loans: number;
    housing_loan: number;
    philhealth: number;
    cfi: number;
    tipid: number;
    city_savings_bank: number;
    fea: number;
    canteen: number;
    disallowance: number;
    unliquidated_ca: number;
    disallowance_honoraria: number;
    coop: number;
    landbank: number;
    ucpb: number;
    sss: number;
    deduction1: number;
    deduction2: number;
    deduction3: number;
    assigned_designation: string;
    assigned_department: string;
    payslip_type: string;
    gross_salary: number;
    total_deduction: number;
    net_pay: number;
}

interface PayslipPageProps extends PageProps {
    payslip: PayslipData;
}

export default function Payslip({ auth, payslip }: PayslipPageProps) {
    // Only render if payslip data exists
    const isRegularOrPart = payslip.payslip_type.includes("Regular") || payslip.payslip_type.includes("Part-Time");
    const isJobOrder = payslip.payslip_type.includes("Job Order");
    if (!payslip) {
        return (
            <>
                <Head title="Payslip" />
                <div className="font-Inter">
                    <Sidebar auth={auth} />
                    <AdminLayout title="Payslip">
                        <div className="text-center text-red-500">
                            No payslip data found.
                        </div>
                    </AdminLayout>
                </div>
            </>
        );
    }

    const handleDownloadPDF = () => {
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

        const formatDateRange = getCurrentDate();
        const halfMonths = getHalfMonthRanges();

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
        const rightTextY = logoY + 12;
        
        doc.setFontSize(12);
        doc.text("CTU - DANAO", rightTextX, rightTextY + 15);

        doc.setFontSize(10);

        const belowTextX = logoX;
        const belowTextYStart = logoY + logoHeight + 14;

        doc.text("Sabang, Danao City, 6004", belowTextX, belowTextYStart + 14);
        doc.text("accountingdanao@ctu.edu.ph", belowTextX, belowTextYStart);
        doc.text("(032) 354–3660", belowTextX, belowTextYStart + 28);

        doc.text(`PAYSLIP #${payslip.payslip_id}`, 400, rightTextY+4);
        doc.text(`Date: ${formatDateRange}`, 400, rightTextY-5 + 20);

        y = belowTextYStart + 30;

        // Billing Info
        addSectionTitle("Billing Address");
        addText(`Name: ${payslip.full_name}`);
        addText(`Designation: ${payslip.assigned_designation}`);
        addText(`Department: ${payslip.assigned_department}`);
        y -= 10;

        // Earning
        addSectionTitle("Earning");
        
        addText("Salaries & Wages", payslip.payslip_type === "Part-Time" || payslip.payslip_type === "Regular|Part-Time" || payslip.payslip_type === "Job Order|Part-Time"
                                    ? (Number(payslip.gross_salary) || 0)
                                    : payslip.payslip_type === "Job Order"
                                    ? (Number(payslip.gross_salary) || 0)
                                    : (Number(payslip.basic_salary) || 0) + (Number(payslip.pera) || 0)
                                    );
        addText("OTHERS: PERA", payslip.pera ?? 0);
        
        y += 10;
        doc.setFont("helvetica", "bold");
        addText("TOTAL",payslip.payslip_type === "Part-Time" || payslip.payslip_type === "Regular|Part-Time" || payslip.payslip_type === "Job Order|Part-Time"
                        ? (Number(payslip.gross_salary) || 0)
                        : payslip.payslip_type === "Job Order"
                        ? (Number(payslip.gross_salary) || 0)
                        : (Number(payslip.basic_salary) || 0) + (Number(payslip.pera) || 0)
                        );
        y -= 15;
        doc.setFont("helvetica", "normal");
        
        // Deductions
        addSectionTitle("Deductions");
        if (shouldDisplay(payslip.absent)) addText("Absences w/o pay", payslip.absent ?? 0);
        if (shouldDisplay(payslip.holding_tax)) addText("W/holding Tax", payslip.holding_tax ??0);
        if (shouldDisplay(payslip.late)) addText("Late/Undertime", payslip.late?? 0);
        
        y -= 10;
        
        addSectionTitle("GSIS");
        if (shouldDisplay(payslip.rlip)) addText("RLIP", payslip.rlip ?? 0);
        if (shouldDisplay(payslip.policy_loan)) addText("Policy Loan", payslip.policy_loan ?? 0);
        if (shouldDisplay(payslip.consol_loan)) addText("Consol Loan", payslip.consol_loan ?? 0);
        if (shouldDisplay(payslip.emerg_loan)) addText("Emergency Loan", payslip.emerg_loan ?? 0);
        if (shouldDisplay(payslip.gel)) addText("GEL", payslip.gel ?? 0);
        if (shouldDisplay(payslip.gfal)) addText("GFAL", payslip.gfal ?? 0);
        if (shouldDisplay(payslip.mpl)) addText("MPL", payslip.mpl ?? 0);
        if (shouldDisplay(payslip.mpl_lite)) addText("MPL LITE", payslip.mpl_lite ?? 0);

        y -= 10;
        
        addSectionTitle("HDMF");
        if (shouldDisplay(payslip.contributions)) addText("Contributions", payslip.contributions ?? 0);
        if (shouldDisplay(payslip.loans)) addText("Loans", payslip.loans ?? 0);
        if (shouldDisplay(payslip.housing_loan)) addText("Housing Loan", payslip.housing_loan ?? 0);
        
        y -= 10;

        addSectionTitle("OTHER DEDUCTIONS");
        if (shouldDisplay(payslip.sss)) addText("SSS", payslip.sss ?? 0);
        if (shouldDisplay(payslip.philhealth)) addText("Philhealth", payslip.philhealth ?? 0);
        if (shouldDisplay(payslip.cfi)) addText("CFI", payslip.cfi ?? 0);
        if (shouldDisplay(payslip.tipid)) addText("TIPID", payslip.tipid ?? 0);
        if (shouldDisplay(payslip.city_savings_bank)) addText("City Savings Bank", payslip.city_savings_bank ?? 0);
        if (shouldDisplay(payslip.fea)) addText("FEA", payslip.fea ?? 0);
        if (shouldDisplay(payslip.canteen)) addText("Canteen", payslip.canteen ?? 0);
        if (shouldDisplay(payslip.disallowance)) addText("Disallowance", payslip.disallowance ?? 0);
        if (shouldDisplay(payslip.unliquidated_ca)) addText("Unliquidate Cash Advances", payslip.unliquidated_ca ?? 0);
        if (shouldDisplay(payslip.disallowance_honoraria)) addText("Disallowance Honoraria", payslip.disallowance_honoraria ?? 0);
        if (shouldDisplay(payslip.coop)) addText("COOP", payslip.coop ?? 0);
        if (shouldDisplay(payslip.landbank)) addText("LANDBANK", payslip.landbank ?? 0);
        if (shouldDisplay(payslip.ucpb)) addText("UCPB", payslip.ucpb ?? 0);

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
        addText2("TOTAL DEDUCTIONS:", payslip.total_deduction ?? 0);
        addText2("NET PAY:", payslip.net_pay?? 0);

        doc.setFont("helvetica", "normal");
        if (isRegularOrPart) {
            const halfMonths = getHalfMonthRanges();
            halfMonths.forEach((label) => {
                addText2(label, (Number(payslip.net_pay) / 2).toFixed(2));
            });
        } else if (isJobOrder) {
            const halfMonths = getHalfMonthRanges();
            if (payslip.payslip_id?.toString().endsWith("-01")) {
                addText2(halfMonths[0], (Number(payslip.net_pay)).toFixed(2));
            }
            if (payslip.payslip_id?.toString().endsWith("-02")) {
                addText2(halfMonths[1], (Number(payslip.net_pay)).toFixed(2));
            }
        }

        
        
        doc.save('PAYSLIP.pdf');
    };

    const getCurrentDate = (): string => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const monthName = date.toLocaleString('default', { month: 'long' });
        const lastDay = new Date(year, month + 1, 0).getDate();
        return `${monthName} 1–${lastDay}, ${year}`;
    };

    const getHalfMonthRanges = (): string[] => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const monthName = date.toLocaleString('default', { month: 'long' });
        const lastDay = new Date(year, month + 1, 0).getDate();
        return [
            `${monthName} 1–15, ${year}:`,
            `${monthName} 16–${lastDay}, ${year}:`, 
        ];
    };

    const renderJobOrderPayslipRange = (netPay: number, payslipId?: string | number) => {
        const ranges = getHalfMonthRanges();

        if(payslip?.payslip_type === 'Job Order'){
            if (payslipId?.toString().endsWith("-01")) {
            return (
                <p className="text-end text-sm">
                    {ranges[0]} {netPay}
                </p>
            );
            }
            if (payslipId?.toString().endsWith("-02")) {
                return (
                    <p className="text-end text-sm">
                        {ranges[1]} {netPay}
                    </p>
                );
            }
        }
        return null;
    };
    const format = (val: any) =>
        Number(val || 0).toLocaleString('en-PH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const shouldDisplay = (val: any) => Number(val) > 0;

    return (
        <>
            <Head title="Payslip" />
            <div className="font-Inter">
                <Sidebar auth={auth} />
                <AdminLayout title="Payslip">   
                    <div className="lg:w-[200mm] lg:min-h-[277mm] bg-[#16423C] flex gap-4 px-2 md:p-8 flex-wrap border rounded-md text-black">
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
                                        <p>PAYSLIP #{payslip.payslip_id}</p>                    
                                        <p className="">Date: {getCurrentDate()}</p>
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
                            <p>{payslip.full_name}</p>
                            <p>Designation: {payslip.assigned_designation}</p>
                            <p>Department: {payslip.assigned_department}</p>
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
                                    {payslip.payslip_type === "Regular" && 
                                        <p>{format(payslip.basic_salary)}</p>   
                                    }
                                    {(payslip.payslip_type === "Part-Time" || payslip.payslip_type === "Job Order" || payslip.payslip_type === "Regular|Part-Time" || payslip.payslip_type === "Job Order|Part-Time") && (
                                        <p>{format(payslip.gross_salary || 0)}</p>
                                    )}
                                    <p>{format(payslip.pera)}</p>
                                    <br />
                                    <p>
                                    {format(
                                    payslip.payslip_type === "Part-Time" || payslip.payslip_type === "Regular|Part-Time" || payslip.payslip_type === "Job Order|Part-Time"
                                        ? (Number(payslip.gross_salary) || 0)
                                        : payslip.payslip_type === "Job Order"
                                        ? (Number(payslip.gross_salary) || 0)
                                        : (Number(payslip.basic_salary) || 0) + (Number(payslip.pera) || 0)
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
                                {shouldDisplay(payslip.absent) && <DisplayItem label="Absences w/o pay" value={format(payslip.absent)} />}
                                {shouldDisplay(payslip.holding_tax) && <DisplayItem label="W/holding Tax" value={format(payslip.holding_tax)} />}
                                {shouldDisplay(payslip.late) && <DisplayItem label="Late/Undertime" value={format(payslip.late)} />}
                            </div>
                        </div>

                        <p className="w-full border-b mx-5 border-white"></p>

                        {/* GSIS */}
                        <div className="mx-5 w-full rounded-lg h-full text-white">
                            <p className="text-md md:text-lg">GSIS</p>
                            <div className="w-full flex flex-col justify-between text-sm lg:text-md">
                                {shouldDisplay(payslip.rlip) && <DisplayItem label="RLIP" value={format(payslip.rlip)} />}
                                {shouldDisplay(payslip.policy_loan) && <DisplayItem label="Policy Loan" value={format(payslip.policy_loan)} />}
                                {shouldDisplay(payslip.consol_loan) && <DisplayItem label="Consol Loan" value={format(payslip.consol_loan)} />}
                                {shouldDisplay(payslip.emerg_loan) && <DisplayItem label="Emergency Loan" value={format(payslip.emerg_loan)} />}
                                {shouldDisplay(payslip.gel) && <DisplayItem label="GEL" value={format(payslip.gel)} />}
                                {shouldDisplay(payslip.gfal) && <DisplayItem label="GFAL" value={format(payslip.gfal)} />}
                                {shouldDisplay(payslip.mpl) && <DisplayItem label="MPL" value={format(payslip.mpl)} />}
                                {shouldDisplay(payslip.mpl_lite) && <DisplayItem label="MPL LITE" value={format(payslip.mpl_lite)} />}
                            </div>
                        </div>

                        <p className="w-full border-b mx-5 border-white"></p>

                        {/* HDMF */}
                        <div className="mx-5 w-full rounded-lg h-full text-white">
                            <p className="text-md md:text-lg">HDMF</p>
                            <div className="flex flex-col w-full justify-between text-sm lg:text-md">
                                {shouldDisplay(payslip.contributions) && <DisplayItem label="Contributions" value={format(payslip.contributions)} />}
                                {shouldDisplay(payslip.loans) && <DisplayItem label="LOANS" value={format(payslip.loans)} />}
                                {shouldDisplay(payslip.housing_loan) && <DisplayItem label="Housing Loan" value={format(payslip.housing_loan)} />}
                            </div>
                        </div>

                        <p className="w-full border-b mx-5 border-white"></p>

                        {/* Other Deductions */}
                        <div className="mx-5 w-full rounded-lg h-full text-white">
                            <p className="text-md md:text-lg">OTHER DEDUCTIONS</p>
                            <div className="flex flex-col w-full justify-between text-sm lg:text-md">
                                {shouldDisplay(payslip.sss) && <DisplayItem label="SSS" value={format(payslip.sss)} />}
                                {shouldDisplay(payslip.philhealth) && <DisplayItem label="Philhealth" value={format(payslip.philhealth)} />}
                                {shouldDisplay(payslip.cfi) && <DisplayItem label="CFI" value={format(payslip.cfi)} />}
                                {shouldDisplay(payslip.tipid) && <DisplayItem label="TIPID" value={format(payslip.tipid)} />}
                                {shouldDisplay(payslip.city_savings_bank) && <DisplayItem label="CITY SAVINGS BANK" value={format(payslip.city_savings_bank)} />}
                                {shouldDisplay(payslip.fea) && <DisplayItem label="FEA" value={format(payslip.fea)} />}
                                {shouldDisplay(payslip.canteen) && <DisplayItem label="CANTEEN" value={format(payslip.canteen)} />}
                                {shouldDisplay(payslip.disallowance) && <DisplayItem label="Disallowance" value={format(payslip.disallowance)} />}
                                {shouldDisplay(payslip.unliquidated_ca) && <DisplayItem label="Unliquidated Cash Advances" value={format(payslip.unliquidated_ca)} />}
                                {shouldDisplay(payslip.disallowance_honoraria) && <DisplayItem label="Disallowance Honoraria" value={format(payslip.disallowance_honoraria)} />}
                                {shouldDisplay(payslip.coop) && <DisplayItem label="COOP" value={format(payslip.coop)} />}
                                {shouldDisplay(payslip.landbank) && <DisplayItem label="LANDBANK" value={format(payslip.landbank)} />}
                                {shouldDisplay(payslip.ucpb) && <DisplayItem label="UCPB" value={format(payslip.ucpb)} />}
                            </div>
                        </div>

                        <p className="w-full border-b mx-5 border-white"></p>

                        <div className="flex flex-col w-full justify-between text-sm lg:text-md px-5 pb-5 text-white">
                            <p className="text-end text-md font-semibold">TOTAL DEDUCTIONS: {format(payslip.total_deduction)}</p>
                            <p className="text-end text-md font-semibold">NET PAY: {format(payslip.net_pay)}</p>
                            {isRegularOrPart ? (
                                getHalfMonthRanges().map((range, i) => (
                                    <p key={i} className="text-end text-sm">
                                        {range} {(Number(payslip.net_pay) / 2).toFixed(2)}
                                    </p>
                                ))
                            ) : isJobOrder ? (
                                renderJobOrderPayslipRange(payslip.net_pay, payslip.payslip_id)
                            ) : null}
                            
                        </div>
                    </div>
                    <div className="w-32 py-2">
                        <PrimaryButton onClick={handleDownloadPDF}>PRINT</PrimaryButton>
                    </div>
                </AdminLayout>
            </div>
        </>
    );
}