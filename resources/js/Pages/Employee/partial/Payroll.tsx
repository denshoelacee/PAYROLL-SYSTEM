import Table from "@/Components/Table";
import { GridColDef } from "@mui/x-data-grid";
import Dropdown from '@/Components/Dropdown'
import SecondaryButton from '@/Components/SecondaryButton'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { router } from "@inertiajs/react";
import { AiOutlineFundView } from "react-icons/ai";
import { UserPayroll } from "@/types";
import { Suspense } from "react";


type MonthlySummaryRow = {
    month: number;
    month_name: string;
    assigned_designation: string;
    assigned_department: string;
    payslip_type: string;
};

type Props = {
    userPayslip: MonthlySummaryRow[];
    availableYears: number[];
    selectedYear: string;
};

export default function EmployeePayrollPartial({ selectedYear, availableYears, userPayslip }: Props) {

    const handleChange = (selectedYear: number) => {
        router.get(route("employee.payslip.summary"), { year: selectedYear }, { preserveState: true });
    };
    const handleView = (row: UserPayroll) => {
        if (row?.payslip_id) {
            localStorage.setItem('selectedPayroll', JSON.stringify(row));
            window.open(`/view/payroll/Payslip/${row.payslip_id}`, '_blank');
        } else {
            alert('Payslip ID not found');
        }
    };


    const columns: GridColDef[] = [
        {
            field: 'month_name',
            headerName: 'Month',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            sortable: false,
        },
        {
            field: 'payslip_id',
            headerName: 'Payslip ID',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            sortable: false,
        },
        {
            field: 'assigned_designation',
            headerName: 'Designation',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            sortable: false,
        },
        {
            field: 'assigned_department',
            headerName: 'Department',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            sortable: false,
        },
        {
            field: 'payslip_type',
            headerName: 'Payslip Type',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            sortable: false,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            headerAlign: 'center',
            sortable: false,
            renderCell: (data) => (
                <div className="flex gap-2 pt-1 items-center justify-center">
                    <div onClick={() => {
                        handleView(data.row as UserPayroll);
                    }} className="bg-transparent group h-12 w-9 flex flex-col items-center justify-center cursor-pointer px-2 hover:blue-green-500">
                        <AiOutlineFundView className="mb-[5px] w-6 h-6 text-blue-500 transition-all duration-300 group-hover:text-blue-500 group-hover:hidden group-hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
                        <p className="absolute text-[13px] text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            View
                        </p>
                    </div>
                </div>
            ),
        },
    ];
    return (
        <>
            <Dropdown>
                <Dropdown.Trigger>
                    <SecondaryButton className="flex w-full justify-between items-center md:w-[200px]">
                        {<p className="text-sm">{selectedYear || "Select Year"}</p>}
                        <RiArrowDropDownLine className="text-2xl transition-transform duration-500 ease-in-out" />
                    </SecondaryButton>
                </Dropdown.Trigger>
                <Dropdown.Content contentClasses="w-[200px] bg-[#16423D]" align="left">
                    {availableYears.map((selectedYear) => (
                        <button
                            key={selectedYear}
                            onClick={() => handleChange(selectedYear)}
                            className="block w-full text-left px-4 py-1 hover:bg-mainColor"
                        >
                            {selectedYear}
                        </button>
                    ))}
                </Dropdown.Content>
            </Dropdown>
            <div className="w-full overflow-x-auto scrollbar-hidden">
                <div className='my-5 min-w-[900px] h-auto overflow-y-auto scrollbar-hidden '>
                    <div className="bg-[#16423C] border-[1px] border-button-border-color rounded-lg">
                        <div className="text-white px-10 py-3 text-xl">Payslip available this {selectedYear}</div>
                        <Suspense fallback={<div className="text-white">Loading payroll data...</div>}>
                            <Table
                                rows={userPayslip}
                                columns={columns}
                                hideFooter={true}
                                getRowId={(row) => row?.payslip_id}
                                className="employee-table"
                                pageSize={12}
                            />
                        </Suspense>
                    </div>
                </div>
            </div>
            {/* <div className='py-5'>
                <div className="bg-[#16423C] border-[1px] border-button-border-color rounded-lg w-full">
                    <h2 className="text-lg font-semibold my-3 mx-5 text-white">Payslip available this {selectedYear}</h2>
                    <div className="h-[530px] overflow-auto scrollbar-hidden">
                        <Table
                            rows={userPayslip}
                            columns={columns}
                            hideFooter={true}
                            pageSize={12}
                            getRowId={(row) => row.payslip_id}
                        />
                    </div>
                </div>
            </div> */}
        </>
    );
}
