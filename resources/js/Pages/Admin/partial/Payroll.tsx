import SecondaryButton from "@/Components/SecondaryButton";
import { PageProps,Employee } from "@/types"
import { GridColDef } from "@mui/x-data-grid";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Dropdown from "@/Components/Dropdown";
import { RiArrowDropDownLine } from "react-icons/ri";
import Table from "@/Components/Table";
import searchHooks from "@/hooks/searchHooks";
import { useState } from "react";
import Search from "@/Components/Search";

export default function PayrollPartial ({/* {payroll}:PageProps<{payroll:Employee[]}>)x */}) {
    
    const [searchQuery, setSearchQuery] = useState('');
    //const filteredRows = searchHooks(searchQuery, payroll);
    
    const columns: GridColDef[] = [        
        { field: 'employee_id', headerName: ' ID', flex:1, headerAlign: 'center', align: 'center' },
        { field: 'first_name', headerName: 'First name', flex:1, headerAlign: 'center', align: 'center' },
        { field: 'last_name', headerName: 'Last name',flex:1, headerAlign: 'center', align: 'center' },
        { field: 'designation', headerName: 'Designation', flex:1, headerAlign: 'center', align: 'center' },
        { field: 'department', headerName: 'Department', flex:1, headerAlign: 'center', align: 'center' },
        { field: 'employment_type', headerName: 'Type', flex:1, headerAlign: 'center', align: 'center' },
        { field: 'status', headerName: 'Status', flex:1, headerAlign: 'center', align: 'center' },
        {
        field: 'action',
        headerName: 'Actions',
        flex:1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        renderCell: (data:any) => (
            <div className="flex justify-center place-items-center gap-2 pt-2">
                <SecondaryButton className="text-sm border-none">
                    <HiOutlineDotsVertical size={25} />
                </SecondaryButton>
            </div>
        )
    }
    ];
            
    const rows = [
    {id: 1,employee_id: 'EMP001',first_name: 'Alice',last_name: 'Johnson',designation: 'Software Engineer',department: 'Engineering',role: 'Admin',employment_type: 'Full-Time',},
    {id: 2,employee_id: 'EMP002',first_name: 'Bob',last_name: 'Smith',designation: 'Product Manager',department: 'Product',role: 'User',employment_type: 'Contract',},
    {id: 3,employee_id: 'EMP003',first_name: 'Charlie',last_name: 'Lee',designation: 'UX Designer',department: 'Design',role: 'Editor',employment_type: 'Part-Time',},
    ];

    return (
        <>
            <div className="flex gap-5 flex-col-reverse md:justify-between md:flex-row">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <SecondaryButton className="flex w-full justify-between items-center md:w-[300px]">
                                    <p className='text-sm'>June 1 - 30, 2025</p>
                                        <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                </SecondaryButton>
                            </Dropdown.Trigger>
                            <Dropdown.Content contentClasses="w-[300px]" align="left" >
                                <option value="Regular">COT</option>
                                <option value="Regular">Part-Time</option>
                            </Dropdown.Content>
                        </Dropdown>
                        <Search value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <div className="w-full overflow-x-auto scrollbar-hidden">
                        <div className='my-5 min-w-[900px] h-[650px] sm:h-[650px] md:h-[750px] lg:h[800px] overflow-y-auto scrollbar-hidden '>
                            <div className="bg-[#16423C] border-[1px] border-button-border-color rounded-lg">
                                <div className="text-white px-10 py-3 text-xl">Payroll Summary</div>
                                <Table
                                rows={rows}
                                columns={columns}
                                height={650}
                                getRowId={(row) => row.employee_id}
                                className="employee-table"
                            />
                            </div>
                        </div>
                    </div>        
        </>
    )
}