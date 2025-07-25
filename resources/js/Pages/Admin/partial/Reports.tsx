import Table from "@/Components/Table";
import { GridColDef } from "@mui/x-data-grid";
import Search from '@/Components/Search'
import Dropdown from '@/Components/Dropdown'
import SecondaryButton from '@/Components/SecondaryButton'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { router } from "@inertiajs/react";
import { useState } from "react";
import { AiOutlineFundView } from "react-icons/ai";

export default function ReportsPartial() {
    const [searchQuery, setSearchQuery] = useState('')

    const handleChange = (year: number) => {
        router.get(route("admin.payroll.summary"), { year }, { preserveState: true });
    };
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
            <div className="flex gap-2 pt-1 items-center justify-center">
                <div className="group  h-12 w-9 flex flex-col items-center justify-center cursor-pointer px-2 hover:blue-green-500">
                    <AiOutlineFundView className="mb-[5px] w-5 h-5 text-blue-500 transition-all duration-300 group-hover:text-blue-500 group-hover:hidden group-hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
                    <p className="absolute text-[13px] text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                    Edit
                    </p>
                </div>
            </div>
            )
        }
    ];

    return (
        <>
            <Dropdown>
                <Dropdown.Trigger>
                <SecondaryButton className="flex w-full justify-between items-center md:w-[200px]">
                    {/*<p className="text-sm">{year || "Select Year"}</p>*/}
                    <RiArrowDropDownLine className="text-2xl transition-transform duration-500 ease-in-out" />
                </SecondaryButton>
                </Dropdown.Trigger>
                <Dropdown.Content contentClasses="w-[200px]" align="left">
                    {/*{availableYears.map((year) => (
                        <button
                        key={year}
                        onClick={() => handleChange(year)}
                        className="block w-full text-left px-4 py-1 hover:bg-mainColor"
                        >
                        {year}
                        </button>
                    ))}*/}
                </Dropdown.Content>
            </Dropdown>
            <div className='py-5'>
                <div className="bg-[#16423C] border-[1px] border-button-border-color rounded-lg w-full">
                    <h2 className="text-lg font-semibold my-3 mx-5 text-white">List of Reports</h2>
                    <div className="h-[530px] overflow-auto scrollbar-hidden">
                        <Table
                            rows={rows}
                            columns={columns}
                            hideFooter={true}
                            pageSize={12}
                        />
                    </div>
                </div>
            </div> 
        </>
    );
}