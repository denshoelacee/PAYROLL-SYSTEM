import SecondaryButton from "@/Components/SecondaryButton";
import {JobTitles,UserPayroll , filteredSelectedTypeUser} from "@/types"
import { GridColDef } from "@mui/x-data-grid";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Dropdown from "@/Components/Dropdown";
import { RiArrowDropDownLine } from "react-icons/ri";
import Table from "@/Components/Table";
import {useState,useMemo, Suspense } from "react";
import Search from "@/Components/Search";
import { IoMdAdd } from "react-icons/io";
import { Popover } from "@mui/material";
import { router } from "@inertiajs/react";
import PayrollAddModal from "./payrollpartials/addModal";
import PayrollEditModal from "./payrollpartials/editModal";


type MonthOption = {
    number: string;
    name: string;
};

type Props = {
    payrollthisMonth : UserPayroll[];
    newPayroll: UserPayroll[];
    payslips: UserPayroll[];
    availableYears: number[];
    availableMonths: MonthOption[];
    selectedYear: string;
    selectedMonth: string;
    filteredEmployementType: filteredSelectedTypeUser[];
    jobLists: JobTitles[];
}
export default function PayrollPartial ({jobLists,newPayroll,payslips=[],availableYears=[],availableMonths=[],selectedYear,selectedMonth,filteredEmployementType=[]}:Props) {
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState<UserPayroll | null>(null);
    
    const filteredRows = useMemo(() => {
    return (payslips)
        .filter((row) => {
        const date = new Date(row?.created_at);
        const yearMatch = date.getFullYear().toString() === selectedYear;
        const monthMatch = (date.getMonth() + 1).toString().padStart(2, '0') === selectedMonth;
        return yearMatch && monthMatch;
        })
        .filter((row) => {
        const fullName = (row?.full_name ?? '').toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
        })
        .map((row) => ({
         ...row,
       id: row?.payslip_id, // Use payslip_id instead of index
        }));
    }, [payslips, selectedYear, selectedMonth, searchQuery]);

    const handleOpenPopover = (event:any, row:UserPayroll) => {
            setAnchorEl(event.currentTarget);
            setSelectedRow(row);
        };
    
    const handleChange = (year: number, month: string) => {
        router.get(route("admin.payroll"), { year, month }, { preserveState: true });
    };

    const columns: GridColDef[] = [        
        { field: 'employee_id', headerName: 'Employee ID', flex:1, headerAlign: 'center', align: 'center',
        },
        { field: 'payslip_id', headerName: ' Payslip ID', flex:1, headerAlign: 'center', align: 'center',
        },
        { field: 'full_name', headerName: 'Name', flex:1, headerAlign: 'center', align: 'center',
        },
        { field: 'assigned_designation', headerName: 'Designation', flex:1, headerAlign: 'center', align: 'center',
        },
        { field: 'assigned_department', headerName: 'Department', flex:1, headerAlign: 'center', align: 'center',
        },
        { field: 'payslip_type', headerName: 'Payslip Type', flex:1, headerAlign: 'center', align: 'center',
        },
        {
        field: 'publish_status',
        headerName: 'Status',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
            params?.row?.publish_status === 'none' ? (
            ""
            ) : (
            <span className={`text-center p-2 rounded-full
                ${params?.row?.publish_status === 'publish'
                ? 'text-green-500 border border-emerald-500 '
                : 'text-yellow-500 border border-yellow-500'
                }`}
            >       
            {params?.row?.publish_status === 'publish' ? 'Published' : 'Partial'}
            </span>
            )
        ),
        }
        ,
        {
        field: 'action',
        headerName: 'Actions',  
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        renderCell: (data:any) => (
            <div className="flex justify-center place-items-center gap-2 pt-2">
                <SecondaryButton className="text-sm border-none" onClick={(e) => handleOpenPopover(e, data.row)}>
                    <HiOutlineDotsVertical size={25} />
                </SecondaryButton>
            </div>
        )
        }
    ];


    {/*const handleView = (row: UserPayroll) => {
    localStorage.setItem('selectedPayroll', JSON.stringify(row));
    router.visit(`/admin/payroll/Payslip/${row?.latest_payroll?.payroll_id}`);
    };*/}

    return (
        <>
            <div className="flex gap-5 flex-col-reverse md:justify-between md:flex-row">
                        <div className="flex gap-3 justify-between">
                            <div className="flex gap-4">
                            {/* Year Dropdown */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                <SecondaryButton className="flex w-full justify-between items-center md:w-[200px]">
                                    <p className="text-sm">{selectedYear || "Select Year"}</p>
                                    <RiArrowDropDownLine className="text-2xl transition-transform duration-500 ease-in-out" />
                                </SecondaryButton>
                                </Dropdown.Trigger>
                                <Dropdown.Content contentClasses="w-[200px] " align="left">
                                {availableYears.map((year) => (
                                    <button
                                    key={year}
                                    onClick={() => handleChange(year, selectedMonth)}
                                    className="block w-full text-left px-4 py-1 hover:bg-mainColor"
                                    >
                                    {year}
                                    </button>
                                ))}
                                </Dropdown.Content>
                            </Dropdown>

                            {/* Month Dropdown */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                <SecondaryButton className="flex w-full justify-between items-center md:w-[200px]">
                                    <p className="text-sm">
                                    {selectedMonth
                                        ? availableMonths.find((m) => m.number === selectedMonth)?.name
                                        : "Select Month"}
                                    </p>
                                    <RiArrowDropDownLine className="text-2xl transition-transform duration-500 ease-in-out" />
                                </SecondaryButton>
                                </Dropdown.Trigger>
                                <Dropdown.Content contentClasses="bg-[#1B4D4D] w-[200px] bg-[#1B4D4E] " align="left">
                                {availableMonths.map((m) => ( 
                                    <button
                                    key={m.number}
                                    onClick={() => handleChange(Number(selectedYear), m.number)}
                                    className="block w-full text-left px-4 py-1 hover:bg-mainColor"
                                    >
                                    {m.name}
                                    </button>
                                ))}
                                </Dropdown.Content>
                            </Dropdown>
                            </div>

                        </div>
                        <div className="flex gap-4">
                            <SecondaryButton onClick={() => setAddModal(true)}>
                            <div className="flex items-center gap-2">
                                <IoMdAdd className='text-custom-word-color font-black text-lg' />
                                <span className="text-sm">New Payroll</span>
                            </div>
                        </SecondaryButton>
                        <Search value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                    </div>
                    <div className="w-full overflow-x-auto scrollbar-hidden">
                        <div className='my-5 min-w-[900px] h-auto overflow-y-auto scrollbar-hidden '>
                            <div className="bg-[#16423C] border-[1px] border-button-border-color rounded-lg">
                                <div className="text-white px-10 py-3 text-xl">Payroll Summary</div>
                                    <Suspense fallback={<div className="text-white">Loading payroll data...</div>}>
                                        <Table
                                            rows={filteredRows}
                                            columns={columns}
                                            getRowId={(row) => row?.payslip_id}
                                            className="employee-table"
                                            pageSize={10}
                                            pageSizeOptions={[10,20,50]}  
                                        />
                                    </Suspense>
                            </div>
                        </div>
                    </div>   

            {/*Add Modal*/}
            {addModal && (
                <PayrollAddModal show={addModal} onClose={() => {
                    setAddModal(false);
                    router.replace(route("admin.payroll")); 
                }}  
                newPayroll={newPayroll} 
                filteredEmployementType={filteredEmployementType}
                jobLists={jobLists}/>
            )}
            {/*Edit Modal */}
            {editModal && selectedRow && (
                <PayrollEditModal show={editModal} onClose={() => {setEditModal(false); router.replace(route("admin.payroll")); }
                } row={selectedRow as any} />
            )}

                <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                className='w-32'
                disableScrollLock={true}
                >
                <div className=" w-48 bg-mainColor shadow-md text-sm text-white">
                    <button
                        disabled={selectedRow?.publish_status === 'publish'}
                        className={`${selectedRow?.publish_status === 'publish' ? 'cursor-not-allowed opacity-50' : ''} w-full text-left px-4 py-2 hover:text-mainColor hover:bg-green-100`}
                        onClick={() => {
                            setAnchorEl(null)
                            setEditModal(true);
                        }}

                    >
                        Edit
                    </button>
                    <button
                     className="w-full text-left px-4 py-2 hover:text-mainColor hover:bg-green-100 "
                        onClick={() => {
                            if (selectedRow?.payslip_id) {
                                localStorage.setItem('selectedPayroll', JSON.stringify(selectedRow));
                                window.open(`/view/payroll/Payslip/${selectedRow.payslip_id}`, '_blank');
                            } else {
                                alert('Payslip ID not found');
                            }
                            setAnchorEl(null);
                        }}
                    >
                        View
                    </button>
                </div>
            </Popover>
        </>
    )
}


{/* InputLabel className='py-1 text-white'>Basic Salary</InputLabel>
                                                        <TextInput 
                                                            id="basic_salary"
                                                            type="text"
                                                            name="basic_salary"
                                                            className=" block w-full bg-transparent text-white"
                                                            disabled
                                                        //onChange={(e) => setData('employee_id', e.target.value)}
                                                        />
                                                        */}


