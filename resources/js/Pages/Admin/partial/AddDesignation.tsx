import Table from "@/Components/Table";
import { GridColDef } from "@mui/x-data-grid";
import { FaRegEdit } from "react-icons/fa";
import {FaRegTrashCan} from "react-icons/fa6"

export default function AddDesignation() {
        
    const rows= [
        {
        id: 1,
        departmentName: "Human Resources",
        },
        {
        id: 2, 
        departmentName: "Finance",
        },
        {
        id: 3, 
        departmentName: "Abc",
        },
        {
        id: 4, 
        departmentName: "Dfg",
        },
        {
        id: 5, 
        departmentName: "Efg",
        },
        {
        id: 6, 
        departmentName: "tyu",
        },
        {
        id: 7, 
        departmentName: "iop",
        },
        {
        id: 8, 
        departmentName: "jkg",
        },
        {
        id: 9, 
        departmentName: "sadf",
        },
        
    ]
    const columns: GridColDef[] = [
        {field: 'departmentName', headerName: 'Designation Name', flex:1, align:'center',headerAlign:'center'},
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
                rows={rows}
                columns={columns}
                hideFooter={true}
                pageSize={100}
                sx={{
                    marginBottom :0,
                    
                }}
                />
            </div>
        </>
    );
}