
import {Employee, PageProps } from '@/types';
import Search from '@/Components/Search';
import PrimaryButton  from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { useState, useEffect, FormEventHandler } from 'react';
import Table from '@/Components/Table';
import searchHooks from '@/hooks/searchHooks';
import { GridColDef,GridRowSelectionModel} from '@mui/x-data-grid';
import { useForm } from '@inertiajs/react';
import { LiaCheckSolid } from 'react-icons/lia';
import { FaRegTrashCan } from "react-icons/fa6";


type Props = PageProps <{
    employees: Employee[];
}>

export default function ManageUserPartial({ employees}: Props) {
    const [actionType, setActionType] = useState<'approve' | 'reject' | 'batch-approve' | 'batch-reject' | null>(null);
    const [approveModal, setApproveModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<Employee | null>(null);
    const [selectedRows, setSelectedRows] = useState<Employee[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const filteredRows = searchHooks(searchQuery, employees);
    const [batchSubmit, setBatchSubmit] = useState(false)
    const [submitTrigger, setSubmitTrigger] = useState<'batch-approve' | 'batch-reject' | null>(null);

    const routeMap = {
            'approve': 'admin.approve',
            'reject': 'admin.reject',
            'batch-approve': 'admin.users.batch-approve',
            'batch-reject': 'admin.batch-reject'
        };  
    // Handle batch action opening
    const handleOpenBatchAction = (action: 'batch-approve' | 'batch-reject') => {
        setActionType(action);
        setBatchSubmit(true);
    };

    // Handle single row action opening (existing)
    const handleOpenPopover = (
        event: any,
        row: Employee,
        action: 'approve' | 'reject'
    ) => {
        setSelectedRow(row);
        setActionType(action);
        setApproveModal(true);
    };

    // Form handling
    const { data, setData, post } = useForm<{
        user_id?: number;
        user_ids?: number[];
    }>({
        user_id: undefined,
        user_ids: [],
    });

    // Submit handler for both single and batch actions
    const handleSubmitAction = () => {
        

        if (!actionType) return;
        if (actionType === 'approve' || actionType === 'reject') {
            if (!selectedRow) return;
            setData({ user_id: selectedRow.user_id });
        } 

        if (actionType === 'batch-approve' || actionType === 'batch-reject') {
            if (!selectedRows) return;
            const ids = selectedRows.map((row) => row.user_id);
            setData('user_ids', ids);
            setSubmitTrigger(actionType);
        }
        
        post(route(routeMap[actionType], selectedRow?.user_id), {
            onSuccess: () => {
                setSelectedRows([]);
            }
        });

        setApproveModal(false);
        setSelectedRow(null);
        setActionType(null);
    };

    useEffect(() => {
        if (submitTrigger && (submitTrigger === 'batch-approve' || submitTrigger === 'batch-reject') && data.user_ids?.length) {
            post(route(routeMap[submitTrigger]), {
                onSuccess: () => {
                    setSelectedRows([]);    
                    setBatchSubmit(false);
                    setSubmitTrigger(null); 
                }
            });
        }
    }, [submitTrigger, data.user_ids]);

        const handleClose = () => {
            setApproveModal(false)
        }

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
        <div className="flex justify-between gap-2 sm:justify-end  md:justify-end md:gap-5 ">
        <Search value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <div className="flex gap-2 w-72">
                <PrimaryButton 
                    onClick={() => handleOpenBatchAction('batch-approve')}
                    disabled={selectedRows.length === 0}
                    className= {selectedRows.length === 0 ? 'opacity-50 cursor-not-allowed ' : ''}
                >
                   <div className="w-[100px]">
                     <p className='text-[10px]'>Approve ({selectedRows.length})</p> 
                   </div>
                </PrimaryButton>
                <PrimaryButton 
                    onClick={() => handleOpenBatchAction('batch-reject')}
                    disabled={selectedRows.length === 0}
                    className={selectedRows.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                >
                    <p className='text-[10px]'>Reject ({selectedRows.length})</p>
                </PrimaryButton>
            </div>
        </div>
        <div className="w-full overflow-x-auto scrollbar-hidden">
            <div className='my-5 min-w-[900px] h-[650px] sm:h-[650px] md:h-[750px] lg:h[800px] overflow-y-auto scrollbar-hidden '>
                <div className="bg-[#16423C] border-[1px] border-button-border-color rounded-lg">
                    <div className="text-white px-10 py-3 text-xl">Pending Approval</div>
                    <Table
                    checkboxSelection
                    rows={filteredRows}
                    columns={columns}
                    height={650}
                    pageSize={10}     
                                        pageSizeOptions={[10]}    
                    getRowId={(row) => {return row.user_id;}}
                    onRowSelectionModelChange={(selection) => {
                    const selectionArray =
                        selection && typeof selection === 'object' && 'ids' in selection
                        ? Array.from(selection.ids)
                        : [];

                    const selected = employees.filter((row) =>
                        selectionArray.includes(row.user_id)
                    );

                    setSelectedRows(selected);
                    }}
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
                        <PrimaryButton className="py-2"onClick={handleSubmitAction}>
                        Confirm
                    </PrimaryButton>
                    <PrimaryButton onClick={handleClose}>
                        Close
                    </PrimaryButton>
                    </div>
                </div>
            )}
            </Modal>

            <Modal show={batchSubmit} onClose={() => setApproveModal(false)} maxWidth='sm'>
            {actionType && selectedRows && (
                <div className="p-6">
                <h2 className="text-lg font-bold mb-4 text-white">
                    {actionType === 'batch-approve' ? 'Approve User' : 'Reject User'}
                </h2>
                <p className="text-white mb-4">
                    Are you sure you want to {actionType} this user?    
                </p>
                    <div className="flex justify-evenly gap-3 py-3">
                        <PrimaryButton className="py-2"onClick={handleSubmitAction}>    
                        Confirm
                    </PrimaryButton>
                    <PrimaryButton onClick={handleClose}>
                        Close
                    </PrimaryButton>
                    </div>
                </div>
            )}
            </Modal>
    </>
    )
}