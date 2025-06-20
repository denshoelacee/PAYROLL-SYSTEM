import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import Search from '@/Components/Search';
import PrimaryButton  from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { useState, useEffect } from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import { IoMdAdd } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Card from '@/Components/Card';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Table from '@/Components/Table';
import { Popover } from '@mui/material';
import '../../../styles/style.css';

export default function Employee({ auth }: PageProps) {
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const employees = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', designation: 'Software Engineer', department: 'IT', type: 'Regular', accesstype: 'HR' },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', designation: 'Project Manager', department: 'Management', type: 'PartTime', accesstype: 'User' },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', designation: 'Software Engineer', department: 'IT', type: 'Regular', accesstype: 'User' },
        { id: 4, lastName: 'Stark', firstName: 'Arya', designation: 'Data Analyst', department: 'Analytics', type: 'PartTime', accesstype: 'User' },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', designation: 'Product Owner', department: 'Product', type: 'Regular', accesstype: 'User' },
        { id: 6, lastName: 'Melisandre', firstName: '', designation: 'UX Designer', department: 'Design', type: 'PartTime', accesstype: 'User' },
        { id: 7, lastName: 'Snow', firstName: 'Jon', designation: 'Software Engineer', department: 'IT', type: 'Regular', accesstype: 'HR' },
        { id: 8, lastName: 'Lannister', firstName: 'Cersei', designation: 'Project Manager', department: 'Management', type: 'PartTime', accesstype: 'User' },
        { id: 9, lastName: 'Lannister', firstName: 'Jaime', designation: 'Software Engineer', department: 'IT', type: 'Regular', accesstype: 'User' },
        { id: 10, lastName: 'Stark', firstName: 'Arya', designation: 'Data Analyst', department: 'Analytics', type: 'PartTime', accesstype: 'User' },
        { id: 11, lastName: 'Targaryen', firstName: 'Daenerys', designation: 'Product Owner', department: 'Product', type: 'Regular', accesstype: 'User' },
        { id: 12, lastName: 'Melisandre', firstName: '', designation: 'UX Designer', department: 'Design', type: 'PartTime', accesstype: 'User' },
    ];

    const [filteredRows, setFilteredRows] = useState(employees);

    useEffect(() => {
        const lowerQuery = searchQuery.toLowerCase();
        const result = employees.filter(data =>
            Object.values(data).some(
                value => value && value.toString().toLowerCase().includes(lowerQuery)
            )
        );
        setFilteredRows(result);
    }, [searchQuery]);

    const handleOpenPopover = (event:any, row:any) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const columns = [
        { field: 'id', headerName: ' ID', flex:1, headerAlign: 'center', align: 'center' },
        { field: 'firstName', headerName: 'First name', flex:1, headerAlign: 'center', align: 'center' },
        { field: 'lastName', headerName: 'Last name',flex:1, headerAlign: 'center', align: 'center' },
        { field: 'designation', headerName: 'Designation', flex:1, headerAlign: 'center', align: 'center' },
        { field: 'department', headerName: 'Department', flex:1, headerAlign: 'center', align: 'center' },
        { field: 'type', headerName: 'Type', flex:1, headerAlign: 'center', align: 'center' },
        { field: 'accesstype', headerName: 'Access Type', flex:1, headerAlign: 'center', align: 'center' },
        {
            field: 'action',
            headerName: 'Actions',
            flex:1,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (data:any) => (
                <div className="flex justify-center place-items-center gap-2 pt-2">
                    <SecondaryButton className="text-sm border-none" onClick={(e) => handleOpenPopover(e, data.row)}>
                        <HiOutlineDotsVertical size={25} />
                    </SecondaryButton>
                </div>
            )
        }
     ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Employee" />
            <Sidebar user={auth.user} />
            <AdminLayout title="Employee">
                <div className="flex justify-between gap-2 sm:justify-end  md:justify-end md:gap-5  ">
                    <Search value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <SecondaryButton onClick={() => setAddModal(true)}>
                        <div className="flex items-center gap-2">
                            <IoMdAdd className='text-custom-word-color font-black text-1xl' />
                            <span className="text-sm">New Employee</span>
                        </div>
                    </SecondaryButton>
                </div>

                <div className="w-full overflow-x-auto scrollbar-hidden">
                    <div className='my-5 min-w-[900px] h-[650px] sm:h-[650px] md:h-[650px] lg:h[800px] overflow-y-auto scrollbar-hidden '>
                        <Table
                            rows={filteredRows}
                            columns={columns}
                            autoHeight
                            pageSize={10}
                            height={650}
                            sx={{ 
                                '.MuiDataGrid-overlay': {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent overlay
                                backdropFilter: 'blur(5px)', // optional: adds a blur effect
                                height: '535px',
                                },
                             }}
                            
                        />
                    </div>
                </div>
                {/* Add Modal */}
                <Modal show={addModal} onClose={() => setAddModal(false)} maxWidth="lg">
                    <div className="p-6">
                        <h2 className="text-lg font-bold mb-4 text-white">Add New Employee</h2>
                        <Card className="flex justify-between p-3 gap-4">
                            <div>
                                <InputLabel className='py-1 text-white'>Employee Name</InputLabel>
                                <TextInput className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1" />
                            </div>
                            <div>
                                <InputLabel className='py-1 text-white'>Basic Pay</InputLabel>
                                <TextInput className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1" />
                            </div>
                        </Card>
                        <PrimaryButton className='text-md mt-4' onClick={() => setAddModal(false)}>Save</PrimaryButton>
                    </div>
                </Modal>

                {/* Edit Modal */}
                <Modal show={editModal} onClose={() => setEditModal(false)} maxWidth="lg">
                    <div className="p-6">
                        <h2 className="text-lg font-bold mb-4 text-white">Edit Employee</h2>
                        <Card className="flex justify-between p-3 gap-4">
                            <div>
                                <InputLabel className='py-1 text-white'>Employee Name</InputLabel>
                                <TextInput className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1" />
                            </div>
                            <div>
                                <InputLabel className='py-1 text-white'>Basic Pay</InputLabel>
                                <TextInput className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1" />
                            </div>
                        </Card>
                        <PrimaryButton className='text-md mt-4' onClick={() => setEditModal(false)}>Save</PrimaryButton>
                    </div>
                </Modal>

                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    className='w-32'
                >
                    <div className=" w-48 bg-mainColor shadow-md text-sm text-white">
                        <button
                            className="w-full text-left px-4 py-2 hover:text-mainColor hover:bg-green-100"
                            onClick={() => {
                                setEditModal(true);
                                setAnchorEl(null);
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className="w-full text-left px-4 py-2 hover:text-mainColor hover:bg-green-100 "
                            onClick={() => {
                                console.log("Delete employee:", selectedRow);
                                setAnchorEl(null);
                            }}
                        >
                            Delete
                        </button>
                        <button
                            className="w-full text-left px-4 py-2 hover:text-mainColor hover:bg-green-100 "
                            onClick={() => {
                                setAnchorEl(null);
                            }}
                        >
                            View
                        </button>
                    </div>
                </Popover>
            </AdminLayout>
        </AuthenticatedLayout>
    );
}