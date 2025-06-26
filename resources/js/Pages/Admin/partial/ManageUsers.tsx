import {Employee, PageProps } from '@/types';
import Search from '@/Components/Search';
import PrimaryButton  from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { useState, useEffect, FormEventHandler } from 'react';
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
import { useForm, usePage } from '@inertiajs/react';
import { LiaCheckSolid } from 'react-icons/lia';
import { FaRegTrashCan } from "react-icons/fa6";
import { SuccessMessage,ErrorMessage } from '@/Components/Alert';




export default function ManageUserPartial({ employees}: PageProps<{employees:Employee[]}>) {
        const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);

        const [approveModal, setApproveModal] = useState(false);
        const [rejectModal, setRejectModal] = useState(false);
        const [anchorEl, setAnchorEl] = useState(null);
        const [selectedRow, setSelectedRow] = useState<Employee | null>(null);
        const [searchQuery, setSearchQuery] = useState('');
        const filteredRows = searchHooks(searchQuery, employees);
    
        const handleOpenPopover = (
            event: any,
            row: Employee,
            action: 'approve' | 'reject'
            ) => {
            setSelectedRow(row);
            setActionType(action); // set whether it's approve or reject
            setApproveModal(true); // or `setRejectModal(true)` if you want different modals
        };

        const { data, setData, post } = useForm<{}>({
        user_id: '',
        });

        const handleSubmitAction = () => {
        if (!selectedRow || !actionType) return;

        setData({ user_id: selectedRow.user_id });

        if (actionType === 'approve') {
            post(route('admin.approve',selectedRow.user_id));
        } else if (actionType === 'reject') {
            post(route('admin.reject',selectedRow.user_id));
        }

        setApproveModal(false);
        setSelectedRow(null);
        setActionType(null);
        };

        const handleClose = () => {
            setApproveModal(false)
        }

        const {message}:any = usePage().props;
        const columns: GridColDef[] = [
            { field: 'employee_id', headerName: ' ID', flex:1, headerAlign: 'center', align: 'center' },
            { field: 'first_name', headerName: 'First name', flex:1, headerAlign: 'center', align: 'center' },
            { field: 'last_name', headerName: 'Last name',flex:1, headerAlign: 'center', align: 'center' },
            { field: 'designation', headerName: 'Designation', flex:1, headerAlign: 'center', align: 'center' },
            { field: 'department', headerName: 'Department', flex:1, headerAlign: 'center', align: 'center' },
            { field: 'employment_type', headerName: 'Access Type', flex:1, headerAlign: 'center', align: 'center' },
            {
                field: 'action',
                headerName: 'Actions',
                flex:1,
                headerAlign: 'center',
                align: 'center',
                sortable: false,
                renderCell: (data:any) => (
                    <>
                    {/*<div className="flex justify-center place-items-center gap-2 pt-2">
                        <SecondaryButton className="text-sm border-none" onClick={(e) => handleOpenPopover(e, data.row)}>
                            <HiOutlineDotsVertical size={25} />
                        </SecondaryButton>
                    </div>*/}
                    <div className="flex gap-2 justify-center">
                        <div className=" mt-1 flex flex-col items-center">
                        <div onClick={(e) => handleOpenPopover(e, data.row, 'approve')} className="group  h-12 w-9 flex flex-col items-center justify-center cursor-pointer px-2 hover:border-green-500">
                            <LiaCheckSolid className="mb-[5px] w-5 h-5 text-green-500 transition-all duration-300 group-hover:text-green-500 group-hover:hidden group-hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
                            <p className="absolute text-[11px] text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                            Approve
                            </p>
                        </div>
                    </div>
                    <p className='mt-5 h-5 border'></p>
                    <div className=" mt-1 flex flex-col items-center">
                        <div onClick={(e) => handleOpenPopover(e, data.row, 'reject')} className="group h-12 w-9 flex flex-col items-center justify-center cursor-pointer px-2 hover:border-red-500">
                            <FaRegTrashCan  className="mb-[5px] w-5 h-5 text-red-500 transition-all duration-300 group-hover:text-red-500 group-hover:hidden group-hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
                            <p className="absolute text-[11px] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                            Reject
                            </p>
                        </div>
                    </div>
                    </div>

                    </>
                )
            }
        ];

        
    return(
    <>
        <div className="flex justify-between gap-2 sm:justify-end  md:justify-end md:gap-5  ">
        <Search value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
         {message.success && (
                                <SuccessMessage className='my-2 ' success={message.success}/>
        
                            )}
                            {message.error && (
                                <ErrorMessage className="my-2" error={message.error}/>
                            )}
        <div className="w-full overflow-x-auto scrollbar-hidden">
            <div className='my-5 min-w-[900px] h-[650px] sm:h-[650px] md:h-[750px] lg:h[800px] overflow-y-auto scrollbar-hidden '>
                <div className="bg-[#16423C] border-[1px] border-button-border-color rounded-lg">
                    <div className="text-white px-10 py-3 text-xl">Pending Approval</div>
                    <Table
                    rows={filteredRows}
                    columns={columns}
                    height={650}
                    getRowId={(row) => row.employee_id}
                    className="employee-table"
                />
                </div>
            </div>
        </div>
        <Modal show={approveModal} onClose={() => setApproveModal(false)} maxWidth='sm'>
            {actionType && selectedRow && (
                <div className="p-6">
                <h2 className="text-lg font-bold mb-4 text-white">
                    {actionType === 'approve' ? 'Approve User' : 'Reject User'}
                </h2>
                <p className="text-white mb-4">
                    Are you sure you want to {actionType} this user?    
                </p>
                    <div className="flex justify-evenly gap-3 py-3">
                        <PrimaryButton className="py-0" onClick={handleSubmitAction}>
                        Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}
                    </PrimaryButton>
                    <PrimaryButton onClick={handleClose}>
                        Close
                    </PrimaryButton>
                    </div>
                </div>
            )}
            </Modal>

        {/* Edit Modal */}
        <Modal show={rejectModal} onClose={() => setRejectModal(false)} maxWidth="lg">
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
                <PrimaryButton className='text-md mt-4' onClick={() => setRejectModal(false)}>Save</PrimaryButton>
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
                        if(selectedRow){
                            setData({user_id: selectedRow.user_id})
                            post(route('admin.approve', selectedRow.user_id));
                        }
                        setAnchorEl(null);
                    }}
>
                    Approve
                </button>
                <button
                    className="w-full text-left px-4 py-2 hover:text-mainColor hover:bg-green-100 "
                    onClick={() => {
                        if(selectedRow){
                            setData({user_id: selectedRow.user_id})
                            post(route('admin.reject', selectedRow.user_id));
                        }
                        setAnchorEl(null);
                    }}
                >
                    Reject
                </button>
            </div>
        </Popover>
    </>
    )
}