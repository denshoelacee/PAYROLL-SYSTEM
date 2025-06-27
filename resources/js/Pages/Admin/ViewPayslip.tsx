import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import { CtuLogo } from '@/Components/CtuLogo';

export default function Payslip({ auth}: PageProps) {
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
                    <div className="bg-[#16423C] flex w-full gap-4 px-1 py-3 flex-wrap max-w-6xl border rounded-md md:gap-4 md:px-12 md:py-8 ">
                        <p className='justify-center flex w-full text-white text-md md:text-xl py-2'>Employee Payslip</p>
                        <div className='flex justify-between w-full px-5'>
                            <div className='flex flex-col'>
                                <div className="flex place-items-center">
                                    <CtuLogo className='w-10 md:w-14'/>
                                    <p className='px-2 text-[10px]   md:text-lg md:px-3 text-white'>CTU - DANAO</p>
                                </div>
                                <div className="flex-col text-gray-400 text-[10px]  md:text-lg ">
                                    <p>Sabang, Danao City, 6004</p>
                                    <p>accountingdanao@ctu.edu.ph</p>
                                    <p>(032) 354-3660</p>
                                </div>
                            </div> 
                            <div className='px-1 text-[10px] md:text-lg'>
                                <p className='text-white'>PAYSLIP#OTEN3221838</p>
                                <p className='text-gray-400'>Date: April 1-30, 2025</p>
                            </div>
                        </div>
                        <p className='w-full border mx-5 border-gray-200'></p>
                        <div className="px-5 text-gray-500 text-[11px] md:text-lg">
                            <p className=' text-white'>Billing Address</p>
                            <p className=' text-white'>Aaron Gabriel Fulgar</p>
                            <p className=''>Designation: Admin Aide </p>
                            <p className=''>Department: DAN-AD</p>
                        </div>
                        <p className='w-full border mx-5 border-gray-200'></p>
                        <div className='mx-5 w-full text-white'>
                            <p className=' bg-mainColor rounded-lg py-1 my-2 px-4 text-sm md:text-lg'>Earning</p>
                            <div className='w-full text-[11px] md:text-lg '>
                                <div className="flex justify-between px-4 ">
                                    <div>
                                        <p>Salary & Wages</p>
                                        <p className='mb-5'>OTHERS: PERA</p>
                                        <p>TOTAL</p>
                                    </div>
                                    <div className='text-right'>
                                        <p>200</p>
                                        <p className='mb-5'>2000</p>
                                        <p>2200</p>
                                    </div>
                                </div>
                                <p className='bg-mainColor rounded-lg my-2 py-1 px-4 text-sm md:text-lg '>Deductions</p>
                                <div className='flex justify-between px-4 text-[11px] md:text-lg'>
                                    <div>
                                        <p>Absences w/o pay</p>
                                        <p>Late/Undertime</p>
                                        <p>Withholding Tax</p>
                                    </div>
                                    <div className='text-right'>
                                        <p>1</p>
                                        <p>1</p>
                                        <p>21312</p>
                                    </div>
                                </div>
                                <p className='text-sm md:text-lg my-2  bg-mainColor rounded-lg py-1 px-4 '>GSIS</p>
                                <div className='flex justify-between px-4 text-[11px] md:text-lg'>
                                    <div>
                                        <p>RLIP</p>
                                        <p>POLICY LOAN</p>
                                        <p>CONSOL LOAN</p>
                                        <p>EMERGENCY LOAN</p>
                                        <p>GEL</p>
                                        <p>GFAL</p>
                                        <p>MPL</p>
                                        <p>MPL LITE</p>
                                    </div>
                                    <div className='text-right'>
                                        <p>1</p>
                                        <p>1</p>
                                        <p>21312</p>
                                        <p>123123</p>
                                        <p>1</p>
                                        <p>1</p>
                                        <p>1</p>
                                        <p>1</p>
                                    </div>
                                </div>
                                <p className='text-sm md:text-lg my-2 bg-mainColor rounded-lg py-1 px-4 '>HDMF</p>
                                <div className='flex justify-between px-4 text-[11px] md:text-lg'>
                                    <div>
                                        <p>Pag-ibig Premium</p>
                                        <p>Pag-ibig Loan</p>
                                        <p>Pag-ibig Housing Loan</p>
                                    </div>
                                    <div className='text-right'>
                                        <p>1</p>
                                        <p>1</p>
                                        <p>1</p>
                                    </div>
                                </div>
                                <p className='text-sm md:text-lg my-2 bg-mainColor rounded-lg py-1 px-4 '>OTHER DEDUCTIONS</p>
                                <div className='flex justify-between px-4 text-[11px] md:text-lg'>
                                    <div>
                                        <p>PHILHEALTH</p>
                                        <p>CFI</p>
                                        <p>TIPID</p>
                                        <p>CITY SAVING BANK</p>
                                        <p>FEA</p>
                                        <p>CANTEEN</p>
                                        <p>DISALLOWANCE</p>
                                        <p>UNLIQUIDATED CASH ADVANCES</p>
                                        <p>DISALLOWANCE(HONORARIA)</p>
                                        <p>COOP</p>
                                        <p>LANDBANK</p>
                                        <p>UCPB</p>
                                    </div>
                                    <div className='text-right'>
                                        <p>1</p>
                                        <p>1</p>
                                        <p>1</p>
                                        <p>1</p>
                                        <p>2</p>
                                        <p>3</p>
                                        <p>4</p>
                                        <p>5</p>
                                        <p>6</p>
                                        <p>7</p>
                                        <p>8</p>
                                        <p>9</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                    
                </AdminLayout>
            </div>
        </AuthenticatedLayout>
    );
}
