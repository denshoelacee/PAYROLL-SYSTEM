import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {Employee, JobTitles, PageProps,EmploymentTypes} from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useEffect } from 'react';
import '../../../styles/style.css';
import EmployeePartial from './partial/Employee';
import ManageUserPartial from './partial/ManageUsers';

type Props = PageProps<{
    pendingUsers: Employee[];
    employeeList: Employee[];
    jobtitles : JobTitles[];
    employeeTypeList: EmploymentTypes[];
    
}>;
export default function Employees({ auth, pendingUsers,employeeList,jobtitles,employeeTypeList}:Props) {
    
    const [ActiveTab , setActiveTab] = useState('manageusers');
   
    return (
        <>
            <Head title="Employee " />
            <Sidebar auth={auth} />
            <AdminLayout title="Employee Management">
                <div className="gap-5 flex py-7 sm:py-10 md:py-5 lg:py-2 ">

                    <button type="button" className={`custom-hover text-white ${ActiveTab === 'manageusers' && (
                        "border-b-2 border-yellow-500 "
                    )}`}onClick={() => setActiveTab('manageusers')}>
                       User Verification
                    </button>
                     <button type="button" className={`custom-hover text-white ${ActiveTab === 'employee' && (
                        "border-b-2 border-yellow-500 "
                    )}`} onClick={() => setActiveTab('employee')}>
                    Manage Employees
                    </button>
                </div>
                {ActiveTab === 'employee' && (
                    <>
                    <EmployeePartial userList={employeeList} jobtitles={jobtitles} auth={auth} employeeTypeList={employeeTypeList}/>
                    </>
                )}
                {ActiveTab === 'manageusers' && (
                    <>
                    <ManageUserPartial employees={pendingUsers} auth={auth}/> 
                    </>
                )}
            </AdminLayout>
</>
    );
}