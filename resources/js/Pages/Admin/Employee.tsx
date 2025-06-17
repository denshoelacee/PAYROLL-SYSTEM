import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import Search from '@/Components/Search';
import PrimaryButton  from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { useState } from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import { IoMdAdd } from "react-icons/io";
import Dropdown from '@/Components/Dropdown';
import { RiArrowDropDownLine } from "react-icons/ri";
import Card from '@/Components/Card';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Table from '@/Components/Table';
import '../../../styles/style.css';
import { useEffect } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function Employee({ auth}: PageProps) {

    const columns = [
        { field: 'id', headerName: 'Employee ID', width: 160, headerAlign: 'center', align: 'center' },
        { field: 'firstName', headerName: 'First name', width: 170, headerAlign: 'center', align: 'center' },
        { field: 'lastName', headerName: 'Last name', width: 170, headerAlign: 'center', align: 'center' },
        { field: 'designation', headerName: 'Designation', width: 170, headerAlign: 'center', align: 'center' },
        { field: 'department', headerName: 'Department', width: 160, headerAlign: 'center', align: 'center' },
        { field: 'type' , headerName: 'Type', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'accesstype' , headerName: 'Access Type', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'action', headerName: 'Actions', width: 130, headerAlign: 'center', align: 'center',sortable: false, renderCell: (data) => (
            <div className="flex justify-center place-items-center gap-2 pt-2 ">
                <SecondaryButton className="text-sm border-none" onClick={() => alert(`Edit ${data.row.firstName} ${data.row.lastName}`)}>
                    <HiOutlineDotsVertical size={25}/>
                </SecondaryButton>
            </div>
            )}
    ];


    const employees = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', designation: 'Software Engineer', department: 'IT', type: 'Regular',accesstype: 'HR' },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', designation: 'Project Manager', department: 'Management', type: 'PartTime' ,accesstype: 'User'},
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', designation: 'Software Engineer', department: 'IT', type: 'Regular',accesstype: 'User' },
        { id: 4, lastName: 'Stark', firstName: 'Arya', designation: 'Data Analyst', department: 'Analytics', type: 'PartTime',accesstype: 'User' },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', designation: 'Product Owner', department: 'Product', type: 'Regular',accesstype: 'User' },
        { id: 6, lastName: 'Melisandre', firstName: null, designation: 'UX Designer', department: 'Design', type: 'PartTime',accesstype: 'User' },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', designation: 'Quality Assurance', department: 'QA', type: 'Regular' ,accesstype: 'User'},
        { id: 8, lastName: 'Frances', firstName: 'Rossini', designation: 'DevOps Engineer', department: 'DevOps', type: 'PartTime' ,accesstype: 'User'},
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', designation: 'System Administrator', department: 'IT', type: 'Regular' ,accesstype: 'User'},
        { id: 10, lastName: 'Snow', firstName: 'Jon', designation: 'Software Engineer', department: 'IT', type: 'PartTime' ,accesstype: 'User'},
        { id: 11, lastName: 'Lannister', firstName: 'Cersei', designation: 'Project Manager', department: 'Management', type: 'Regular',accesstype: 'User' },
        { id: 12, lastName: 'Lannister', firstName: 'Jaime', designation: 'Software Engineer', department: 'IT', type: 'PartTime',accesstype: 'User' },
        { id: 13, lastName: 'Stark', firstName: 'Arya', designation: 'Data Analyst', department: 'Analytics', type: 'Regular',accesstype: 'User' },
        { id: 14, lastName: 'Targaryen', firstName: 'Daenerys', designation: 'Product Owner', department: 'Product', type: 'PartTime',accesstype: 'User' },
        { id: 15, lastName: 'Melisandre', firstName: null, designation: 'UX Designer', department: 'Design', type: 'Regular' ,accesstype: 'User'},
        { id: 16, lastName: 'Clifford', firstName: 'Ferrara', designation: 'Quality Assurance', department: 'QA', type: 'PartTime' ,accesstype: 'User'},
        { id: 17, lastName: 'Frances', firstName: 'Rossini', designation: 'DevOps Engineer', department: 'DevOps', type: 'Regular' ,accesstype: 'User'},
        { id: 18, lastName: 'Roxie', firstName: 'Harvey', designation: 'System Administrator', department: 'IT', type: 'PartTime',accesstype: 'User' },
        { id: 19, lastName: 'Roxie', firstName: 'Harvey', designation: 'System Administrator', department: 'IT', type: 'Regular' ,accesstype: 'User'},
        { id: 20, lastName: 'Roxie', firstName: 'Harvey', designation: 'System Administrator', department: 'IT', type: 'PartTime' ,accesstype: 'User'},
    ];


    const [isOpen, setisOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRows, setFilteredRows] = useState(employees);

    useEffect(() => {
        const lowerQuery = searchQuery.toLowerCase();
        const result = employees.filter(data =>
            Object.values(data).some(
                value =>
                    value &&
                    value
                        .toString()
                        .toLowerCase()
                        .includes(lowerQuery)
            )
        );
        setFilteredRows(result);
    }, [searchQuery]);

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Employee" />
            <div className="">
                <div className="">
                    <Sidebar user={auth.user}/>
                </div>
                <AdminLayout
                    title="Employee">
                        <div className="flex justify-end gap-2">
                            <Search value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            {/*<Dropdown>
                                    <Dropdown.Trigger>
                                        <SecondaryButton className="flex w-32 justify-center">
                                            <p className='text-sm'>Department</p>
                                            <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                        </SecondaryButton>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content contentClasses="w-32" align="right" >
                                        <option value="Regular">COT</option>
                                        <option value="Regular">Part-Time</option>
                                    </Dropdown.Content>
                            </Dropdown>
                            <Dropdown>
                                    <Dropdown.Trigger>
                                        <SecondaryButton className="flex w-32 justify-center">
                                            <p className='text-sm'>All Role</p>
                                            <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                        </SecondaryButton>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content contentClasses="w-32" align="right" >
                                        <option value="Regular">Regular</option>
                                        <option value="Regular">Part-Time</option>
                                    </Dropdown.Content>
                            </Dropdown>*/}
                            <SecondaryButton onClick={() => setisOpen(true)}>
                                <div className="flex items-center gap-2">
                                    <IoMdAdd className='text-custom-word-color font-black text-1xl'/>
                                    <span className="text-sm">New Employee</span>
                                </div>
                            </SecondaryButton>
                        </div>
                        <Modal show={isOpen} onClose={() => setisOpen(false)} maxWidth="lg">
                            <div className="p-6">
                            <h2 className="text-lg font-bold mb-4 text-white">Add New Employee</h2>
                                <div className="space-y-2">
                                    <Card className="flex justify-between p-3 gap-4">
                                        <div>
                                            <InputLabel className=' py-1 text-white'>Employee Name</InputLabel>
                                            <TextInput className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1" />
                                        </div>
                                        <div>
                                            <InputLabel className='py-1 text-white'>Basic Pay</InputLabel>
                                            <TextInput className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1" />
                                        </div>
                                    </Card>
                                    <Card className="">
                                        <p className="text-sm text-gray-600 mb-6">
                                            This is your modal content. You can place forms, messages, or anything here.
                                        </p>
                                    </Card>
                                    <Card className="">
                                        <p className="text-sm text-gray-600 mb-6">
                                            This is your modal content. You can place forms, messages, or anything here.
                                        </p>
                                    </Card>
                                </div>
                            <PrimaryButton className='text-md' onClick={() => setisOpen(false)}>
                                Save
                            </PrimaryButton>
                            </div>
                        </Modal>
                        {/* Employee Table */}
                        <div className='mt-5'>
                            <Table
                                rows={filteredRows}
                                columns={columns}
                                autoHeight
                                pageSize={10}
                                height={540}
                                pageSizeOptions={[10, 20]}
                                />
                        </div>
                </AdminLayout>
            </div>
        </AuthenticatedLayout>
    );
}
