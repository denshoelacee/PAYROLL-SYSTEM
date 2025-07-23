import Table from "@/Components/Table";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

export default function AddDepartment() {

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
        {field: 'departmentName', headerName: 'Department Name', flex:1, align:'center',headerAlign:'center'},
        {field: 'actions', headerName: 'Actions', flex:1,headerAlign:'center',sortable:false,renderCell: (params) => (
            <div className="flex gap-2 p-2 items-center justify-center">
                <button className="px-2 py-1 text-sm text-blue-500 hover:text-blue-700">
                    Edit
                </button>   
                <button className="px-2 py-1 text-sm text-red-500 hover:text-red-700">
                    Delete
                </button>
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