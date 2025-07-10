import {Employee, PageProps,JobTitles} from '@/types';
import Search from '@/Components/Search';
import PrimaryButton  from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { useState, useEffect, useMemo,FormEventHandler} from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import { IoMdAdd } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import CardWrapper from '@/Components/CardWrapper';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Table from '@/Components/Table';
import { Popover } from '@mui/material';
import searchHooks from '@/hooks/searchHooks';
import { GridColDef } from '@mui/x-data-grid';
import style from '../../../styles/style.css';
import { useForm } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import { RiArrowDropDownLine } from 'react-icons/ri';


type Props = PageProps<{
    userList: Employee[];
    jobtitles: JobTitles[];
}>;
export default function EmployeePartial({ userList,jobtitles}: Props) {

        const [addModal, setAddModal] = useState(false);
        const [editModal, setEditModal] = useState(false);
        const [anchorEl, setAnchorEl] = useState(null);
        const [selectedRow, setSelectedRow] = useState<Employee | null>(null);
        const [searchQuery, setSearchQuery] = useState('');
        const [selectDepartment, setSelectDepartment] = useState('Select Department');
        const [selectDesignation, setSelectDesignation] = useState('Select Designation');
        
    
        const handleOpenPopover = (event:any, row:Employee) => {
            setAnchorEl(event.currentTarget);
            setSelectedRow(row);
        };

         const handleDropdownSelect = (value: any, field: string) => {
        if(field === 'department'){
            setSelectDepartment(value)
        } 
        else if(field === 'designation'){
            setSelectDesignation(value)
        }
        setData(field, value); 
    };

        const processedData = useMemo(() => {
            return userList.map((e) => ({
                ...e,
                full_name: `${e.last_name} ${e.first_name}`,
            }));
        }, [userList]);

        const filteredRows = searchHooks(searchQuery, processedData);

        const { data, setData, post,reset} = useForm<any>({
                employee_id: '',
                last_name: '',
                first_name: '',
                designation: '',
                department: '',
                employment_type:'',
                basic_pay:'',
            });

         const submit: FormEventHandler = (e) => {
            e.preventDefault();

            post(route('add.new.account'), {
                onSuccess: () => {
                    setAddModal(false);
                    reset(); 
                    setSelectDepartment('Select Department')
                    setSelectDesignation('Select Designation')
                },
            });
        };

        const columns: GridColDef[] = [
    
            { field: 'employee_id', headerName: ' ID', flex:1, headerAlign: 'center', align: 'center' },
            { field: 'full_name', headerName: 'Full Name', flex:1, headerAlign: 'center', align: 'center' },
            { field: 'designation', headerName: 'Designation', flex:1, headerAlign: 'center', align: 'center' },
            { field: 'department', headerName: 'Department', flex:1, headerAlign: 'center', align: 'center' },
            { field: 'basic_pay', headerName: 'Basic Pay', flex:1, headerAlign: 'center', align: 'center' },
            { field: 'role', headerName: 'Role Type', headerAlign: 'center', align: 'center' },
            { field: 'employment_type', headerName: 'Employment', flex:1, headerAlign: 'center', align: 'center' },
            {
                field: 'action',
                headerName: 'Actions',
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

        const handleEmployeeId = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value } = e.target;

        if(/^[0-9]*$/.test(value) ){
            setData('employee_id', value);
        }
        }

        const handleBasicPayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        if (/^\d*\.?\d*$/.test(value)) {
            setData('basic_pay', value);
        }
        };

    return(
    <>
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
            <div className='my-5 min-w-[900px] h-[650px] sm:h-[650px] md:h-[710px] lg:h[800px] overflow-y-auto scrollbar-hidden '>
                <div className="bg-[#16423C] border-[1px] border-button-border-color rounded-lg">
                    <div className="text-white px-10 py-3 text-xl">Employee List</div>
                    <Table
                    rows={filteredRows}
                    columns={columns}
                    height={630}
                    getRowId={(row) => row.employee_id}
                    className="employee-table"
                    pageSize={10}     
                    pageSizeOptions={[10]}     
                />
                </div>
            </div>
        </div>
        {/* Add Modal */}
        <Modal show={addModal} onClose={() => setAddModal(false)} maxWidth="2xl" >
            <form onSubmit={submit} >
            <div className="p-6 space-y-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4 text-white">Add New Employee</h2>
                
                    <CardWrapper className="justify-between p-3 gap-4">
                    <div>
                        <InputLabel className='py-1 text-white'>Employee ID *</InputLabel>
                        <TextInput 
                            id="employee_id"
                            type="text"
                            name="employee_id"
                            className=" block w-full bg-transparent text-white"
                            isFocused={true}
                            inputMode='numeric'
                            value={data.employee_id}
                            onChange={handleEmployeeId}

                           //onChange={(e) => setData('employee_id', e.target.value)}

                        />
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <div className='w-full'>
                            <InputLabel className='py-1 text-white'>First Name *</InputLabel>
                            <TextInput
                            id="first_name"
                            type="text"
                            name="first_name"
                            isFocused={true}
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                            className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1" />
                        </div>
                        <div className='w-full'>
                            <InputLabel className='py-1 text-white'>Last Name *</InputLabel>
                            <TextInput 
                            id="last_name"
                            type="text"
                            name="last_name"
                            isFocused={true}
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1" />
                        </div>
                    </div>
                </CardWrapper>
                <CardWrapper className="p-3 flex gap-4">
                    <div className='w-full'>
                        <InputLabel htmlFor="department" value="Department *"  className='text-white'/>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="bg-transparent w-full border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full">
                                    <p className='text-sm'>{selectDepartment}</p>
                                    <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                </button>
                            </Dropdown.Trigger> 
                            <Dropdown.Content contentClasses="w-full max-h-[200px] overflow-y-auto p-0" align="left">
                            {jobtitles
                                .map(dep => dep.department)
                                .filter(department => department && department.toUpperCase() !== 'NULL') 
                                .map((name, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    id="department"
                                    name="department"
                                    onClick={() => handleDropdownSelect(name, 'department')}
                                    className="w-full px-4 py-2 text-left bg-gray-300 hover:bg-[#145858] text-black hover:text-white"
                                >
                                {name}
                                </button>
                            ))}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div className='w-full'>
                        <InputLabel htmlFor="designation" value="Designation *"  className='text-white'/>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="bg-transparent w-full border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full">
                                    <p className='text-sm'>{selectDesignation}</p>
                                    <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                </button>
                            </Dropdown.Trigger> 
                            <Dropdown.Content contentClasses=" p-0 w-full max-h-[200px] overflow-y-auto" align="left">
                            {jobtitles
                                .map(des => des.designation)
                                .filter(designations => designations && designations.toUpperCase() !== 'NULL') 
                                .map((name, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    id="designation"
                                    name="designation"
                                    onClick={() => handleDropdownSelect(name, 'designation')}
                                    className="w-full px-4 py-2 text-left bg-gray-300 text-black hover:bg-[#145858] hover:text-white"
                                >
                                {name}
                                </button>
                            ))}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </CardWrapper>
                <CardWrapper className="flex justify-between p-3 gap-4 w-full">
                    <div className='w-full'>
                        <InputLabel  className='py-1 text-white'>Basic Pay *</InputLabel>
                        <TextInput 
                            id="basic_pay"
                            type="text"
                            name="basic_pay"
                            isFocused={true}
                            value={data.basic_pay}
                            step="0.01"
                            onChange={handleBasicPayChange}
                            //onChange={(e) => setData('basic_pay', e.target.value)}
                            className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1"
                             />
                    </div>
                </CardWrapper>
                <CardWrapper className=" p-3 gap-4">
                   <div className='flex justify-between gap-4 w-full'>
                        <div className='w-full'>
                            <InputLabel className='py-1 text-white'>Employment Type *</InputLabel>
                            <TextInput 
                            id="employment_type"
                            type="text"
                            name="employment_type"
                            isFocused={true}
                            value={data.employment_type}
                            onChange={(e) => setData('employment_type', e.target.value)}
                            className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1" />
                        </div>
                        <div className='w-full'>
                            <InputLabel className='py-1 text-white'>Role *</InputLabel>
                            <TextInput 
                             id="role"
                            type="text"
                            name="role"
                            isFocused={true}
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1" />

                        </div>
                    </div>
                </CardWrapper>
                <PrimaryButton className='text-md mt-4'>Save</PrimaryButton>
                
            </div>
            </form>
        </Modal>
        {/* Edit Modal */}
        <Modal show={editModal} onClose={() => setEditModal(false)} maxWidth="lg">
            <div className="p-6">
                <h2 className="text-lg font-bold mb-4 text-white">Edit Employee</h2>
                <CardWrapper className="flex justify-between p-3 gap-4">
                    <div>
                        <InputLabel className='py-1 text-white'>Employee Name</InputLabel>
                        <TextInput className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1" />
                    </div>
                    <div>
                        <InputLabel className='py-1 text-white'>Basic Pay</InputLabel>
                        <TextInput className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1" />
                    </div>
                </CardWrapper>
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
    </>
    )
}