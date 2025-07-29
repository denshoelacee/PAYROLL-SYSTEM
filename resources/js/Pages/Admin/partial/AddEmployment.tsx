import Table from "@/Components/Table";
import { GridColDef } from "@mui/x-data-grid";
import { FaRegEdit } from "react-icons/fa";
import {FaRegTrashCan} from "react-icons/fa6"
import { EmploymentTypes } from "@/types";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState, FormEventHandler} from "react";
import TextInputGroup from "@/Components/TextInputGroup";
import Modal from "@/Components/Modal";
import { router, useForm } from "@inertiajs/react";

type Props = {
    empTypeList : EmploymentTypes[]
}
export default function AddEmployment({empTypeList}:Props) {
      const [showModal, setShowModal] = useState(false);
      const [editModal, setEditModal] = useState(false)
      const [deleteModal, setDeleteModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState<EmploymentTypes | null>(null);

      const {data, setData, post, reset } = useForm<any>({
        employment_type_list:''
      });
    

    const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
        post(route(`adminAdd.EmploymentType`), {
            onSuccess: () => {
            setShowModal(false);
            reset();
            },
        });
    };

    const HandleEditSubmit: FormEventHandler = (e) => {
    e.preventDefault();
        post(route(`adminUpdate.EmploymentType`,selectedRow?.id), {
            onSuccess: () => {
            setEditModal(false);
            reset();
            },
        });
    };
    
    const deleteSubmit = () => {
        if (!selectedRow?.id) return;      
        router.delete(route('adminDelete.EmploymentType', selectedRow.id), {
            onSuccess: () =>{
                setDeleteModal(false)
            }
        });
    
        };


    const columns: GridColDef[] = [
        {field: 'employment_type_list', headerName: 'Employment Type', flex:1, align:'center',headerAlign:'center'},
        {field: 'actions', headerName: 'Actions', flex:1,headerAlign:'center',sortable:false,renderCell: (data:any) => (
            <div className="flex gap-2 pt-1 items-center justify-center">
                <div onClick={() => {
                            setSelectedRow(data.row);
                            setData('employment_type_list', data.row.employment_type_list); 
                            setEditModal(true);
                        }} className="group  h-12 w-9 flex flex-col items-center justify-center cursor-pointer px-2 hover:blue-green-500">
                    <FaRegEdit className="mb-[5px] w-5 h-5 text-blue-500 transition-all duration-300 group-hover:text-blue-500 group-hover:hidden group-hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
                    <p className="absolute text-[13px] text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                    Edit
                    </p>
                </div>
                <div onClick={() => {
                            setSelectedRow(data.row);
                            setDeleteModal(true);
                        }} className="group h-12 w-9 flex flex-col items-center justify-center cursor-pointer px-2 hover:border-red-500">
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
                rows={empTypeList}
                columns={columns}
                hideFooter={true}
                pageSize={100}
                sx={{
                    marginBottom :0,
                    
                }}
                />
            </div>
            <div className="h-12 border px-5 flex items-center justify-center">
                <PrimaryButton  onClick={() => {
                    setShowModal(true)
                }}className="py-1.5">
                    Add New Employment Type
                </PrimaryButton>
            </div>

             {/* Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="sm">
                <form>
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4 text-white">Add Employment Type</h2>
                    <TextInputGroup
                        id="employment_type_list"
                        label="Employment Type"
                        type="text"
                        placeholder={`Enter Employment Type`}
                        value={data.employment_type_list}
                        onChange={(e) => setData('employment_type_list', e.target.value)}
                    />
                    <div className="flex justify-end gap-2 mt-3">
                        <PrimaryButton onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded">
                        Cancel
                        </PrimaryButton>
                        <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
                    </div>
                </div>
                </form>
            </Modal>
             <Modal show={editModal} onClose={() => setEditModal(false)} maxWidth="sm">
                <form>
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4 text-white">Edit Employment Type</h2>
                    <TextInputGroup
                        id="employment_type_list"
                        label="Employment Type"
                        type="text"
                        placeholder={`Enter Employment Type`}
                        value={data.employment_type_list}
                        onChange={(e) => setData('employment_type_list', e.target.value)}
                    />
                    <div className="flex justify-end gap-2 mt-3">
                        <PrimaryButton onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded">
                        Cancel
                        </PrimaryButton>
                        <PrimaryButton onClick={HandleEditSubmit}>Submit</PrimaryButton>
                    </div>
                </div>
                </form>
            </Modal>
            <Modal show={deleteModal} onClose={() => setDeleteModal(false)} maxWidth='sm' >
                    <div className="p-6">
                    <h2 className="text-lg font-bold mb-4 text-white">
                        Delete Employment Type
                    </h2>
                    <p className="text-white mb-4">
                        Are you sure you want to this Employment Type? {selectedRow?.employment_type_list}   
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
    );
}