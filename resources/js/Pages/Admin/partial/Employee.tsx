import {Employee, PageProps,JobTitles, EmploymentTypes} from '@/types';
import Search from '@/Components/Search';
import { useState, useMemo} from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import { IoMdAdd } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Table from '@/Components/Table';
import { Popover } from '@mui/material';
import searchHooks from '@/hooks/searchHooks';
import { GridColDef } from '@mui/x-data-grid';
import { router } from '@inertiajs/react';
import EmployeeAddModal from './employeepartials/addModal';
import EmployeeEditModal from './employeepartials/editModal';
import EmployeeDeleteModal from './employeepartials/deleteModal';
type Props = PageProps<{
    userList: Employee[];
    jobtitles: JobTitles[];
    employeeTypeList: EmploymentTypes[];
}>;
export default function EmployeePartial({ userList,jobtitles,employeeTypeList}: Props) {
        const [addModal, setAddModal] = useState(false);
        const [editModal, setEditModal] = useState(false);
        const [deleteModal, setDeleteModal] = useState(false);
        const [anchorEl, setAnchorEl] = useState(null);
        const [selectedRow, setSelectedRow] = useState<Employee | null>(null);
        const [searchQuery, setSearchQuery] = useState('');

        const handleOpenPopover = (event:any, row:Employee) => {
            setAnchorEl(event.currentTarget);
            setSelectedRow(row);
        };

        const processedData = useMemo(() => {
            return userList.map((e) => ({
                ...e,
                full_name: `${e.last_name}, ${e.first_name}`,
            }));
        }, [userList]);

        const filteredRows = searchHooks(searchQuery, processedData);

        const deleteSubmit = () => {
            if (!selectedRow?.user_id) return;      

            router.delete(route('delete.account', selectedRow.user_id), {
                onSuccess: () =>{
                    setDeleteModal(false)
                }
            });
        setAnchorEl(null);  

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


    return(
    <>
        <div className="flex flex-col-reverse sm:justify-end  md:flex-row justify-between gap-2 md:justify-end md:gap-5">
            <div>
                <Search value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="w-full md:w-auto flex justify-end pb-1 md:pb-0">
                <SecondaryButton className="w-36" onClick={() => setAddModal(true)}>    
                    <div className="flex items-center gap-2">
                        <IoMdAdd className='text-custom-word-color font-black text-1xl' />
                        <span className="text-sm">New Employee</span>
                    </div>
                </SecondaryButton>
            </div>
        </div>
        <div className="w-full overflow-x-auto scrollbar-hidden">
            <div className='my-5 min-w-[900px] h-auto overflow-y-auto scrollbar-hidden '>
                <div className="bg-[#16423C] border-[1px] border-button-border-color rounded-lg">
                    <div className="text-white px-10 py-3 text-xl">Employee List</div>
                    <Table
                    rows={filteredRows}
                    columns={columns}
                    getRowId={(row) => row.employee_id}
                    className="employee-table"
                    pageSize={10}     
                    pageSizeOptions={[10,20,50]}     
                />
                </div>
            </div>
        </div>
        {/* Add Modal */}
        {addModal && (
        <EmployeeAddModal show={addModal} onClose={() => setAddModal(false)} employeeTypeList={employeeTypeList} jobtitles={jobtitles}/>
        )}
        {/* Edit Modal */}
        {editModal && (
        <EmployeeEditModal show={editModal} onClose={() => setEditModal(false)} employeeTypeList={employeeTypeList} jobtitles={jobtitles} row={selectedRow as any}/>
        )}
        {/* Delete Modal */}
        {deleteModal && (
        <EmployeeDeleteModal show={deleteModal} onClose={() => setDeleteModal(false)} row={selectedRow as any}  onConfirm={deleteSubmit}/>
        )}
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
            </div>
        </Popover>
        
    </>
    )
}

