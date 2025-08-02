import SecondaryButton from "@/Components/SecondaryButton";
import { PageProps,Employee,UserPayroll, User } from "@/types"
import { GridColDef } from "@mui/x-data-grid";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Dropdown from "@/Components/Dropdown";
import { RiArrowDropDownLine } from "react-icons/ri";
import Table from "@/Components/Table";
import searchHooks from "@/hooks/searchHooks";
import { useEffect, useState,FormEventHandler, useMemo } from "react";
import Search from "@/Components/Search";
import Modal from "@/Components/Modal";
import InputWrapper from "@/Components/InputWrapper";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { Popover } from "@mui/material";
import TextInputGroup from "@/Components/TextInputGroup";
import { router, useForm } from "@inertiajs/react";
import style from '@/../styles/style.css'

type MonthOption = {
  number: string;
  name: string;
};

type Props = {
    payrollthisMonth : UserPayroll[];
    newPayroll: Employee[];
    payslips: UserPayroll[];
      availableYears: number[];
      availableMonths: MonthOption[];
      selectedYear: string;
      selectedMonth: string;
    
}
export default function PayrollPartial ({ payrollthisMonth,newPayroll,payslips,
  availableYears,
  availableMonths,
  selectedYear,
  selectedMonth}:Props) {
    const [submitTrigger, setSubmitTrigger] = useState<'partial' | 'publish' | null>(null);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState<UserPayroll | null>(null);
    const [selectName, setSelectName] = useState('Select Employee')
    const [disableInput, setDisableInput] = useState(true);
    const filteredRows = useMemo(() => {
    return payslips
        .filter((row) => {
        const date = new Date(row?.created_at);
        const yearMatch = date.getFullYear().toString() === selectedYear;
        const monthMatch = (date.getMonth() + 1).toString().padStart(2, '0') === selectedMonth;
        return yearMatch && monthMatch;
        })
        .filter((row) => {
        const fullName = `${row.first_name ?? ''} ${row.last_name ?? ''}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
        })
        .map((row, idx) => ({
        ...row,
        id: idx,
        }));
    }, [payslips, selectedYear, selectedMonth, searchQuery]);

    const fieldTitles = 
        [
            {
                title: "Deductions",
                fields: [
                    { label: "Absences w/o pay", id: "absent" },
                    { label: "W/holding Tax", id: "holding_tax" },
                    { label: "Tax Bal Due", id: "tax_bal_due"},
                    { label: "Late/Undertime", id: "late" },
                ]
            },
            {
                title: "GSIS",
                fields: [
                    { label: "RLIP", id: "rlip", disabled: true },
                    { label: "Policy Loan", id: "policy_loan" },
                    { label: "Consol Loan", id: "consol_loan" },
                    { label: "Emergency Loan", id: "emerg_loan" },
                    { label: "GEL", id: "gel" },
                    { label: "GFAL", id: "gfal" },
                    { label: "MPL", id: "mpl" },
                    { label: "MPL LITE", id: "mpl_lite" },
                ]
            },
            {
                title: "HDMF",
                fields: [
                    { label: "Contributions", id: "contributions" },
                    { label: "Loans", id: "loans" },
                    { label: "Housing Loans", id: "housing_loan" },
                ]
            },
            {
                title: "OTHER DEDUCTIONS",
                fields: [
                    { label: "Philhealth", id: "philhealth", disabled: true },
                    { label: "CFI", id: "cfi" },
                    { label: "TIPID", id: "tipid" },
                    { label: "CITY BANK SAVINGS", id: "city_savings_bank" },
                    { label: "FEA", id: "fea" },
                    { label: "CANTEEN", id: "canteen" },
                    { label: "Disallowance", id: "disallowance" },
                    { label: "Unliquidated Cash Advances", id: "unliquidated_ca" },
                    { label: "Disallowance(Honoraria)", id: "disallowance_honoraria" },
                    { label: "COOP", id: "coop" },
                    { label: "LANDBANK", id: "landbank" },
                    { label: "UCPB", id: "ucpb" },
                ]
            },
        ]

    const { data, setData, post,reset} = useForm<any>({
        payroll_id:'',
        user_id:'',
        basic_salary:'',
        pera:'',
        absent:'',
        late:'',
        holding_tax:'',
        tax_bal_due:'',
        rlip: '',
        policy_loan: '',
        consol_loan: '',
        emerg_loan: '',
        gel: '',
        gfal: '',
        mpl: '',
        mpl_lite: '',
        contributions: '',
        loans: '',
        housing_loan: '',
        philhealth: '',
        cfi: '',
        tipid: '',
        city_savings_bank: '',
        fea: '',
        canteen: '',
        disallowance: '',
        unliquidated_ca: '',
        disallowance_honoraria: '',
        coop: '',
        landbank: '',
        ucpb: '',
        publish_status: '',
    });
    
    const handleOpenPopover = (event:any, row:UserPayroll) => {
            reset()
            setAnchorEl(event.currentTarget);
            setSelectedRow(row);
        };
    
    const handleDropdownSelect = (value: Employee, field: string) => {
        if (field === 'employee') {
            setSelectName(`${value.employee_id} - ${value.first_name} ${value.last_name}`);
            setDisableInput(true);
            setData({
                user_id:value.user_id ?? '',
                basic_pay: value?.basic_pay??'',
                basic_salary:value?.latest_payroll?.basic_salary ?? '',
                pera:value?.latest_payroll?.pera ?? '',
                absent:value?.latest_payroll?.absent ?? '',
                late:value?.latest_payroll?.late??'',
                holding_tax:value?.latest_payroll?.holding_tax ??'',
                tax_bal_due:value?.latest_payroll?.tax_bal_due??'',
                rlip: value?.latest_payroll?.rlip??'',
                policy_loan: value?.latest_payroll?.policy_loan??'',
                consol_loan: value?.latest_payroll?.consol_loan??'',
                emerg_loan: value?.latest_payroll?.emerg_loan??'',
                gel: value?.latest_payroll?.gel??'',
                gfal: value?.latest_payroll?.gfal??'',
                mpl: value?.latest_payroll?.mpl??'',
                mpl_lite: value?.latest_payroll?.mpl_lite??'',
                contributions: value?.latest_payroll?.contributions??'',
                loans:value?.latest_payroll?.loans??'',
                housing_loan: value?.latest_payroll?.housing_loan??'',
                philhealth: value?.latest_payroll?.philhealth??'',
                cfi: value?.latest_payroll?.cfi??'',
                tipid: value?.latest_payroll?.tipid??'',
                city_savings_bank: value?.latest_payroll?.city_savings_bank??'',
                fea: value?.latest_payroll?.fea??'',
                canteen: value?.latest_payroll?.canteen??'',
                disallowance: value?.latest_payroll?.disallowance??'',
                unliquidated_ca: value?.latest_payroll?.unliquidated_ca??'',
                disallowance_honoraria: value?.latest_payroll?.disallowance_honoraria??'',
                coop: value?.latest_payroll?.coop??'',
                landbank: value?.latest_payroll?.landbank??'',
                ucpb: value?.latest_payroll?.ucpb??'',
            })
        }setDisableInput(false);
        
    };

    useEffect(() => {
        if (editModal && selectedRow) {
            setData({
                payroll_id: selectedRow?.payroll_id ?? '',
                user_id: selectedRow.user_id,
                basic_salary: selectedRow?.basic_pay ?? '',
                pera:selectedRow?.pera ?? '',
                absent:selectedRow?.absent ?? '',
                late:selectedRow?.late??'',
                holding_tax:selectedRow?.holding_tax ??'',
                tax_bal_due:selectedRow?.tax_bal_due??'',
                rlip: selectedRow?.rlip??'',
                policy_loan: selectedRow?.policy_loan??'',
                consol_loan: selectedRow?.consol_loan??'',
                emerg_loan: selectedRow?.emerg_loan??'',
                gel: selectedRow?.gel??'',
                gfal: selectedRow?.gfal??'',
                mpl: selectedRow?.mpl??'',
                mpl_lite: selectedRow?.mpl_lite??'',
                contributions: selectedRow?.contributions??'',
                loans:selectedRow?.loans??'',
                housing_loan: selectedRow?.housing_loan??'',
                philhealth: selectedRow?.philhealth??'',
                cfi: selectedRow?.cfi??'',
                tipid: selectedRow?.tipid??'',
                city_savings_bank: selectedRow?.city_savings_bank??'',
                fea: selectedRow?.fea??'',
                canteen: selectedRow?.canteen??'',
                disallowance: selectedRow?.disallowance??'',
                unliquidated_ca: selectedRow?.unliquidated_ca??'',
                disallowance_honoraria: selectedRow?.disallowance_honoraria??'',
                coop: selectedRow?.coop??'',
                landbank: selectedRow?.landbank??'',
                ucpb: selectedRow?.ucpb??'',
                publish_status: selectedRow?.publish_status,
            })
        }else{
            setDisableInput(true);
            setData({
                user_id: '',
                basic_salary: '',
                pera:'',
                absent:'',
                late:'',
                holding_tax:'',
                tax_bal_due:'',
                rlip: '',
                policy_loan: '',
                consol_loan: '',
                emerg_loan: '',
                gel: '',
                gfal: '',
                mpl: '',
                mpl_lite: '',
                contributions:'',
                loans:'',
                housing_loan: '',
                philhealth: '',
                cfi: '',
                tipid: '',
                city_savings_bank: '',
                fea: '',
                canteen:'',
                disallowance: '',
                unliquidated_ca: '',
                disallowance_honoraria: '',
                coop: '',
                landbank: '',
                ucpb: '',
            })
        }
    }, [editModal, selectedRow]);
    const isSalaryZero = Number(data.basic_pay) === 0;

    const handleSubmit = (actionType: 'partial' | 'publish'): FormEventHandler => {
        return (e) => {
            e.preventDefault();
            post(route(`admin.store.${actionType}`), {
                onSuccess: () => {
                    setAddModal(false);
                    reset();
                    setSelectName('Select Employee');
                },
            });
        };
    };

    const handleEdit = (actionType: 'partial' | 'publish'): FormEventHandler => {
        return (e) => {
            e.preventDefault();
            setData('publish_status', actionType);
            setSubmitTrigger(actionType); // trigger post in useEffect
        };
    };
    useEffect(() => {
        if (submitTrigger && data.publish_status === submitTrigger) {
            post(route('admin.payroll.update-partial-publish', data.payroll_id ), {
                onSuccess: () => {
                    setEditModal(false);
                    setSubmitTrigger(null); // reset trigger
                }
            });
        }
    }, [data.publish_status, submitTrigger]);

    const handleChange = (year: number, month: string) => {
        router.get(route("admin.payroll"), { year, month }, { preserveState: true });
    };

    const columns: GridColDef[] = [        
        { field: 'employee_id', headerName: ' ID', flex:1, headerAlign: 'center', align: 'center',
        },
        { field: 'first_name', headerName: 'First name', flex:1, headerAlign: 'center', align: 'center',
        },
        { field: 'last_name', headerName: 'Last name',flex:1, headerAlign: 'center', align: 'center',
        },
        { field: 'designation', headerName: 'Designation', flex:1, headerAlign: 'center', align: 'center',
        },
        { field: 'department', headerName: 'Department', flex:1, headerAlign: 'center', align: 'center',
        },
        { field: 'employment_type', headerName: 'Type', flex:1, headerAlign: 'center', align: 'center',
        },
        {
        field: 'publish_status',
        headerName: 'Status',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
            params?.row.publish_status === 'none' ? (
            ""
            ) : (
            <span className={`text-center p-2 rounded-full
                ${params.row.publish_status === 'publish'
                ? 'text-green-500 border border-emerald-500 '
                : 'text-yellow-500 border border-yellow-500'
                }`}
            >       
            {params.row.publish_status === 'publish' ? 'Published' : 'Partial'}
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


    const handleView = (row: UserPayroll) => {
    localStorage.setItem('selectedPayroll', JSON.stringify(row));
    router.visit(`/admin/payroll/Payslip/${row.payroll_id}`);
    };



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
                        <div className='my-5 min-w-[900px] h-[650px] sm:h-[650px] md:h-[750px] lg:h[800px] overflow-y-auto scrollbar-hidden '>
                            <div className="bg-[#16423C] border-[1px] border-button-border-color rounded-lg">
                                <div className="text-white px-10 py-3 text-xl">Payroll Summary</div>
                                <Table
                                rows={filteredRows}
                                columns={columns}
                                height={650}
                                getRowId={(row) => row.payroll_id}
                                className="employee-table"
                                pageSize={10}
                            />
                            </div>
                        </div>
                    </div>   

            {/*ADD MODAL*/}
                <Modal show={addModal} onClose={() => setAddModal(false)} maxWidth="5xl" className="h-full scrollbar-hidden">
                    <form>
                        <div className="p-6 space-y-4 border rounded-lg ">
                            {/* Header */}
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg text-white">New Payroll</h2>
                                <IoMdClose color="white" className="cursor-pointer text-2xl" onClick={() => setAddModal(false)} />
                            </div>

                            {/* Employee Dropdown */}
                            <InputWrapper className="justify-between p-3 w-full text-white">
                                <p>Earning</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                                    <div className="my-2">
                                        <InputLabel htmlFor="department" value="Employee *" className="text-white" />
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <button type="button" className="bg-transparent w-full border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center">
                                                    <p className='text-sm'>{selectName}</p>
                                                    <RiArrowDropDownLine className="text-2xl" />
                                                </button>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content ableSearch={true} contentClasses="w-[275px] md:w-[225px] lg:w-[300px] max-h-[200px] overflow-y-auto p-0" align="left">
                                                {newPayroll?.map((user, index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => handleDropdownSelect(user, 'employee')}
                                                        className="w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black"
                                                    >
                                                        {`${user.employee_id} - ${user.first_name} ${user.last_name}`}
                                                    </button>
                                                ))}
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                    <TextInputGroup label="Basic Salary" id="basic_pay" value={data.basic_pay} disabled />
                                    <TextInputGroup label="PERA" id="PERA" value={data.pera} onChange={e => setData('pera', e.target.value)} disabled={disableInput} />
                                </div>
                            </InputWrapper>

                            {/* Reusable Input Group Rendering */}
                            {fieldTitles.map((section, index) => (
                                <InputWrapper key={index} className="justify-between p-3 w-full text-white">
                                    <p>{section.title}</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                                        {section.fields.map(({ label, id, disabled }) => (
                                            <TextInputGroup
                                                key={id}
                                                label={label}
                                                id={id}
                                                value={data[id]}
                                                onChange={e => setData(id, e.target.value)}
                                                disabled={disabled ?? disableInput}
                                                placeholder={(label === "RLIP" || label === "Philhealth") ? "(AUTOGENERATED)" : ""}
                                            />
                                        ))}
                                    </div>
                                </InputWrapper>
                            ))}

                            {/* Footer Buttons */}
                            <div className="flex gap-4">
                                <PrimaryButton disabled={disableInput || isSalaryZero} onClick={handleSubmit('publish')} className='text-md mt-4 py-2 hover:bg-yellow-600'>Publish</PrimaryButton>
                                <PrimaryButton disabled={disableInput || isSalaryZero} onClick={handleSubmit('partial')} className='text-md mt-4 hover:bg-yellow-600'>Partial</PrimaryButton>
                                <PrimaryButton onClick={() => setAddModal(false)} className='text-md mt-4 hover:bg-yellow-600'>Cancel</PrimaryButton>
                            </div>
                        </div>
                    </form>
                </Modal>

                
                {/*EDIT*/}
                <Modal show={editModal} onClose={() => setEditModal(false)} maxWidth="5xl" className="h-full">
                    <form>
                        <div className="p-6 space-y-4 border rounded-lg">
                            {/* Header */}
                            <div className="flex justify-between">
                                <h2 className="text-lg font-bold mb-4 text-white">
                                    Edit Employee's Payroll - {[selectedRow?.employee_id + " - ", selectedRow?.last_name + ", ", selectedRow?.first_name]}
                                </h2>
                                <span onClick={() => setEditModal(false)}>
                                    <IoMdClose color="white" className="cursor-pointer text-2xl" />
                                </span>
                            </div>
                            <InputWrapper className="flex gap-4 p-3">
                                <TextInputGroup label="Basic Salary" id="basic_pay" value={selectedRow?.basic_pay} disabled />
                                <TextInputGroup label="PERA" id="PERA" value={data.pera} onChange={e => setData('pera', e.target.value)}/>
                            </InputWrapper>
                            {/* Sections */}
                            {fieldTitles.map((section, idx) => (
                                <InputWrapper key={idx} className="p-3 text-white space-y-4">
                                    <p className="font-medium">{section.title}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                                        {section.fields.map(({ label, id, disabled = false }) => (
                                            <TextInputGroup
                                                key={id}
                                                label={label}
                                                id={id}
                                                value={data[id]}
                                                onChange={e => setData(id, e.target.value)}
                                                disabled={disabled}
                                                placeholder={label === "RLIP" || label === "Philhealth" ? "(AUTOGENERATED)" : ""} // Placeholder for specific fields
                                            />
                                        ))}
                                    </div>
                                </InputWrapper>
                            ))}

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <PrimaryButton onClick={handleEdit('publish')} className="text-md mt-4 py-2 hover:bg-yellow-600">Publish</PrimaryButton>
                                <PrimaryButton onClick={handleEdit('partial')} className="text-md mt-4 hover:bg-yellow-600">Partial</PrimaryButton>
                                <PrimaryButton onClick={() => setEditModal(false)} className="text-md mt-4 hover:bg-yellow-600">Cancel</PrimaryButton>
                            </div>
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
                disableScrollLock={true}
                >
                <div className=" w-48 bg-mainColor shadow-md text-sm text-white">
                    <button
                        disabled={selectedRow?.publish_status === 'publish'}
                        className={`${selectedRow?.publish_status === 'publish' ? 'cursor-not-allowed opacity-50' : ''} w-full text-left px-4 py-2 hover:text-mainColor hover:bg-green-100`}
                        onClick={() => {
                            setAnchorEl(null);
                            setEditModal(true);
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
                            handleView(selectedRow as UserPayroll);
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


