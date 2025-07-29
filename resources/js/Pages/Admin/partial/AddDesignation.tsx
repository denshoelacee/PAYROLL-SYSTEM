import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import { JobTitles } from "@/types";
import { GridColDef } from "@mui/x-data-grid";
import { FaRegEdit } from "react-icons/fa";
import {FaRegTrashCan} from "react-icons/fa6"

type Props = {
    jobTitleList : JobTitles[]
}
export default function AddDesignation({jobTitleList}:Props) {
        
    const columns: GridColDef[] = [
        {field: 'designation', headerName: 'Designation Name', flex:1, align:'center',headerAlign:'center'},
        {field: 'actions', headerName: 'Actions', flex:1,headerAlign:'center',sortable:false,renderCell: (params) => (
            <div className="flex gap-2 pt-1 items-center justify-center">
                <div className="group  h-12 w-9 flex flex-col items-center justify-center cursor-pointer px-2 hover:blue-green-500">
                    <FaRegEdit className="mb-[5px] w-5 h-5 text-blue-500 transition-all duration-300 group-hover:text-blue-500 group-hover:hidden group-hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
                    <p className="absolute text-[13px] text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                    Edit
                    </p>
                </div>
                <div className="group h-12 w-9 flex flex-col items-center justify-center cursor-pointer px-2 hover:border-red-500">
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
        </>
    );
}