
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
import CardWrapper from "@/Components/CardWrapper";
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
        const date = new Date(row?.pay_date);
        const yearMatch = date.getFullYear().toString() === selectedYear;
        const monthMatch = (date.getMonth() + 1).toString().padStart(2, '0') === selectedMonth;
        return yearMatch && monthMatch;
        })
        .filter((row) => {
        const fullName = `${row.users?.first_name ?? ''} ${row.users?.last_name ?? ''}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
        })
        .map((row, idx) => ({
        ...row,
        id: idx,
        }));
    }, [payslips, selectedYear, selectedMonth, searchQuery]);


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

    console.log(selectedRow?.users?.first_name)
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

    const handleSubmit = (actionType: 'partial' | 'publish') : FormEventHandler  => {
        return (e) => {
            e.preventDefault();
            if (actionType === 'partial') {
                post(route('admin.store.partial'), {
                    onSuccess: () => {
                        setAddModal(false);
                        reset(); 
                        setSelectName('Select Employee');
                    },
                });
            }
            if (actionType === 'publish') {
                post(route('admin.store.publish'), {
                    onSuccess: () => {
                        setAddModal(false);
                        reset(); 
                        setSelectName('Select Employee');
                    }
                })
            }
        }
    }
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
                                <Dropdown.Content contentClasses="w-[200px]" align="left">
                                {availableYears.map((year) => (
                                    <button
                                    key={year}
                                    onClick={() => handleChange(year, selectedMonth)}
                                    className="block w-full text-left px-4 py-1 hover:bg-red-500"
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
                                <Dropdown.Content contentClasses="w-[200px]" align="left">
                                {availableMonths.map((m) => ( 
                                    <button
                                    key={m.number}
                                    onClick={() => handleChange(Number(selectedYear), m.number)}
                                    className="block w-full text-left px-4 py-1 hover:bg-red-500"
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
                            />
                            </div>
                        </div>
                    </div>   

            {/*Modal*/}
                <Modal show={addModal} onClose={() => setAddModal(false)} maxWidth="5xl" className="h-full">
                    <form >
                        <div className="p-6 space-y-4 border rounded-lg">
                            <div className="flex justify-between">
                                <h2 className="text-lg text-white">New Payroll</h2>
                                {/*<h2 className="text-lg font-bold mb-4 text-white">{[selectedRow?.user?.employee_id+" - ", selectedRow?.user?.last_name + ", " ,selectedRow?.user?.first_name]}</h2>*/}
                                <span onClick={() => setAddModal(false)}>
                                    <IoMdClose color="white" className="cursor-pointer text-2xl"/>
                                </span>
                            </div>
                                <CardWrapper className="justify-between p-3 gap-4 text-white">
                                    {/*EARNINGS*/}
                                    <p>Earning</p>
                                        <div className="flex gap-4">
                                            <div className='w-full my-2'>
                                                <InputLabel htmlFor="department" value="Employee *"  className='text-white'/>
                                                <Dropdown>
                                                    <Dropdown.Trigger>
                                                        <button type="button" className="bg-transparent w-full border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full">
                                                            <p className='text-sm'>{selectName}</p>
                                                            <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                                        </button>
                                                    </Dropdown.Trigger> 
                                                    <Dropdown.Content ableSearch={true} contentClasses="bg-gray-300 w-full max-h-[200px] overflow-y-auto p-0" align="left">
                                                    {newPayroll
                                                    ?.map((newPayroll, index) => {
                                                        const payrolUsers = newPayroll;
                                                        const name = `${payrolUsers?.employee_id} - ${payrolUsers?.first_name} ${payrolUsers?.last_name}`;

                                                        return (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            id="employee"
                                                            name="employee"
                                                            onClick={() => handleDropdownSelect(payrolUsers, 'employee')}
                                                            className="w-full px-4 py-2 text-left bg-gray-300 hover:bg-[#145858] text-black hover:text-white"
                                                        >
                                                            {name}
                                                        </button>
                                                        );
                                                    })}

                                                    </Dropdown.Content>
                                                </Dropdown>
                                            </div>
                                            {/*BASIC SALARY*/}
                                            <TextInputGroup label="Basic Salary" id="basic_pay" value={data.basic_pay} disabled/>
                                            <TextInputGroup label="PERA" id="PERA" value={data.pera} 
                                            onChange={(e) => {setData('pera', e.target.value)}} 
                                            disabled={disableInput}/>
                                        </div>
                                </CardWrapper>
                                {/* DEDUCTIONS */}
                                <CardWrapper className="justify-between p-3 w-full text-white">
                                    <p>Deductions</p>
                                        <div className="flex gap-4 ">
                                            {/*Absences w/o pay*/}
                                            <TextInputGroup label="Absences w/o pay" id="Absences w/o pay" value={data.absent }
                                            onChange={(e) =>{setData('absent', e.target.value)}}
                                            disabled={disableInput}/>
                                            {/*W/holding Tax*/}
                                            <TextInputGroup label="W/holding Tax" id="W/holding Tax" value={data.holding_tax}
                                            onChange={(e) =>{setData('holding_tax', e.target.value)}}
                                            disabled={disableInput}/>
                                            {/*Late/Undertime*/}
                                            <TextInputGroup label="Late/Undertime" id="Late/Undertime" value={data.late}
                                            onChange={(e) =>{setData('late', e.target.value)}}
                                            disabled={disableInput}/>
                                        </div>
                                </CardWrapper>  
                                <CardWrapper className=" p-3 gap-4 text-white">
                                        <p>GSIS</p>
                                        <div className="flex justify-between gap-4">
                                            {/*RLIP*/}
                                            <TextInputGroup label="RLIP" id="RLIP" value={data.rlip}
                                            onChange={(e) =>{setData('rlip', e.target.value)}} disabled/>
                                            {/*Policy Loan*/}
                                            <TextInputGroup label="Policy Loan" id="Policy Loan" value={data.policy_loan}
                                            onChange={(e) =>{setData('policy_loan', e.target.value)}}
                                            disabled={disableInput}/>
                                            {/*Consol Loan*/}
                                            <TextInputGroup label="Consol Loan" id="Consol Loan" value={data.consol_loan}
                                            onChange={(e) =>{setData('consol_loan', e.target.value)}}
                                            disabled={disableInput}/>                                                    
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            {/*Emergency Loan*/}
                                            <TextInputGroup label="Emergency Loan" id="Emergency Loan" value={data.emerg_loan}
                                            onChange={(e) =>{setData('emerg_loan', e.target.value)}}
                                            disabled={disableInput}/>
                                            {/*GEL*/}
                                            <TextInputGroup label="GEL" id="GEL" value={data.gel}
                                            onChange={(e) =>{setData('gel', e.target.value)}}
                                            disabled={disableInput}/>
                                            {/*GFAL*/}
                                            <TextInputGroup label="GFAL" id="GFAL" value={data.gfal}
                                            onChange={(e) =>{setData('gfal', e.target.value)}}
                                            disabled={disableInput}/>
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            {/*MPL*/}
                                            <TextInputGroup label="MPL" id="MPL" value={data.mpl}
                                            onChange={(e) =>{setData('mpl', e.target.value)}}
                                            disabled={disableInput}/>
                                            {/*MPL LITE*/}
                                            <TextInputGroup label="MPL LITE" id="MPL" value={data.mpl_lite}
                                            onChange={(e) =>{setData('mpl_lite', e.target.value)}}
                                            disabled={disableInput}/>
                                        </div>
                                </CardWrapper>
                                <CardWrapper className="justify-between p-3 w-full text-white">
                                    <p>HDMF</p>
                                    <div className="flex gap-4 ">
                                        {/*Contribution*/}
                                        <TextInputGroup label="Contributions" id="contributions" value={data.contributions}
                                        onChange={(e) =>{setData('contributions', e.target.value)}}
                                        disabled={disableInput}/>
                                        {/*Loans*/}
                                        <TextInputGroup label="Loans" id="Loans" value={data.loans}
                                        onChange={(e) =>{setData('loans', e.target.value)}}
                                        disabled={disableInput}/>
                                        {/*Housing Loans*/}
                                        <TextInputGroup label="Housing Loans" id="Housing Loans" value={data.housing_loan}
                                        onChange={(e) =>{setData('housing_loan', e.target.value)}}
                                        disabled={disableInput}/>
                                    </div>
                                </CardWrapper>
                                <CardWrapper className="justify-between p-3 w-full text-white">
                                    <p>OTHER DEDUCTIONS</p>
                                    <div className="flex gap-4">
                                        {/*Philhealht*/}
                                        <TextInputGroup label="Philhealth" id="philhealth" value={data.philhealth}
                                        onChange={(e) =>{setData('philhealth', e.target.value)}}disabled />
                                        {/*CFI*/}
                                        <TextInputGroup label="CFI" id="cfi" value={data.cfi}
                                        onChange={(e) =>{setData('cfi', e.target.value)}}
                                        disabled={disableInput}/>
                                        {/*TIPID*/}
                                        <TextInputGroup label="TIPID" id="tipid" value={data.tipid}
                                        onChange={(e) =>{setData('tipid', e.target.value)}}
                                        disabled={disableInput}/>
                                    </div>
                                    <div className="flex gap-4">
                                        {/*CITY BANKS SAVING*/}
                                        <TextInputGroup label="CITY BANK SAVINGS" id="city_bank_savings" value={data.city_savings_bank}
                                        onChange={(e) =>{setData('city_savings_bank', e.target.value)}}
                                        disabled={disableInput}/>
                                        {/*FEA*/}
                                        <TextInputGroup label="FEA" id="fea" value={data.fea}
                                        onChange={(e) =>{setData('fea', e.target.value)}}
                                        disabled={disableInput}/>
                                        {/*CANTEEN*/}
                                        <TextInputGroup label="CANTEEN" id="canteen" value={data.canteen}
                                        onChange={(e) =>{setData('canteen', e.target.value)}}
                                        disabled={disableInput}/>
                                    </div>
                                    <div className="flex gap-4">
                                        {/*Disallowance*/}
                                        <TextInputGroup label="Disallowance" id="disallowance1" value={data.disallowance}
                                        onChange={(e) =>{setData('disallowance', e.target.value)}}
                                        disabled={disableInput}/>
                                        {/*Unliquidated Cash Advances*/}
                                        <TextInputGroup label="Unliquidated Cash Advances" id="unliquidated_cash_advances" value={data.unliquidated_ca}
                                        onChange={(e) =>{setData('unliquidated_ca', e.target.value)}}
                                        disabled={disableInput}/>
                                        {/*Honoraria*/}
                                        <TextInputGroup label="Disallowance(Honoraria)" id="Honoraria" value={data.disallowance_honoraria}
                                        onChange={(e) =>{setData('disallowance_honoraria', e.target.value)}}
                                        disabled={disableInput}/>
                                    </div>
                                    <div className="flex gap-4">
                                        {/*COOP*/}
                                        <TextInputGroup label="COOP" id="coop" value={data.coop}
                                        onChange={(e) =>{setData('coop', e.target.value)}}
                                        disabled={disableInput}/>
                                        {/*LANDBANK*/}
                                        <TextInputGroup label="LANDBANK" id="landbank" value={data.landbank}
                                        onChange={(e) =>{setData('landbank', e.target.value)}}
                                        disabled={disableInput}/>
                                        {/*UCPB*/}
                                        <TextInputGroup label="UCPB" id="ucpb" value={data.ucpb}
                                        onChange={(e) =>{setData('ucpb', e.target.value)}}
                                        disabled={disableInput}/>
                                    </div>
                            </CardWrapper>  
                            <div className="flex gap-4">
                            <PrimaryButton disabled={disableInput} onClick={handleSubmit('publish')}className='text-md mt-4 py-2 hover:bg-yellow-600'>Publish</PrimaryButton>
                            <PrimaryButton disabled={disableInput} onClick={handleSubmit('partial')}className='text-md mt-4 hover:bg-yellow-600'>Partial</PrimaryButton>
                            <PrimaryButton onClick={
                                () => {setAddModal(false)}}className='text-md mt-4 hover:bg-yellow-600'>Cancel</PrimaryButton>
                            </div>
                            
                        </div>
                    </form>
                </Modal>
                
                {/*EDIT*/}
                <Modal show={editModal} onClose={() => setEditModal(false)} maxWidth="5xl" className="h-full">
                    <form >
                        <div className="p-6 space-y-4 border rounded-lg">
                            <div className="flex justify-between">
                                {/*<h2 className="text-lg text-white">Edit Payroll</h2>*/}
                                <h2 className="text-lg font-bold mb-4 text-white">Edit Employee's Payroll - {[selectedRow?.employee_id+" - ", selectedRow?.last_name + ", " ,selectedRow?.first_name] }</h2>
                                <span onClick={() => setAddModal(false)}>
                                    <IoMdClose color="white" className="cursor-pointer text-2xl"/>
                                </span>
                            </div>
                                <CardWrapper className="justify-between p-3 gap-4 text-white">
                                    {/*EARNINGS*/}
                                    <p>Earning</p>
                                        <div className="flex gap-4">
                                            {/*BASIC SALARY*/}
                                            <TextInputGroup label="Basic Salary" id="basic_salary" value={data.basic_salary} disabled/>
                                            <TextInputGroup label="PERA" id="PERA" value={data.pera}
                                            onChange={(e) =>{setData('pera', e.target.value)}}/>
                                        </div>
                                </CardWrapper>
                                <CardWrapper className="justify-between p-3 w-full text-white">
                                    <p>Deductions</p>
                                        <div className="flex gap-4 ">
                                            {/*Absences w/o pay*/}
                                            <TextInputGroup label="Absences w/o pay" id="Absences w/o pay" value={data.absent}
                                            onChange={(e) =>{setData('absent', e.target.value)}}/>
                                            {/*W/holding Tax*/}
                                            <TextInputGroup label="W/holding Tax" id="W/holding Tax" value={data.holding_tax}
                                            onChange={(e) =>{setData('holding_tax', e.target.value)}}/>
                                            {/*Late/Undertime*/}
                                            <TextInputGroup label="Late/Undertime" id="Late/Undertime" value={data.late}
                                            onChange={(e) =>{setData('late', e.target.value)}}/>
                                        </div>
                                </CardWrapper>  
                                <CardWrapper className=" p-3 gap-4 text-white">
                                        <p>GSIS</p>
                                        <div className="flex justify-between gap-4">
                                            {/*RLIP*/}
                                            <TextInputGroup label="RLIP" id="RLIP" value={data.rlip}
                                            onChange={(e) =>{setData('rlip', e.target.value)}} disabled/>
                                            {/*Policy Loan*/}
                                            <TextInputGroup label="Policy Loan" id="Policy Loan" value={data.policy_loan}
                                            onChange={(e) =>{setData('policy_loan', e.target.value)}}/>
                                            {/*Consol Loan*/}
                                            <TextInputGroup label="Consol Loan" id="Consol Loan" value={data.consol_loan}
                                            onChange={(e) =>{setData('consol_loan', e.target.value)}}/>                                                    
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            {/*Emergency Loan*/}
                                            <TextInputGroup label="Emergency Loan" id="Emergency Loan" value={data.emerg_loan}
                                            onChange={(e) =>{setData('emerg_loan', e.target.value)}}/>
                                            {/*GEL*/}
                                            <TextInputGroup label="GEL" id="GEL" value={data.gel}
                                            onChange={(e) =>{setData('gel', e.target.value)}}/>
                                            {/*GFAL*/}
                                            <TextInputGroup label="GFAL" id="GFAL" value={data.gfal}
                                            onChange={(e) =>{setData('gfal', e.target.value)}}/>
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            {/*MPL*/}
                                            <TextInputGroup label="MPL" id="MPL" value={data.mpl}
                                            onChange={(e) =>{setData('mpl', e.target.value)}}/>
                                            {/*MPL LITE*/}
                                            <TextInputGroup label="MPL LITE" id="MPL" value={data.mpl_lite}
                                            onChange={(e) =>{setData('mpl_lite', e.target.value)}}/>
                                        </div>
                                </CardWrapper>
                                <CardWrapper className="justify-between p-3 w-full text-white">
                                    <p>HDMF</p>
                                    <div className="flex gap-4 ">
                                        {/*Contribution*/}
                                        <TextInputGroup label="Contribution" id="Contribution" value={data.contributions}
                                        onChange={(e) =>{setData('contributions', e.target.value)}}/>
                                        {/*Loans*/}
                                        <TextInputGroup label="Loans" id="Loans" value={data.loans}
                                        onChange={(e) =>{setData('loans', e.target.value)}}/>
                                        {/*Housing Loans*/}
                                        <TextInputGroup label="Housing Loans" id="Housing Loans" value={data.housing_loan}
                                        onChange={(e) =>{setData('housing_loan', e.target.value)}}/>
                                    </div>
                                </CardWrapper>
                                <CardWrapper className="justify-between p-3 w-full text-white">
                                    <p>OTHER DEDUCTIONS</p>
                                    <div className="flex gap-4">
                                        {/*Philhealht*/}
                                        <TextInputGroup label="Philhealth" id="philhealth" value={data.philhealth}
                                        onChange={(e) =>{setData('philhealth', e.target.value)}} disabled />
                                        {/*CFI*/}
                                        <TextInputGroup label="CFI" id="cfi" value={data.cfi}
                                        onChange={(e) =>{setData('cfi', e.target.value)}}/>
                                        {/*TIPID*/}
                                        <TextInputGroup label="TIPID" id="tipid" value={data.tipid}
                                        onChange={(e) =>{setData('tipid', e.target.value)}}/>
                                    </div>
                                    <div className="flex gap-4">
                                        {/*CITY BANKS SAVING*/}
                                        <TextInputGroup label="CITY BANK SAVINGS" id="city_bank_savings" value={data.city_savings_bank}
                                        onChange={(e) =>{setData('city_savings_bank', e.target.value)}}/>
                                        {/*FEA*/}
                                        <TextInputGroup label="FEA" id="fea" value={data.fea}
                                        onChange={(e) =>{setData('fea', e.target.value)}}/>
                                        {/*CANTEEN*/}
                                        <TextInputGroup label="CANTEEN" id="canteen" value={data.canteen}
                                        onChange={(e) =>{setData('canteen', e.target.value)}}/>
                                    </div>
                                    <div className="flex gap-4">
                                        {/*Disallowance*/}
                                        <TextInputGroup label="Disallowance" id="disallowance1" value={data.disallowance}
                                        onChange={(e) =>{setData('disallowance', e.target.value)}}/>
                                        {/*Unliquidated Cash Advances*/}
                                        <TextInputGroup label="Unliquidated Cash Advances" id="unliquidated_cash_advances" value={data.unliquidated_ca}
                                        onChange={(e) =>{setData('unliquidated_ca', e.target.value)}}/>
                                        {/*Honoraria*/}
                                        <TextInputGroup label="Disallowance(Honoraria)" id="Honoraria" value={data.disallowance_honoraria}
                                        onChange={(e) =>{setData('disallowance_honoraria', e.target.value)}}/>
                                    </div>
                                    <div className="flex gap-4">
                                        {/*COOP*/}
                                        <TextInputGroup label="COOP" id="coop" value={data.coop}
                                        onChange={(e) =>{setData('coop', e.target.value)}}/>
                                        {/*LANDBANK*/}
                                        <TextInputGroup label="LANDBANK" id="landbank" value={data.landbank}
                                        onChange={(e) =>{setData('landbank', e.target.value)}}/>
                                        {/*UCPB*/}
                                        <TextInputGroup label="UCPB" id="ucpb" value={data.ucpb}
                                        onChange={(e) =>{setData('ucpb', e.target.value)}}/>
                                    </div>
                            </CardWrapper>  
                            <div className="flex gap-4">
                            <PrimaryButton onClick={handleEdit('publish')}className='text-md mt-4 py-2 hover:bg-yellow-600'>Publish</PrimaryButton>
                            <PrimaryButton onClick={handleEdit('partial')}className='text-md mt-4 hover:bg-yellow-600'>Partial</PrimaryButton>
                            <PrimaryButton className='text-md mt-4 hover:bg-yellow-600'>Cancel</PrimaryButton>
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