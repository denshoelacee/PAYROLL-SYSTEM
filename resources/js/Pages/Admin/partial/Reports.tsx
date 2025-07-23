import Table from "@/Components/Table";
import { GridColDef } from "@mui/x-data-grid";

export default function ReportsPartial() {
        
    const rows = [
        { id: 1, month: "January", totalGross: 50000, totalDeduction: 8000, totalNetPay: 42000 },
        { id: 2, month: "February", totalGross: 52000, totalDeduction: 8200, totalNetPay: 43800 },
        { id: 3, month: "March", totalGross: 51000, totalDeduction: 7900, totalNetPay: 43100 },
        { id: 4, month: "April", totalGross: 53000, totalDeduction: 8500, totalNetPay: 44500 },
        { id: 5, month: "May", totalGross: 54000, totalDeduction: 8700, totalNetPay: 45300 },
        { id: 6, month: "June", totalGross: 55000, totalDeduction: 8900, totalNetPay: 46100 },
        { id: 7, month: "July", totalGross: 56000, totalDeduction: 9000, totalNetPay: 47000 },
        { id: 8, month: "August", totalGross: 57000, totalDeduction: 9100, totalNetPay: 47900 },
        { id: 9, month: "September", totalGross: 58000, totalDeduction: 9200, totalNetPay: 48800 },
        { id: 10, month: "October", totalGross: 59000, totalDeduction: 9300, totalNetPay: 49700 },
        { id: 11, month: "November", totalGross: 60000, totalDeduction: 9400, totalNetPay: 50600 },
        { id: 12, month: "December", totalGross: 61000, totalDeduction: 9500, totalNetPay: 51500 }
    ];

    const columns: GridColDef[] = [
        { field: 'month', headerName: 'Month', flex: 1, align: 'center', headerAlign: 'center',sortable:false},
        { field: 'totalGross', headerName: 'Total Gross', flex: 1, align: 'center', headerAlign: 'center',sortable:false },
        { field: 'totalDeduction', headerName: 'Total Deduction', flex: 1, align: 'center', headerAlign: 'center',sortable:false },
        { field: 'totalNetPay', headerName: 'Total Net Pay', flex: 1, align: 'center', headerAlign: 'center',sortable:false },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            headerAlign: 'center',
            sortable: false,
            renderCell: () => (
            <div className="flex gap-2 p-2 items-center justify-center">
                <button className="px-2 py-1 text-sm text-blue-500 hover:text-blue-700">View</button>
            </div>
            )
        }
    ];

    return (
        <>
            <div className="h-[530px] overflow-auto scrollbar-hidden">
                <Table
                rows={rows}
                columns={columns}
                hideFooter={true}
                pageSize={12}
                
                />
            </div>
        </>
    );
}