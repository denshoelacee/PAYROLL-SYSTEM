import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {Employee, PageProps } from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import Search from '@/Components/Search';
import PrimaryButton  from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { useState, useEffect } from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import { IoMdAdd } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import CardWrapper from '@/Components/CardWrapper';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Table from '@/Components/Table';
import { Popover } from '@mui/material';
import '../../../styles/style.css';
import searchHooks from '@/hooks/searchHooks';
import { GridColDef } from '@mui/x-data-grid';
import EmployeePartial from './partial/Employee';
import ManageUserPartial from './partial/ManageUsers';



export default function Employees({ auth, userList,employees}: PageProps<{userList:Employee[]}>) {
    
    const [ActiveTab , setActiveTab] = useState('manageusers');
    
    return (
        <AuthenticatedLayout user={auth.user}>
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
                    <EmployeePartial userList={userList} auth={auth}/>
                    </>
                )}
                {ActiveTab === 'manageusers' && (
                    <>
                    <ManageUserPartial employees={employees} auth={auth}/> 
                    </>
                )}
            </AdminLayout>
        </AuthenticatedLayout>
    );
}