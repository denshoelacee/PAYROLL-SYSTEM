import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps,Employee} from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import CardWrapper  from '@/Components/CardWrapper';
import Table from '@/Components/Table';
import Search from '@/Components/Search';
import SecondaryButton from '@/Components/SecondaryButton';
import { useState, useEffect } from 'react';
import { IoMdAdd } from "react-icons/io";
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { RiArrowDropDownLine } from "react-icons/ri";
import Dropdown from '@/Components/Dropdown';
import { TbCurrencyPeso } from "react-icons/tb";
import { GridColDef } from '@mui/x-data-grid';
import PayrollPartial from './partial/Payroll';
export default function Payroll({ auth,payroll}: PageProps<{payroll:Employee[]}>) {

    return (
        
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Employee" />
            <div className="">
                <div className="">
                    <Sidebar auth={auth}/>
                </div>
                <AdminLayout
                    title="Payroll">
                
                <div className="">
                    <PayrollPartial/>
                </div>
                </AdminLayout>
            </div>
        </AuthenticatedLayout>
    );
}
