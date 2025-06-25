import SecondaryButton from "@/Components/SecondaryButton";
import { PageProps,Employee } from "@/types"
import { GridColDef } from "@mui/x-data-grid";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Dropdown from "@/Components/Dropdown";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function PayrollPartial ({employees}:PageProps<{employees:Employee[]}>) {

        const columns: GridColDef[] = [        
                { field: 'employee_id', headerName: ' ID', flex:1, headerAlign: 'center', align: 'center' },
                { field: 'first_name', headerName: 'First name', flex:1, headerAlign: 'center', align: 'center' },
                { field: 'last_name', headerName: 'Last name',flex:1, headerAlign: 'center', align: 'center' },
                { field: 'designation', headerName: 'Designation', flex:1, headerAlign: 'center', align: 'center' },
                { field: 'department', headerName: 'Department', flex:1, headerAlign: 'center', align: 'center' },
                { field: 'role', headerName: 'Type', flex:1, headerAlign: 'center', align: 'center' },
                { field: 'employment_type', headerName: 'Access Type', flex:1, headerAlign: 'center', align: 'center' },
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
    return (
        <>
            <div className="flex flex-col-reverse justify-between lg:flex lg:flex-row">
                                <div className="flex items-center gap-2 mt-5">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <SecondaryButton className="flex w-[200px] justify-between items-center md:w-[300px]">
                                                <p className='text-sm'>June 1 - 30, 2025</p>
                                                    <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                            </SecondaryButton>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content contentClasses="w-[300px]" align="left" >
                                            <option value="Regular">COT</option>
                                            <option value="Regular">Part-Time</option>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                                <div className="flex justify-between mt-5 gap-4">
                                    <Search value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                </div>
                                    <Modal show={isOpen} onClose={() => setisOpen(false)} maxWidth="lg">
                                        <div className="p-6">
                                            <h2 className="text-lg font-bold mb-4 text-white">Add New Employee</h2>
                                                <div className="space-y-2">
                                                    <CardWrapper className="flex justify-between p-3 gap-4">
                                                        <div>
                                                            <InputLabel className=' py-1 text-white'>Employee Name</InputLabel>
                                                            <TextInput className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1" />
                                                        </div>
                                                        <div>
                                                            <InputLabel className='py-1 text-white'>Basic Pay</InputLabel>
                                                            <TextInput className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1" />
                                                        </div>
                                                    </CardWrapper>
                                                    <PrimaryButton className='text-md' onClick={() => setisOpen(false)}>
                                                        Save
                                                    </PrimaryButton>
                                                </div>
                                        </div>
                                </Modal>
                            </div>
                            <div className="w-full overflow-x-auto scrollbar-hidden">
                                <div className='my-5 min-w-[900px] h-[650px] sm:h-[650px] md:h-[750px] lg:h[800px] overflow-y-auto scrollbar-hidden '>
                                    <div className="bg-[#16423C] border-[1px] border-button-border-color rounded-lg">
                                        <div className="text-white px-10 py-3 text-xl">Payroll</div>
                                        <Table
                                            columns={columns}
                                            rows={filteredRows}
                                            pageSize={10}
                                            height={640}
                                            className="employee-table"
                                        />
                                    </div>
                                </div>
                            </div>
        </>
    )
}