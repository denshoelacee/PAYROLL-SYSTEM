import Table from "@/Components/Table";
import { GridColDef } from "@mui/x-data-grid";
import { FaRegEdit } from "react-icons/fa";
import {FaRegTrashCan} from "react-icons/fa6"
import { JobTitles } from "@/types";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState, FormEventHandler} from "react";
import { router, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import TextInputGroup from "@/Components/TextInputGroup";

type Props = {
    jobTitleList : JobTitles[]
}
export default function AddDepartment({jobTitleList}:Props) {
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState<JobTitles | null>(null);
    const {data, setData, post, reset } = useForm<any>({
        department:'',
        checker:'toDepartment'
    });
    
    const departmentRows = jobTitleList
    .filter(dep => dep.department && dep.department.toUpperCase() !== 'NULL')
    .map((dep) => ({
        id: dep.id,
        department: dep.department
    }));
    const handleSubmit = (actionType: 'toDepartment'): FormEventHandler => {
        return (e) => {
            e.preventDefault();
            setData('checker', actionType);
            post(route('admin.create.positions'), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            }); 
        };
    };

    const HandleEditSubmit =(actionType: 'toDepartment'): FormEventHandler => {
                return (e) => {
                e.preventDefault();
                    setData('checker', actionType); 
                post(route(`admin.update.position`,selectedRow?.id), {
                    onSuccess: () => {
                    setEditModal(false);
                    reset();
                    },
                });
                };
            };
            const deleteSubmit = (actionType: 'toDepartment'): FormEventHandler => {
                return (e) => {
                    e.preventDefault();
                    setData('checker', actionType);
    
                    router.post(
                        route('admin.delete.position', selectedRow?.id),
                        {
                            ...data,
                            _method: 'delete', 
                        },
                        {
                            onSuccess: () => {
                                setDeleteModal(false);
                                reset();
                            },
                        }
                    );
                };
            };
    const columns: GridColDef[] = [
        {field: 'department', headerName: 'Department Name', flex:1, align:'center',headerAlign:'center'},
        {field: 'actions', headerName: 'Actions', flex:1,headerAlign:'center',sortable:false,renderCell: (params) => (
            <div className="flex gap-2 pt-1 items-center justify-center">
                <div  onClick={() => {
                            setSelectedRow(params.row);
                            setData('department', params.row.department); 
                            setEditModal(true);
                        }}className="group  h-12 w-9 flex flex-col items-center justify-center cursor-pointer px-2 hover:blue-green-500">
                    <FaRegEdit className="mb-[5px] w-5 h-5 text-blue-500 transition-all duration-300 group-hover:text-blue-500 group-hover:hidden group-hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
                    <p className="absolute text-[13px] text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                    Edit
                    </p>
                </div>
                <div onClick={() => {
                            setSelectedRow(params.row);
                            setDeleteModal(true);
                        }}className="group h-12 w-9 flex flex-col items-center justify-center cursor-pointer px-2 hover:border-red-500">
                    <FaRegTrashCan   className="mb-[5px] w-5 h-5 text-red-500 transition-all duration-300 group-hover:text-red-500 group-hover:hidden group-hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
                    <p className="absolute text-[13px] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                    Delete
                    </p>
                </div>
            </div>
        )}
    ]
    return (
        <>
            <div className="h-[430px] overflow-auto scrollbar-hidden">
                <Table
                rows={departmentRows}
                columns={columns}
                hideFooter={true}
                pageSize={100}
                sx={{
                    marginBottom :0,
                    
                }}
                />
            </div>
            <div className="h-12 border px-5 flex items-center justify-center">
                <PrimaryButton onClick={() => {
                            setShowModal(true)
                        }} className="py-1.5">
                    Add New Department
                </PrimaryButton>
            </div>
            {/* Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="sm">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4 text-white">Add Department Type</h2>
                    <TextInputGroup
                        id="department"
                        label="Department"
                        type="text"
                        placeholder={`Enter Department Type`}  
                        value={data.department}
                        onChange={(e) => setData('department', e.target.value)}
                    />
                    <div className="flex justify-end gap-2 mt-3">
                        <PrimaryButton onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded">
                        Cancel
                        </PrimaryButton>
                        <PrimaryButton onClick={handleSubmit('toDepartment')}>Submit</PrimaryButton>
                    </div>
                </div>
            </Modal>
            <Modal show={editModal} onClose={() => setEditModal(false)} maxWidth="sm">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4 text-white">Edit Department</h2>
                    <TextInputGroup
                        id="department"
                        label="Department"
                        type="text"
                        placeholder={`Enter Department`}
                        value={data.department}
                        onChange={(e) => setData('department', e.target.value)}
                    />
                    <div className="flex justify-end gap-2 mt-3">
                        <PrimaryButton onClick={() => setEditModal(false)} className="bg-gray-300 px-4 py-2 rounded">
                        Cancel
                        </PrimaryButton>
                        <PrimaryButton onClick={HandleEditSubmit('toDepartment')}>Submit</PrimaryButton>
                    </div>
                </div>
            </Modal>
            <Modal show={deleteModal} onClose={() => setDeleteModal(false)} maxWidth='sm' >
                    <div className="p-6">
                    <h2 className="text-lg font-bold mb-4 text-white">
                        Delete Department
                    </h2>
                    <p className="text-white mb-4">
                        Are you sure you want to Delete this Department? {selectedRow?.department}   
                    </p>
                        <div className="flex justify-evenly gap-3 py-3">
                            <PrimaryButton onClick={deleteSubmit('toDepartment')}className="py-2">
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
    );
}