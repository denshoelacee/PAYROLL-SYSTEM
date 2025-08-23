import Modal from "@/Components/Modal";
import InputWrapper from "@/Components/InputWrapper";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInputGroup from "@/Components/TextInputGroup";
import Dropdown from "@/Components/Dropdown";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import {useMemo, useState } from "react";
import { useForm } from "@inertiajs/react";
import { fieldTitles, validFieldIds } from "./fieldTitles";
import { router } from '@inertiajs/react';
import type { Employee,UserPayroll,filteredSelectedTypeUser } from "@/types";

interface Props {
    show: boolean;
    onClose: () => void;
    newPayroll: UserPayroll[];
    filteredEmployementType: filteredSelectedTypeUser[];
}

export default function PayrollAddModal({ show, onClose, newPayroll,filteredEmployementType }: Props) {
    const [selectName, setSelectName] = useState("Select Employee");
    const [disableInput, setDisableInput] = useState(true);
    const options = ['Regular', 'Part-Time','Job Order']
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('Select Employment Type')
    const { data, setData, post, reset } = useForm<any>({
        payroll_id: "",
        user_id: "",
        basic_pay: "",
        basic_salary: "",
        pera: "",
        absent: "",
        late: "",
        holding_tax: "",
        tax_bal_due: "",
        rlip: "",
        policy_loan: "",
        consol_loan: "",
        emerg_loan: "",
        gel: "",
        gfal: "",
        mpl: "",
        mpl_lite: "",
        contributions: "",
        loans: "",
        housing_loan: "",
        philhealth: "",
        cfi: "",
        tipid: "",
        city_savings_bank: "",
        fea: "",
        canteen: "",
        disallowance: "",
        unliquidated_ca: "",
        disallowance_honoraria: "",
        coop: "",
        landbank: "",
        ucpb: "",
        publish_status: "",
    });

    const isSalaryZero = Number(data.basic_pay) === 0;

    const handleDropdownSelect = (value: filteredSelectedTypeUser) => {
        setSelectName(`${value.employee_id} - ${value.full_name}`);
        setDisableInput(true);
       
        setData({
            ...data,
            user_id: value.user_id ?? "",
            basic_pay: value?.payroll?.basic_pay ?? "",
            pera: value?.payroll?.latest_payroll?.pera ?? 0,
            absent: value?.payroll?.latest_payroll?.absent ?? 0,
            late: value?.payroll?.latest_payroll?.late ?? 0,
            holding_tax: value?.payroll?.latest_payroll?.holding_tax ?? "",
            tax_bal_due: value?.payroll?.latest_payroll?.tax_bal_due ?? 0,
            rlip: value?.payroll?.latest_payroll?.rlip ?? 0,
            policy_loan: value?.payroll?.latest_payroll?.policy_loan ?? 0,
            consol_loan: value?.payroll?.latest_payroll?.consol_loan ?? 0,
            emerg_loan: value?.payroll?.latest_payroll?.emerg_loan ?? 0,
            gel: value?.payroll?.latest_payroll?.gel ?? 0,
            gfal: value?.payroll?.latest_payroll?.gfal ?? 0,
            mpl: value?.payroll?.latest_payroll?.mpl ?? 0,
            mpl_lite: value?.payroll?.latest_payroll?.mpl_lite ?? 0,
            contributions: value?.payroll?.latest_payroll?.contributions ?? 0,
            loans: value?.payroll?.latest_payroll?.loans ?? 0,
            housing_loan: value?.payroll?.latest_payroll?.housing_loan ?? 0,
            philhealth: value?.payroll?.latest_payroll?.philhealth ?? 0,
            cfi: value?.payroll?.latest_payroll?.cfi ?? 0,
            tipid: value?.payroll?.latest_payroll?.tipid ?? 0,
            city_savings_bank: value?.payroll?.latest_payroll?.city_savings_bank ?? 0,
            fea: value?.payroll?.latest_payroll?.fea ?? 0,
            canteen: value?.payroll?.latest_payroll?.canteen ?? 0,
            disallowance: value?.payroll?.latest_payroll?.disallowance ?? 0,
            unliquidated_ca: value?.payroll?.latest_payroll?.unliquidated_ca ?? 0,
            disallowance_honoraria: value?.payroll?.latest_payroll?.disallowance_honoraria ?? 0,
            coop: value?.payroll?.latest_payroll?.coop ?? 0,
            landbank: value?.payroll?.latest_payroll?.landbank ?? 0,
            ucpb: value?.payroll?.latest_payroll?.ucpb ?? 0,
        });

        if (value.user_id) {
            setLoading(true);

             const employmentType = activeTab.toLowerCase().replace(/\s+/g, '-');
            router.get(`/admin/payroll/select/${employmentType}/${value.user_id}`, {}, {
                preserveState: true,
                preserveScroll: true,
                only: ['newPayroll'],
                onSuccess: (page: any) => {
                    const newPayroll: UserPayroll = page.props.newPayroll;
                    setData((prevData: any) => ({
                        ...prevData,
                        ...newPayroll,
                  
                        basic_pay: newPayroll?.basic_pay|| prevData.basic_pay,
                        pera: newPayroll?.latest_payroll?.pera ?? "",
                      
                        
                    }));
                    console.log(newPayroll)
                    setLoading(false);
                    setDisableInput(false);
                },
                onError: (errors: any) => {
                    console.error('Error fetching payroll data:', errors);
                    setLoading(false);
                    setDisableInput(false);
                }
            });
        } else {
            setDisableInput(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (validFieldIds.includes(name) && /^\d*\.?\d*$/.test(value)) {
            setData(name, value);
        }
    };

    const handleSubmit = (actionType: "partial" | "publish") => (e: React.FormEvent) => {
        e.preventDefault();
        post(route(`admin.store.${actionType}`), {
            onSuccess: () => {
                reset();
                setSelectName("Select Employee");
                onClose();
            },
        });
    };

    const employeeOptions = useMemo(() => filteredEmployementType || [], [filteredEmployementType]);

    const handleEmploymentType = (value: any, field: string) => {
        if(field === 'Job Order'){
            setActiveTab(value)
        } 
        else if(field === 'Regular'){
            setActiveTab(value)
        }
        else if(field === 'Part-Time'){
            setActiveTab(value)
        }
        setData(field, value);
        
        const typeParam = field.toLowerCase().replace(/\s+/g, '-');

        // Send POST request to Select Employment Type -Regular,Job Order,Part-Time
        router.post(route('admin.payroll.filtered.type', { type: typeParam }), {
            employmentType: field
        });
    };

    if (!show) return null;

    return (
        <Modal show={show} onClose={onClose} maxWidth="5xl" className="h-full scrollbar-hidden">
            {/* Header */}    
            <div>
                <div className=" px-6 py-5 flex justify-between">
                    <h2 className="text-lg text-white">New Payroll</h2>
                    <IoMdClose color="white" className="cursor-pointer text-2xl" onClick={onClose} />
                </div>
                <div className="px-6">
                    <InputWrapper className="p-3 flex">
                        <div className='w-full'>
                            <InputLabel htmlFor="salary_type" value="Salary Type *"  className='text-white'/>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button" className="bg-transparent w-full border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full">
                                        <p className='text-sm'>{activeTab}</p>
                                        <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                    </button>
                                </Dropdown.Trigger> 
                                <Dropdown.Content ableSearch={true} contentClasses=" w-full max-h-[200px] overflow-y-auto p-0" align="left">
                                    {options
                                        .filter(department => department && department.toUpperCase() !== 'NULL') 
                                        .map((name, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            id="department"
                                            name="department"
                                            onClick={() => handleEmploymentType(name, name)}
                                            className="w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black"
                                        >
                                        {name}
                                        </button>
                                    ))}
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </InputWrapper>
                </div>
            </div>
            {activeTab === 'Regular' && (
                <form>
                <div className="p-6 space-y-4  ">
                    {/* Employee */}
                    <InputWrapper className="justify-between p-3 w-full text-white">
                        <p>Earning</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        <div className="my-2">
                            <InputLabel htmlFor="employee" value="Employee *" className="text-white" />
                            <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="bg-transparent w-full border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center">
                                <p className="text-sm">{selectName}</p>
                                <RiArrowDropDownLine className="text-2xl" />
                                </button>
                            </Dropdown.Trigger>
                            {/* Render options only when open (Dropdown implementation should handle this) */}
                            <Dropdown.Content ableSearch contentClasses="w-[275px] md:w-[225px] lg:w-[300px] max-h-[200px] overflow-y-auto p-0" align="left">
                                {employeeOptions.map((user, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleDropdownSelect(user)}
                                    disabled={loading}
                                    className="w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black disabled:opacity-50"
                                >
                                    {loading && data.user_id === user.user_id ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Loading...
                                        </span>
                                    ) : (
                                        `${user.employee_id} - ${user.full_name}`
                                    )}
                                </button>
                                ))}
                            </Dropdown.Content>
                            </Dropdown>
                        </div>
                        <TextInputGroup label="Basic Salary" id="basic_pay" name="basic_pay" value={data.basic_pay} disabled />
                        <TextInputGroup name="pera" label="PERA" id="pera" value={data.pera} onChange={handleInputChange} disabled={disableInput} />
                        </div>
                    </InputWrapper>
                    {/* Sections */}
                    {fieldTitles.map((section, index) => (
                        <InputWrapper key={index} className="justify-between p-3 w-full text-white">
                        <p>{section.title}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            {section.fields.map(({ label, id, disabled }) => (
                            <TextInputGroup
                                key={id}
                                label={label}
                                id={id}
                                name={id}
                                value={data[id]}
                                onChange={handleInputChange}
                                disabled={disabled ?? disableInput}
                                placeholder={label === "RLIP" || label === "Philhealth" ? "(AUTOGENERATED)" : ""}
                            />
                            ))}
                        </div>
                        </InputWrapper>
                    ))}
                    <div className="flex gap-4">
                        <PrimaryButton disabled={disableInput || isSalaryZero || loading} onClick={handleSubmit("publish")} className="text-md mt-4 py-2 hover:bg-yellow-600">
                        {loading ? 'Loading...' : 'Publish'}
                        </PrimaryButton>
                        <PrimaryButton disabled={disableInput || isSalaryZero || loading} onClick={handleSubmit("partial")} className="text-md mt-4 hover:bg-yellow-600">
                        {loading ? 'Loading...' : 'Partial'}
                        </PrimaryButton>
                        <PrimaryButton onClick={onClose} className="text-md mt-4 hover:bg-yellow-600">
                        Cancel
                        </PrimaryButton>
                    </div>
                </div>
            </form>
            )}
            {activeTab === 'Part-Time' && (
                <form>
                <div className="p-6 space-y-4  ">
                    {/* Employee */}
                    <InputWrapper className="justify-between p-3 w-full text-white">
                        <p>Earning</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            <div className="my-2">
                                <InputLabel htmlFor="employee" value="Employee *" className="text-white" />
                                <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button" className="bg-transparent w-full border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center">
                                    <p className="text-sm">{selectName}</p>
                                    <RiArrowDropDownLine className="text-2xl" />
                                    </button>
                                </Dropdown.Trigger>
                                {/* Render options only when open (Dropdown implementation should handle this) */}
                                <Dropdown.Content ableSearch contentClasses="w-[275px] md:w-[225px] lg:w-[300px] max-h-[200px] overflow-y-auto p-0" align="left">
                                    {employeeOptions.map((user, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleDropdownSelect(user)}
                                        disabled={loading}
                                        className="w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black disabled:opacity-50"
                                    >
                                        {loading && data.user_id === user.user_id ? 'Loading...' : `${user.employee_id} - ${user.full_name}`}
                                    </button>
                                    ))}
                                </Dropdown.Content>
                                </Dropdown>
                            </div>
                            <TextInputGroup label="Hourly Rate" id="hourly_rate" name="hourly_rate" onChange={handleInputChange} disabled={disableInput}/>
                            <TextInputGroup name="units" label="Units" id="units"/>
                            <TextInputGroup name="service_rendered" label="Service Rendered" id="service_rendered"/>
                            <TextInputGroup name="pera" label="PERA" id="PERA" value={data.pera} onChange={handleInputChange} disabled={disableInput} />
                        </div>
                    </InputWrapper>
                    {/* Sections */}
                    {fieldTitles.map((section, index) => (
                        <InputWrapper key={index} className="justify-between p-3 w-full text-white">
                        <p>{section.title}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            {section.fields.map(({ label, id, disabled }) => (
                            <TextInputGroup
                                key={id}
                                label={label}
                                id={id}
                                name={id}
                                value={data[id]}
                                onChange={handleInputChange}
                                disabled={disabled ?? disableInput}
                            />
                            ))}
                        </div>
                        </InputWrapper>
                    ))}
                    <div className="flex gap-4">
                        <PrimaryButton disabled={disableInput || isSalaryZero || loading} onClick={handleSubmit("publish")} className="text-md mt-4 py-2 hover:bg-yellow-600">
                        {loading ? 'Loading...' : 'Publish'}
                        </PrimaryButton>
                        <PrimaryButton disabled={disableInput || isSalaryZero || loading} onClick={handleSubmit("partial")} className="text-md mt-4 hover:bg-yellow-600">
                        {loading ? 'Loading...' : 'Partial'}
                        </PrimaryButton>
                        <PrimaryButton onClick={onClose} className="text-md mt-4 hover:bg-yellow-600">
                        Cancel
                        </PrimaryButton>
                    </div>
                </div>
            </form>
            )}
            {activeTab === 'Job Order' && (
                <form>
                <div className="p-6 space-y-4  ">
                    {/* Employee */}
                    <InputWrapper className="justify-between p-3 w-full text-white">
                        <p>Earning</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            <div className="my-2">
                                <InputLabel htmlFor="employee" value="Employee *" className="text-white" />
                                <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button" className="bg-transparent w-full border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center">
                                    <p className="text-sm">{selectName}</p>
                                    <RiArrowDropDownLine className="text-2xl" />
                                    </button>
                                </Dropdown.Trigger>
                                {/* Render options only when open (Dropdown implementation should handle this) */}
                                <Dropdown.Content ableSearch contentClasses="w-[275px] md:w-[225px] lg:w-[300px] max-h-[200px] overflow-y-auto p-0" align="left">
                                    {employeeOptions.map((user, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleDropdownSelect(user)}
                                        disabled={loading}
                                        className="w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black disabled:opacity-50"
                                    >
                                        {loading && data.user_id === user.user_id ? 'Loading...' : `${user.employee_id} - ${user.full_name}`}
                                    </button>
                                    ))}
                                </Dropdown.Content>
                                </Dropdown>
                            </div>
                            <TextInputGroup label="Daily Rate" id="daily_rate" name="daily_rate" onChange={handleInputChange} disabled={disableInput} />
                            <TextInputGroup name="pera" label="PERA" id="PERA" value={data.pera} onChange={handleInputChange} disabled={disableInput} />
                        </div>
                    </InputWrapper>
                    {/* Sections */}
                    {fieldTitles.map((section, index) => (
                        <InputWrapper key={index} className="justify-between p-3 w-full text-white">
                        <p>{section.title}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            {section.fields.map(({ label, id, disabled }) => (
                            <TextInputGroup
                                key={id}
                                label={label}
                                id={id}
                                name={id}
                                value={data[id]}
                                onChange={handleInputChange}
                                disabled={disabled ?? disableInput}
                            />
                            ))}
                        </div>
                        </InputWrapper>
                    ))}
                    <div className="flex gap-4">
                        <PrimaryButton disabled={disableInput || isSalaryZero || loading} onClick={handleSubmit("publish")} className="text-md mt-4 py-2 hover:bg-yellow-600">
                        {loading ? 'Loading...' : 'Publish'}
                        </PrimaryButton>
                        <PrimaryButton disabled={disableInput || isSalaryZero || loading} onClick={handleSubmit("partial")} className="text-md mt-4 hover:bg-yellow-600">
                        {loading ? 'Loading...' : 'Partial'}
                        </PrimaryButton>
                        <PrimaryButton onClick={onClose} className="text-md mt-4 hover:bg-yellow-600">
                        Cancel
                        </PrimaryButton>
                    </div>
                </div>
            </form>
            )}
        </Modal>
    );
}