import Table from "@/Components/Table"
import AdminLayout from "@/Layouts/AdminLayout"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { GridColDef } from "@mui/x-data-grid"


export default function ViewReport({viewReport,headerMonthTitle}){
    console.log(viewReport)
    const columns:GridColDef[] = [
        {
            field: 'user_id',
            headerName: 'No.',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            sortable: false,
        },
        {
            field: 'employee_name',
            headerName: 'Name',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            sortable: false,
        },
        {
            field: 'holding_tax',
            headerName: 'Holding Tax',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            sortable: false,
        },
        {
            field: 'rlip',
            headerName: 'RLIP',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            sortable: false,
        },
        {
            field: 'basic_salary',
            headerName: 'Basic Salary',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            sortable: false,
        },
    ]
    console.log(viewReport)
    return(
        <>
            <div className="bg-mainColor p-5 h-screen">
                <Table
                rows={viewReport}
                columns={columns}
                hideFooter={true}
                pageSize={12}
                getRowId={(row) => row.user_id}
                />
            </div>
        </>
    ) 
}