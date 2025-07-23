import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import { CtuLogo } from '@/Components/CtuLogo';
import { useEffect, useRef,useState } from 'react';
import html2canvas from 'html2canvas'
import {jsPDF} from 'jspdf';
import CTULOGO from '../../../images/CTULOGO.png'
import { UserPayroll } from '@/types';
import DisplayItem from '@/Components/payslipDisplay';


export default function Payslip({ auth}: PageProps) {
    const [payroll, setPayroll] = useState<UserPayroll | null>(null);

    useEffect(() => {
    const stored = localStorage.getItem('selectedPayroll');
    if (stored) {
      setPayroll(JSON.parse(stored));
    }
  }, []);

    const print = useRef(null);
    const handleDownloadPDF = async() => { 
        const element = print.current;  

        if(!element){
            return;
        }
        const A4_WIDTH = 595.28;   // in points (1pt = 1/72 inch)
        const A4_HEIGHT = 841.89;  // in points 
        const canvas = await html2canvas(element, {scale: 2, useCORS: true,});
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: "portrait",
            unit : "pt",
            format: "a4"
        });
        pdf.addImage(data, 'PNG', 0 ,0 ,A4_WIDTH,A4_HEIGHT);
        pdf.save('PAYSLIP.pdf');

        
    };

    function getDateRange(created_at: string): string {
        const date = new Date(created_at);
        const year = date.getFullYear();
        const month = date.getMonth(); // 0-based
        const monthName = date.toLocaleString('default', { month: 'long' });

        const lastDay = new Date(year, month + 1, 0).getDate();

        return `${monthName} 1–${lastDay}, ${year}`;
        }

        function getHalfMonthRanges(created_at: string): string[] {
        const date = new Date(created_at);
        const year = date.getFullYear();
        const month = date.getMonth(); // 0-based

        const monthName = date.toLocaleString('default', { month: 'long' });
        const lastDay = new Date(year, month + 1, 0).getDate();

        return [
            `${monthName} 1–15, ${year}`,
            `${monthName} 16–${lastDay}, ${year}`
        ];
        }

    return (
        
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="">
                    <Sidebar auth={auth}/>  
                <AdminLayout
                    title="Payslip">
                    {/* <div className="mb-8 bg-green-100 rounded-md bg-clip-padding bg-opacity-10 border border-button-border-color">
                        <div className="py-2 px-4 text-white space-y-1">
                            <p>Good to see you, {auth.user.last_name} </p>
                            <p className="text-sm text-gray-300">Role MotherFucker!</p>
                        </div>
                    </div>
                    */}
                    <div ref={print} className="lg:w-[200mm] lg:min-h-[277mm] bg-white flex gap-4 px-2 md:p-8 flex-wrap  border rounded-md text-black">
                        <p className='justify-center flex w-full text-black text-lg pt-2 pb-1 md:text-xl'>Employee Payslip</p>
                        <div className='flex justify-between w-full px-5 '>
                            <div className='flex flex-col w-full'>
                                <div className="flex justify-between">
                                    <div className="flex place-items-center">
                                        <img src={CTULOGO} className="w-14" alt="CTU Logo" />
                                        {/*<CtuLogo className='w-10 lg:w-14'/>*/}
                                        <p className='px-2  text-sm md:px-3 lg:text-lg'>CTU - DANAO</p>
                                    </div>
                                    <div className='text-xs md:text-sm '>
                                        <p className=''>PAYSLIP # CTU{payroll?.employee_id}</p>
                                        <p className="text-gray-400">Date: {payroll?.created_at ? getDateRange(payroll.created_at) : ''}</p>

                                    </div>
                                </div>
                                <div className="flex-col text-gray-400 text-xs md:text-sm">
                                    <p className=''>Sabang, Danao City, 6004</p>
                                    <p className=''>accountingdanao@ctu.edu.ph</p>
                                    <p className=''>(032) 354-3660</p>
                                </div>
                            </div> 
                        </div>
                        <p className='w-full border-b mx-5 border-gray-200'></p>
                        <div className="px-5 text-gray-500 text-sm lg:text-md">
                            <p className='text-md md:text-xl'>Billing Address</p>
                            <p>{payroll?.first_name} {payroll?.last_name}</p>
                            <p>Designation: {payroll?.designation} </p>
                            <p>Department: {payroll?.department}</p>
                        </div>
                        <p className='w-full border-b mx-5 border-gray-200'></p>
                        <div className='mx-5 w-full rounded-lg h-full '>
                            <p className=' text-md md:text-lg'>Earning</p>
                            <div className='flex justify-between text-sm lg:text-md'>
                                <div className="">
                                    <p className=''>Salaries & Wages</p>
                                    <p className=''>OTHERS: PERA</p>
                                    <br/>
                                    <p className=''>TOTAL</p>
                                </div>
                                <div className=" text-right ">
                                    <p className=''>{payroll?.basic_pay}</p>
                                    <p className=''>{payroll?.pera}</p>
                                    <br/>
                                    <p className=''>{(Number(payroll?.basic_pay) || 0) + (Number(payroll?.pera) || 0)}</p>                                
                                </div>
                            </div>
                        </div>
                        <p className='w-full border-b mx-5 border-gray-200'></p>
                        <div className='mx-5 w-full rounded-lg h-full'>
                            <p className=' text-md md:text-lg'>Deductions</p>
                            <div className='w-full flex flex-col justify-between text-sm lg:text-md'>
                                <DisplayItem label="Absences w/o pay" value={payroll?.absent} />
                                <DisplayItem label="W/holding Tax" value={payroll?.holding_tax} />
                                <DisplayItem label="Late/Undertime" value={payroll?.late} />
                            </div>
                        </div>
                        <p className='w-full  border-b mx-5 border-gray-200'></p>
                        <div className='mx-5 w-full rounded-lg h-full '>
                            <p className=' text-md md:text-lg'>GSIS</p>
                            <div className='w-full flex flex-col justify-between text-sm lg:text-md'>
                                <DisplayItem label="RLIP" value={payroll?.rlip} />
                                <DisplayItem label="Policy Loan" value={payroll?.policy_loan} />
                                <DisplayItem label="Consol Loan" value={payroll?.consol_loan} />
                                <DisplayItem label="Emergency Loan" value={payroll?.emerg_loan} />
                                <DisplayItem label="GEL" value={payroll?.gel} />
                                <DisplayItem label="GFAL" value={payroll?.gfal} />
                                <DisplayItem label="MPL" value={payroll?.mpl} />
                                <DisplayItem label="MPL LITE" value={payroll?.mpl_lite} />
                            </div>
                        </div>
                        <p className='w-full border-b mx-5 border-gray-200'></p>

                        <div className='mx-5 w-full  rounded-lg h-full '>
                            <p className=' text-md md:text-lg'>HDMF</p>
                            <div className='flex flex-col w-full justify-between text-sm lg:text-md'>
                                <DisplayItem label="Contributions" value={payroll?.contributions} />
                                <DisplayItem label="LOANS" value={payroll?.loans} />
                                <DisplayItem label="Housing Loan" value={payroll?.housing_loan} />

                            </div>
                        </div>
                        <p className='w-full border-b mx-5 border-gray-200'></p>
                        <div className='mx-5 w-full rounded-lg h-full '>
                            <p className=' text-md md:text-lg'>OTHER DEDUCTIONS</p>
                            <div className='flex flex-col w-full justify-between text-sm lg:text-md'>
                                <DisplayItem label="Philhealth" value={payroll?.philhealth} />
                                <DisplayItem label="CFI" value={payroll?.cfi} />
                                <DisplayItem label="TIPID" value={payroll?.tipid} />
                                <DisplayItem label="CITY SAVINGS BANK" value={payroll?.city_savings_bank} />
                                <DisplayItem label="FEA" value={payroll?.fea} />
                                <DisplayItem label="CANTEEN" value={payroll?.canteen} />
                                <DisplayItem label="Disallowance" value={payroll?.disallowance} />
                                <DisplayItem label="Unliquidated Cash Advances" value={payroll?.unliquidated_ca} />
                                <DisplayItem label="Disallowance Honoraria" value={payroll?.disallowance_honoraria} />
                                <DisplayItem label="COOP" value={payroll?.coop} />
                                <DisplayItem label="LANDBANK" value={payroll?.landbank} />
                                <DisplayItem label="UCPB" value={payroll?.ucpb} />
                                <p className='w-full border-b mx-5 border-gray-200'></p>
                                <div className="my-5">
                                    {payroll?.created_at && (
                                    <>
                                        <p className="text-end text-md font-semibold">TOTAL DEDUCTIONS: {payroll.total_deduction}</p>
                                        <p className="text-end text-md font-semibold">NET PAY: {payroll.net_pay}</p>

                                        {getHalfMonthRanges(payroll.created_at).map((range, index) => (
                                        <p key={index} className="text-end text-sm">
                                            {range}: {(Number(payroll.net_pay) / 2).toFixed(2)}
                                        </p>
                                        ))}
                                    </>
                                )}
                                </div>
                            

                            </div>
                            
                        </div>
                       
                    </div>
                    <button onClick={handleDownloadPDF}>PRINT</button>
                    
                </AdminLayout>
            </div>
        </AuthenticatedLayout>
    );
}
