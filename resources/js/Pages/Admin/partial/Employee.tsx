import {Employee, PageProps,JobTitles} from '@/types';
import Search from '@/Components/Search';
import PrimaryButton  from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { useState, useMemo,FormEventHandler, useEffect} from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import { IoMdAdd } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import CardWrapper from '@/Components/CardWrapper';
import InputLabel from '@/Components/InputLabel';
import Table from '@/Components/Table';
import { Popover } from '@mui/material';
import searchHooks from '@/hooks/searchHooks';
import { GridColDef } from '@mui/x-data-grid';
import style from '../../../styles/style.css';
import { router, useForm } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import { RiArrowDropDownLine } from 'react-icons/ri';
import TextInputGroup from '@/Components/TextInputGroup';

type Props = PageProps<{
    userList: Employee[];
    jobtitles: JobTitles[];
    auth?: PageProps['auth'];
}>;
export default function EmployeePartial({ userList,jobtitles}: Props) {
        const [addModal, setAddModal] = useState(false);
        const [editModal, setEditModal] = useState(false);
        const [deleteModal, setDeleteModal] = useState(false);
        const [anchorEl, setAnchorEl] = useState(null);
        const [selectedRow, setSelectedRow] = useState<Employee | null>(null);
        const [searchQuery, setSearchQuery] = useState('');
        const [selectDepartment, setSelectDepartment] = useState('Select Department');
        const [selectDesignation, setSelectDesignation] = useState('Select Designation');
        const [selectRole, setSelectRole] = useState('Select Role');
        const [selectEmploymentType, setSelectEmploymentType] = useState('Select Employment Type');
        
        const role = ['Admin','User'];
        const employmenttype = ['Regular', 'Part-Time']

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
        else if(field === 'role'){
            setSelectRole(value)
        }
        else if(field === 'employment_type'){
            setSelectEmploymentType(value)
        } 
        setData(field, value); 
    };

        const processedData = useMemo(() => {
            return userList.map((e) => ({
                ...e,
                full_name: `${e.last_name}, ${e.first_name}`,
            }));
        }, [userList]);

        const filteredRows = searchHooks(searchQuery, processedData);

        const { data, setData, post,reset} = useForm<any>({
                user_id:'',
                employee_id: '',
                last_name: '',
                first_name: '',
                designation: '',
                department: '',
                employment_type:'',
                basic_pay:'',
                role:''
            });


        useEffect(() => {
        if (editModal && selectedRow) {
                setData({
                    employee_id: selectedRow.employee_id || '',
                    first_name: selectedRow.first_name || '',
                    last_name: selectedRow.last_name || '',
                    designation: selectedRow.designation || '',
                    department: selectedRow.department || '',
                    employment_type: selectedRow.employment_type || '',
                    basic_pay: selectedRow.basic_pay || '',
                    role: selectedRow.role || '',
                });
                setSelectDepartment(selectedRow.department || 'Select Department');
                setSelectDesignation(selectedRow.designation || 'Select Designation');
                setSelectRole(selectedRow.role || 'Select Role');
                setSelectEmploymentType(selectedRow.employment_type || 'Select Employment Type');
            }else{
                setData({
                    employee_id: '',
                    last_name: '',
                    first_name: '',
                    designation: '',
                    department: '',
                    employment_type:'',
                    basic_pay:'',
                    role:''
                })
                setSelectDepartment('Select Department');
                setSelectDesignation('Select Designation');
                setSelectRole('Select Role');
                setSelectEmploymentType('Select Employment Type');
            }
        }, [editModal, selectedRow]);

        const addSubmit: FormEventHandler = (e) => {
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
        
        const deleteSubmit = () => {
            if (!selectedRow?.user_id) return;      

            router.delete(route('delete.account', selectedRow.user_id), {
                onSuccess: () =>{
                    setDeleteModal(false)
                }
            });
        setAnchorEl(null);  

        };

        const updateSubmit: FormEventHandler = (e) => {
            e.preventDefault();
            if (!selectedRow?.user_id) return;

            router.patch(route('update.account', selectedRow.user_id), data, {
                onSuccess: () => {
                setEditModal(false);
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

        const handleDelete = () => {
            setAnchorEl(null)
            setDeleteModal(true);
        }

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;

            if (
                (name === 'employee_id' && /^[0-9]*$/.test(value)) ||
                (name === 'basic_pay' && /^\d*\.?\d*$/.test(value))
            ) {
                setData(name, value);
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
        <Modal show={addModal} onClose={() => setAddModal(false)} maxWidth="2xl" className='h-[600px]' >
            <form onSubmit={addSubmit} >
            <div className="p-6 space-y-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4 text-white">Add New Employee</h2>
                    <CardWrapper className="justify-between p-3 gap-4">
                        <TextInputGroup 
                            label='Employee ID*' 
                            id='employee_id' 
                            type='text' 
                            value={data.employee_id}
                            onChange={handleInputChange}
                            inputMode="numeric"
                        />
                        
                    <div className='flex justify-between gap-4 w-full'>
                        <TextInputGroup 
                            label='First Name*' 
                            id='first_name' 
                            type='text' 
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                        />
                        <TextInputGroup 
                            label='Last Name*' 
                            id='last_name' 
                            type='text' 
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                        />
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
                            <Dropdown.Content ableSearch={true} contentClasses="bg-gray-300 w-full max-h-[200px] overflow-y-auto p-0" align="left">
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
                            <Dropdown.Content ableSearch={true} contentClasses=" bg-gray-300 p-0 w-full max-h-[200px] overflow-y-auto" align="left">
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
                    <TextInputGroup 
                        label='Basic Pay*' 
                        id='basic_pay' 
                        type='text' 
                        value={data.basic_pay}
                        onChange={handleInputChange}
                    />
                </CardWrapper>
                <CardWrapper className=" p-3 gap-4 flex">
                    <div className="w-full">
                        <InputLabel htmlFor="role" value="Role *" className='text-white' />
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="bg-transparent border       text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full">
                                    <p className='text-sm'>{selectRole}</p>
                                    <RiArrowDropDownLine className={` text-2xl transition-transform duration-500 ease-in-out`}/>
                                </button>
                            </Dropdown.Trigger> 
                            <Dropdown.Content contentClasses="w-full bg-gray-300" align="left" >
                                {role.map((option, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    id='role'
                                    name='role'
                                    onClick={() => {
                                    handleDropdownSelect(option, 'role');
                                    }}
                                    className="w-full px-4 py-2 text-left bg-gray-300 text-black hover:bg-[#145858] hover:text-white"
                                >
                                    {option}
                                </button>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div className="w-full">
                        <InputLabel htmlFor="employment_type" value="Employment Type *" className='text-white' />
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="bg-transparent border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full">
                                    <p className='text-sm'>{selectEmploymentType}</p>
                                    <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                </button>
                            </Dropdown.Trigger> 
                            <Dropdown.Content contentClasses="bg-gray-300 w-full" align="left" >
                                {employmenttype.map((option, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    id='role'
                                    name='role'
                                    onClick={() => {
                                    handleDropdownSelect(option, 'employment_type');
                                    }}
                                    className="w-full px-4 py-2 text-left bg-gray-300 text-black hover:bg-[#145858] hover:text-white"
                                >
                                    {option}
                                </button>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </CardWrapper>
                <PrimaryButton className='text-md mt-4'>Save</PrimaryButton>
            </div>
            </form>
        </Modal>
        {/* Edit Modal */}
        <Modal show={editModal} onClose={() => setEditModal(false)} maxWidth="2xl">
            <form onSubmit={updateSubmit}>
            <div className="p-6 space-y-4">
                <h2 className="text-lg font-bold mb-4 text-white">Edit: {[selectedRow?.employee_id+" - ", selectedRow?.last_name + ", " ,selectedRow?.first_name]}</h2>
                {/*<h2 className="text-lg font-bold mb-4 text-white">Edit Employee</h2>*/}   
                
                <CardWrapper className="justify-between p-3 gap-4">
                        <TextInputGroup 
                            label='Employee ID*' 
                            id='employee_id' 
                            type='text' 
                            value={data?.employee_id|| ""}
                            onChange={handleInputChange}
                            inputMode="numeric"
                            disabled
                            
                        />
                    <div className='flex justify-between gap-4 w-full'>
                        <TextInputGroup 
                            label='First Name*'     
                            id='first_name' 
                            type='text' 
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                        />
                        <TextInputGroup 
                            label='Last Name*' 
                            id='last_name' 
                            type='text' 
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                        />
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
                            <Dropdown.Content contentClasses="bg-gray-300 w-full max-h-[200px] overflow-y-auto p-0" align="left">
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
                            <Dropdown.Content contentClasses=" bg-gray-300 p-0 w-full max-h-[200px] overflow-y-auto" align="left">
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
                    <TextInputGroup 
                        label='Basic Pay*' 
                        id='basic_pay' 
                        type='text' 
                        value={data.basic_pay}
                        onChange={handleInputChange}
                    />
                </CardWrapper>
                <CardWrapper className=" p-3 gap-4 flex">
                    <div className="w-full">
                        <InputLabel htmlFor="role" value="Role *" className='text-white' />
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="bg-transparent border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full">
                                    <p className='text-sm'>{selectRole}</p>
                                    <RiArrowDropDownLine className={` text-2xl transition-transform duration-500 ease-in-out`}/>
                                </button>
                            </Dropdown.Trigger> 
                            <Dropdown.Content contentClasses="w-full bg-gray-300" align="left" >
                                {role.map((option, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    id='role'
                                    name='role'
                                    onClick={() => {
                                    handleDropdownSelect(option, 'role');
                                    }}
                                    className="w-full px-4 py-2 text-left bg-gray-300 text-black hover:bg-[#145858] hover:text-white"
                                >
                                    {option}
                                </button>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div className="w-full">
                        <InputLabel htmlFor="employment_type" value="Employment Type *" className='text-white' />
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="bg-transparent border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full">
                                    <p className='text-sm'>{selectEmploymentType}</p>
                                    <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                </button>
                            </Dropdown.Trigger> 
                            <Dropdown.Content contentClasses="bg-gray-300 w-full" align="left" >
                                {employmenttype.map((option, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    id='role'
                                    name='role'
                                    onClick={() => {
                                    handleDropdownSelect(option, 'employment_type');
                                    }}
                                    className="w-full px-4 py-2 text-left bg-gray-300 text-black hover:bg-[#145858] hover:text-white"
                                >
                                    {option}
                                </button>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </CardWrapper>
                <PrimaryButton className='text-md mt-4'>Save</PrimaryButton>
                
            </div>
            </form>
        </Modal>
        
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            className='w-32'
            disableScrollLock={true}

        >
            <div className=" w-48 bg-mainColor shadow-md text-sm text-white ">
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
                    onClick={handleDelete}
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
        <Modal show={deleteModal} onClose={() => setDeleteModal(false)} maxWidth='sm' >
                <div className="p-6">
                <h2 className="text-lg font-bold mb-4 text-white">
                    Delete User {selectedRow?.employee_id + " - " + selectedRow?.first_name + " " + selectedRow?.last_name}
                </h2>
                <p className="text-white mb-4">
                    Are you sure you want to this user?    
                </p>
                    <div className="flex justify-evenly gap-3 py-3">
                        <PrimaryButton className="py-2"onClick={deleteSubmit}>
                        Confirm
                        </PrimaryButton>
                        <PrimaryButton className="py-2"onClick={() => {
                            setDeleteModal(false)}}>
                        Close
                        </PrimaryButton>
                    
                    </div>
                </div>
        </Modal>
    </>
    )
}

