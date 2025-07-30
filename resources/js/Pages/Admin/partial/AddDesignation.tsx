import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import TextInputGroup from "@/Components/TextInputGroup";
import { JobTitles } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { GridColDef } from "@mui/x-data-grid";
import { useState,FormEventHandler } from "react";
import { FaRegEdit } from "react-icons/fa";
import {FaRegTrashCan} from "react-icons/fa6"

type Props = {
    jobTitleList : JobTitles[]
}
export default function AddDesignation({jobTitleList}:Props) {
       
      const [showModal, setShowModal] = useState(false);
          const [editModal, setEditModal] = useState(false)
          const [deleteModal, setDeleteModal] = useState(false)
        const [selectedRow, setSelectedRow] = useState<JobTitles | null>(null);
    
          const {data, setData, post, reset } = useForm<any>({
            designation:''
          });
        
    
        const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
            post(route(`adminAdd.Designation`), {
                onSuccess: () => {
                setShowModal(false);
                reset();
                },
            });
        };
    
        const HandleEditSubmit: FormEventHandler = (e) => {
        e.preventDefault();
            post(route(`adminUpdate.Designation`,selectedRow?.id), {
                onSuccess: () => {
                setEditModal(false);
                reset();
                },
            });
        };
        
        const deleteSubmit = () => {
            if (!selectedRow?.id) return;      
            router.delete(route('adminDelete.Designation', selectedRow.id), {
                onSuccess: () =>{
                    setDeleteModal(false)
                }
            });
        
            };
    const columns: GridColDef[] = [
        {field: 'designation', headerName: 'Designation Name', flex:1, align:'center',headerAlign:'center'},
        {field: 'actions', headerName: 'Actions', flex:1,headerAlign:'center',sortable:false,renderCell: (params) => (
            <div className="flex gap-2 pt-1 items-center justify-center">
                <div onClick={() => {
                            setSelectedRow(data.row);
                            setData('designation', data.row.designation); 
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
                rows={jobTitleList}
                columns={columns}
                hideFooter={true}
                pageSize={100}
                sx={{
                    marginBottom :0,
                    
                }}
                />
            </div>
            <div className="h-12 border px-5 flex items-center justify-center">
              <PrimaryButton  className="py-1.5">
                Add New Designation
              </PrimaryButton>
            </div>

                         {/* Modal */}
                        <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="sm">
                            <form>
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-4 text-white">Add Designation Type</h2>
                                <TextInputGroup
                                    id="designation"
                                    label="Designation"
                                    type="text"
                                    placeholder={`Enter Designation Type`}
                                    value={data.designation}
                                    onChange={(e) => setData('designation', e.target.value)}
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
                                <h2 className="text-lg font-semibold mb-4 text-white">Edit Designation</h2>
                                <TextInputGroup
                                    id="designation"
                                    label="Designation"
                                    type="text"
                                    placeholder={`Enter Designation`}
                                    value={data.designation}
                                    onChange={(e) => setData('designation', e.target.value)}
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
                                    Delete Designation
                                </h2>
                                <p className="text-white mb-4">
                                    Are you sure you want to Delete this Designation? {selectedRow?.designation}   
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