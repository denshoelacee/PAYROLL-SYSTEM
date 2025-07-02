import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import { CtuLogo } from '@/Components/CtuLogo';
import { useRef,useState } from 'react';
import html2canvas from 'html2canvas'
import {jsPDF} from 'jspdf';
import CTULOGO from '../../../images/CTULOGO.png'




export default function Payslip({ auth}: PageProps) {
    const print = useRef(null);
    const handleDownloadPDF = async() => { 
        const element = print.current;  

        if(!element){
            return;
        }
        
        const canvas = await html2canvas(element, {scale: 2, useCORS: true,});
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: "portrait",
            unit : "cm",
            format: "a4"
        });
        pdf.addImage(data, 'PNG', 0 ,0 ,21,29.7);
        pdf.save('PAYSLIP.pdf');

        
    };
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
                    <div ref={print} className="bg-[#16423C] flex w-full h-full gap-4 px-2 md:p-8 flex-wrap max-w-6xl border rounded-md">
                        <p className='justify-center flex w-full text-white text-lg pt-5 pb-1 md:text-2xl'>Employee Payslip</p>
                        <div className='flex justify-between w-full px-5 '>
                            <div className='flex flex-col w-full'>
                                <div className="flex justify-between">
                                    <div className="flex place-items-center">
                                        <img src={CTULOGO} className="w-14" alt="CTU Logo" />
                                        {/*<CtuLogo className='w-10 lg:w-14'/>*/}
                                        <p className='px-2 text-white text-sm md:px-3 lg:text-xl'>CTU - DANAO</p>
                                    </div>
                                    <div className='text-xs md:text-lg '>
                                        <p className='text-white'>PAYSLIP # 3221838</p>
                                        <p className='text-gray-400'>Date: April 1-30,x 2025</p>
                                    </div>
                                </div>
                                <div className="flex-col text-gray-400 text-xs md:text-lg">
                                    <p className=''>Sabang, Danao City, 6004</p>
                                    <p className=''>accountingdanao@ctu.edu.ph</p>
                                    <p className=''>(032) 354-3660</p>
                                </div>
                            </div> 
                        </div>
                        <p className='w-full border mx-5 border-gray-200'></p>
                        <div className="px-5 text-gray-500 text-sm md:text-lg">
                            <p className='text-md text-white md:text-xl'>Billing Address</p>
                            <p className='text-white'>Aaron Gabriel Fulgar</p>
                            <p>Designation: Admin Aide </p>
                            <p>Department: DAN-AD</p>
                        </div>
                        <p className='w-full border mx-5 border-gray-200'></p>
                        <div className='mx-5 w-full h-12 rounded-lg h-full text-white'>
                            <p className='text-white text-md md:text-2xl'>Earning</p>
                            <div className='flex justify-between text-sm md:text-lg'>
                                <div className="">
                                    <p className=''>Salaries & Wages</p>
                                    <p className=''>OTHERS: PERA</p>
                                    <br/>
                                    <p className=''>TOTAL</p>
                                </div>
                                <div className=" text-right ">
                                    <p className=''>123123</p>
                                    <p className=''>123123</p>
                                    <br/>
                                    <p className=''>123123</p>
                                </div>
                            </div>
                        </div>
                        <p className='w-full border mx-5 border-gray-200'></p>
                        <div className='mx-5 w-full h-12 rounded-lg h-full text-white'>
                            <p className='text-white text-md md:text-2xl'>Deductions</p>
                            <div className='flex justify-between text-sm md:text-lg'>
                                <div className="">
                                    <p className=''>Absences w/o pay</p>
                                    <p className=''>W/holding Tax</p>
                                    <p className=''>Late/Undertime</p>
                                    <p className=''>Absent</p>
                                </div>
                                <div className=" text-right">
                                    <p className=''>123123</p>
                                    <p className=''>123123</p>
                                    <p className=''>123123</p>
                                    <p className=''>123123</p>
                                </div>
                            </div>
                        </div>
                        <p className='w-full border mx-5 border-gray-200'></p>
                        <div className='mx-5 w-full h-12 rounded-lg h-full text-white'>
                            <p className='text-white text-md md:text-2xl'>GSIS</p>
                            <div className='flex justify-between text-sm md:text-lg'>
                                <div className="">
                                    <p className=''>RLIP</p>
                                    <p className=''>Policy Loan</p>
                                    <p className=''>Consol Loan</p>
                                    <p className=''>Emergency Loan</p>
                                    <p className=''>GEL</p>
                                    <p className=''>GFAL</p>
                                    <p className=''>MPL</p>
                                    <p className="">MPL LITE</p>
                                </div>
                                <div className=" text-right">
                                    <p className=''>123123</p>
                                    <p className=''>123123</p>
                                    <p className=''>123123</p>
                                    <p className=''>123123</p>
                                    <p className=''>123123</p>
                                    <p className=''>123123</p>
                                    <p className=''>123123</p>
                                    <p className=''>123123</p>
                                </div>
                            </div>
                        </div>
                        <p className='w-full border mx-5 border-gray-200'></p>

                        <div className='mx-5 w-full h-12 rounded-lg h-full text-white'>
                            <p className='text-white text-md md:text-2xl'>HDMF</p>
                            <div className='flex justify-between text-sm md:text-lg'>
                                <div className="">
                                    <p className=''>Contributions</p>
                                    <p className=''>LOANS</p>
                                    <p className=''>Housing Loan</p>
                                </div>
                                <div className=" text-right">
                                    <p className=''>123123</p>
                                    <p className=''>123123</p>
                                    <p className=''>123123</p>
                                </div>
                            </div>
                        </div>
                        <div className='mx-5 w-full h-12 rounded-lg h-full text-white'>
                            <p className='text-white text-md md:text-2xl'>OTHER DEDUCTIONS</p>
                            <div className='flex justify-between text-sm md:text-lg'>
                                <div className="">
                                    <p className="">Philhealth</p>
                                    <p className="">CFI</p>
                                    <p className="">TIPID</p>
                                    <p className="">CITY SAVINGS BANK</p>
                                    <p className="">FEA</p>
                                    <p className="">CANTEEN</p>
                                    <p className="">Disallowance</p>
                                    <p className="">Unliquidated Cash Advances</p>
                                    <p className="">Disallowance</p>
                                    <p className="">COOP</p>
                                    <p className="">LANDBANK</p>
                                    <p className="">UCPB</p>
                                </div>
                                <div className=" text-right text-sm md:text-lg">
                                    <p className="">12312</p>
                                    <p className="">12312</p>
                                    <p className="">12312</p>
                                    <p className="">12312</p>
                                    <p className="">12312</p>
                                    <p className="">12312</p>
                                    <p className="">12312</p>
                                    <p className="">12312</p>
                                    <p className="">12312</p>
                                    <p className="">12312</p>
                                    <p className="">12312</p>
                                    <p className="">12312</p>
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
