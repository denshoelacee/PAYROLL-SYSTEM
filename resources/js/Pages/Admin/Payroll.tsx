import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import Card  from '@/Components/Card';
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
export default function Payroll({ auth}: PageProps) {

    const columns = [
        { field: 'id', headerName: 'Employee ID', width: 160, headerAlign: 'center', align: 'center' },
        { field: 'firstName', headerName: 'First name', width: 170, headerAlign: 'center', align: 'center' },
        { field: 'lastName', headerName: 'Last name', width: 170, headerAlign: 'center', align: 'center' },
        { field: 'designation', headerName: 'Designation', width: 170, headerAlign: 'center', align: 'center' },
        { field: 'department', headerName: 'Department', width: 160, headerAlign: 'center', align: 'center' },
        { field: 'type' , headerName: 'Type', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'accesstype' , headerName: 'Access Type', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'action', headerName: 'Actions', width: 150, headerAlign: 'center', align: 'center' },
    ];


    const employees = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', designation: 'Software Engineer', department: 'IT', type: 'Regular' },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', designation: 'Project Manager', department: 'Management', type: 'PartTime' },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', designation: 'Software Engineer', department: 'IT', type: 'Regular' },
        { id: 4, lastName: 'Stark', firstName: 'Arya', designation: 'Data Analyst', department: 'Analytics', type: 'PartTime' },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', designation: 'Product Owner', department: 'Product', type: 'Regular' },
        { id: 6, lastName: 'Melisandre', firstName: null, designation: 'UX Designer', department: 'Design', type: 'PartTime' },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', designation: 'Quality Assurance', department: 'QA', type: 'Regular' },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', designation: 'DevOps Engineer', department: 'DevOps', type: 'PartTime' },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', designation: 'System Administrator', department: 'IT', type: 'Regular' },
        { id: 10, lastName: 'Snow', firstName: 'Jon', designation: 'Software Engineer', department: 'IT', type: 'PartTime' },
        { id: 11, lastName: 'Lannister', firstName: 'Cersei', designation: 'Project Manager', department: 'Management', type: 'Regular' },
        { id: 12, lastName: 'Lannister', firstName: 'Jaime', designation: 'Software Engineer', department: 'IT', type: 'PartTime' },
        { id: 13, lastName: 'Stark', firstName: 'Arya', designation: 'Data Analyst', department: 'Analytics', type: 'Regular' },
        { id: 14, lastName: 'Targaryen', firstName: 'Daenerys', designation: 'Product Owner', department: 'Product', type: 'PartTime' },
        { id: 15, lastName: 'Melisandre', firstName: null, designation: 'UX Designer', department: 'Design', type: 'Regular' },
        { id: 16, lastName: 'Clifford', firstName: 'Ferrara', designation: 'Quality Assurance', department: 'QA', type: 'PartTime' },
        { id: 17, lastName: 'Frances', firstName: 'Rossini', designation: 'DevOps Engineer', department: 'DevOps', type: 'Regular' },
        { id: 18, lastName: 'Roxie', firstName: 'Harvey', designation: 'System Administrator', department: 'IT', type: 'PartTime' },
        { id: 19, lastName: 'Roxie', firstName: 'Harvey', designation: 'System Administrator', department: 'IT', type: 'Regular' },
        { id: 20, lastName: 'Roxie', firstName: 'Harvey', designation: 'System Administrator', department: 'IT', type: 'PartTime' },
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
                    title="Payroll">
                    <div className="flex w-full gap-4 flex-wrap">
                    <Card className='p-4 text-white space-y-1 w-[40%] h-40  lg:w-[24%]'>
                        <p className='text-2xl font-black'>1,000</p>
                        <p>Gross salary this month</p>
                    </Card>                   
                    <Card className='p-4 text-white space-y-1 w-[56%] lg:w-[24%]'>
                        <p className='text-2xl font-black'>1,000</p>
                        <p>Net salary this month</p>
                    </Card>  
                    <Card className='p-4 text-white space-y-1 w-[56%] h-40 lg:w-[24%]'>
                        <p className='text-2xl font-black'>1,000</p>
                        <p>Total tax this month</p>
                    </Card>  
                    <Card className='p-4 text-white space-y-1 w-[40%] lg:w-[24%]'>
                        <p className='text-2xl font-black'>1,000</p>
                        <p>Total loan this month</p>
                    </Card>
                </div> 
                <div className="flex flex-col-reverse justify-between md:flex md:flex-row">
                    <div className="flex items-center gap-2 mt-5">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <SecondaryButton className="flex w-[200px] justify-between items-center md:w-[300px]">
                                    <p className='text-sm'>June 1 - 30, 2025</p>
                                        <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                </SecondaryButton>
                            </Dropdown.Trigger>
                            <Dropdown.Content contentClasses="w-[300px]" align="left" >
                                <option value="Regular">COT</option>
                                <option value="Regular">Part-Time</option>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div className="flex justify-between mt-5 gap-4">
                        <Search value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <SecondaryButton onClick={() => setisOpen(true)}>
                            <div className="flex items-center gap-2">
                                <IoMdAdd className='text-custom-word-color font-black text-1xl'/>
                                    <span className="text-sm">New Payroll</span>
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
                                        <PrimaryButton className='text-md' onClick={() => setisOpen(false)}>
                                            Save
                                        </PrimaryButton>
                                    </div>
                            </div>
                    </Modal>
                </div>
                <div className="mt-5">
                    <Table
                    columns={columns}
                    rows={filteredRows}
                    pageSize={5}
                    height={365}
                    disableColumnResize={false}  // default is false
                    pageSizeOptions={[5, 10, 20]}
                    sx={{
                        '.MuiDataGrid-overlay': {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent overlay
                        backdropFilter: 'blur(5px)', // optional: adds a blur effect
                        height: '260px',
                    },
                    }}
                    
                    />
                </div>
                </AdminLayout>
            </div>
        </AuthenticatedLayout>
    );
}
