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
import Modal from "@/Components/Modal";
import CardWrapper from "@/Components/CardWrapper";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { IoMdAdd } from "react-icons/io";
import { Popover } from "@mui/material";
import TextInputGroup from "@/Components/TextInputGroup";



export default function PayrollPartial ({ thisMonth/* {payroll}:PageProps<{payroll:Employee[]}>)x */}) {
    
    const [addModal, setAddModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    //const filteredRows = searchHooks(searchQuery, payroll);

    
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState<Employee | null>(null);

    const handleOpenPopover = (event:any, row:Employee) => {
            setAnchorEl(event.currentTarget);
            setSelectedRow(row);
        };
    
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


    return (
        <>
            <div className="flex gap-5 flex-col-reverse md:justify-between md:flex-row">
                        <div className="flex gap-3 justify-between">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <SecondaryButton className="flex w-full justify-between items-center md:w-[200px]">
                                        <p className='text-sm'>Select Year</p>
                                            <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                    </SecondaryButton>
                                </Dropdown.Trigger>
                                <Dropdown.Content contentClasses="w-[200px]" align="left" >
                                    <option value="Regular">COT</option>
                                    <option value="Regular">Part-Time</option>
                                </Dropdown.Content>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <SecondaryButton className="flex w-full justify-between items-center md:w-[200px]">
                                        <p className='text-sm'>Select Month</p>
                                            <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                    </SecondaryButton>
                                </Dropdown.Trigger>
                                <Dropdown.Content contentClasses="w-[200px]" align="left" >
                                    <option value="Regular">COT</option>
                                    <option value="Regular">Part-Time</option>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                        <Search value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <div className="w-full overflow-x-auto scrollbar-hidden">
                        <div className='my-5 min-w-[900px] h-[650px] sm:h-[650px] md:h-[750px] lg:h[800px] overflow-y-auto scrollbar-hidden '>
                            <div className="bg-[#16423C] border-[1px] border-button-border-color rounded-lg">
                                <div className="text-white px-10 py-3 text-xl">Payroll Summary</div>
                                <Table
                                rows={thisMonth}
                                columns={columns}
                                height={650}
                                getRowId={(row) => row.employee_id}
                                className="employee-table"
                            />
                            </div>
                        </div>
                    </div>   

                    {/*Modal*/}
                            <Modal show={addModal} onClose={() => setAddModal(false)} maxWidth="5xl" >
                                <form >
                                <div className="p-6 space-y-4 border rounded-lg">
                                    <h2 className="text-lg font-bold mb-4 text-white">{[selectedRow?.employee_id+" - ", selectedRow?.last_name + ", " ,selectedRow?.first_name]}</h2>
                                        <CardWrapper className="justify-between p-3 gap-4 text-white">
                                            {/*EARNINGS*/}
                                            <p>Earning</p>
                                                <div className="flex gap-4">
                                                    {/*BASIC SALARY*/}
                                                    <TextInputGroup label="Basic Salary" id="basic_salary"/>
                                                    {/*PERA*/}
                                                    <TextInputGroup label="PERA" id="PERA"/>
                                                </div>
                                        </CardWrapper>
                                        {/* DEDUCTIONS */}
                                        <CardWrapper className="justify-between p-3 w-full text-white">
                                            <p>Deductions</p>
                                                <div className="flex gap-4 ">
                                                    {/*Absences w/o pay*/}
                                                    <TextInputGroup label="Absences w/o pay" id="Absences w/o pay"/>
                                                    {/*W/holding Tax*/}
                                                    <TextInputGroup label="W/holding Tax" id="W/holding Tax"/>
                                                    {/*Late/Undertime*/}
                                                    <TextInputGroup label="Late/Undertime" id="Late/Undertime"/>
                                                </div>
                                        </CardWrapper>
                                        <CardWrapper className=" p-3 gap-4 text-white">
                                                <p>GSIS</p>
                                                <div className="flex justify-between gap-4">
                                                    {/*RLIP*/}
                                                    <TextInputGroup label="RLIP" id="RLIP"/>
                                                    {/*Policy Loan*/}
                                                    <TextInputGroup label="Policy Loan" id="Policy Loan"/>
                                                    {/*Consol Loan*/}
                                                    <TextInputGroup label="Consol Loan" id="Consol Loan"/>                                                    
                                                </div>
                                                <div className="flex justify-between gap-4">
                                                    {/*Emergency Loan*/}
                                                    <TextInputGroup label="Emergency Loan" id="Emergency Loan"/>
                                                    {/*GEL*/}
                                                    <TextInputGroup label="GEL" id="GEL"/>
                                                    {/*GFAL*/}
                                                    <TextInputGroup label="GFAL" id="GFAL"/>
                                                </div>
                                                <div className="flex justify-between gap-4">
                                                    {/*MPL*/}
                                                    <TextInputGroup label="MPL" id="MPL"/>
                                                    {/*MPL LITE*/}
                                                    <TextInputGroup label="MPL LITE" id="MPL"/>
                                                </div>
                                        </CardWrapper>
                                        <CardWrapper className="justify-between p-3 w-full text-white">
                                            <p>HDMF</p>
                                            <div className="flex gap-4 ">
                                                {/*Contribution*/}
                                                <TextInputGroup label="Contribution" id="Contribution"/>
                                                {/*Loans*/}
                                                <TextInputGroup label="Loans" id="Loans"/>
                                                {/*Housing Loans*/}
                                                <TextInputGroup label="Housing Loans" id="Housing Loans"/>
                                            </div>
                                        </CardWrapper>
                                        <CardWrapper className="justify-between p-3 w-full text-white">
                                            <p>OTHER DEDUCTIONS</p>
                                            <div className="flex gap-4">
                                                {/*Philhealht*/}
                                                <TextInputGroup label="Philhealth" id="philhealth" />
                                                {/*CFI*/}
                                                <TextInputGroup label="CFI" id="cfi" />
                                                {/*TIPID*/}
                                                <TextInputGroup label="TIPID" id="tipid" />
                                            </div>
                                            <div className="flex gap-4">
                                                {/*CITY BANKS SAVING*/}
                                                <TextInputGroup label="CITY BANK SAVINGS" id="city_bank_savings" />
                                                {/*FEA*/}
                                                <TextInputGroup label="FEA" id="fea" />
                                                {/*CANTEEN*/}
                                                <TextInputGroup label="CANTEEN" id="canteen" />
                                            </div>
                                            <div className="flex gap-4">
                                                {/*Disallowance*/}
                                                <TextInputGroup label="Disallowance" id="disallowance1" />
                                                {/*Unliquidated Cash Advances*/}
                                                <TextInputGroup label="Unliquidated Cash Advances" id="unliquidated_cash_advances" />
                                                {/*Honoraria*/}
                                                <TextInputGroup label="Disallowance(Honoraria)" id="Honoraria" />
                                            </div>
                                            <div className="flex gap-4">
                                                {/*COOP*/}
                                                <TextInputGroup label="COOP" id="coop" />
                                                {/*LANDBANK*/}
                                                <TextInputGroup label="LANDBANK" id="landbank" />
                                                {/*UCPB*/}
                                                <TextInputGroup label="UCPB" id="ucpb" />
                                            </div>
                                    </CardWrapper>
                                    <PrimaryButton className='text-md mt-4'>Save</PrimaryButton>
                                    
                                </div>
                                </form>
                            </Modal>     
                            <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            className='w-32'
        >
            <div className=" w-48 bg-mainColor shadow-md text-sm text-white">
                <button
                    className="w-full text-left px-4 py-2 hover:text-mainColor hover:bg-green-100"
                    onClick={() => {
                        setAddModal(true);
                        setAnchorEl(null);
                    }}
                >
                    Edit
                </button>
                <button
                    className="w-full text-left px-4 py-2 hover:text-mainColor hover:bg-green-100 "
                    onClick={() => {
                        console.log("Delete employee:", selectedRow);
                        setAnchorEl(null);
                    }}
                >
                    Delete
                </button>
                <button
                    className="w-full text-left px-4 py-2 hover:text-mainColor hover:bg-green-100 "
                    onClick={() => {
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