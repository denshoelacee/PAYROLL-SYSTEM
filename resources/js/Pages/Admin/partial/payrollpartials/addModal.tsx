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
import type { Employee } from "@/types";

interface Props {
    show: boolean;
    onClose: () => void;
    newPayroll: Employee[];
}

export default function PayrollAddModal({ show, onClose, newPayroll }: Props) {
    const [selectName, setSelectName] = useState("Select Employee");
    const [disableInput, setDisableInput] = useState(true);
    const options = ['Regular', 'Part-Time','Job Order']
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

    const handleDropdownSelect = (value: Employee) => {
        setSelectName(`${value.employee_id} - ${value.first_name} ${value.last_name}`);
        setDisableInput(true);
        setData({
        user_id: value.user_id ?? "",
        basic_pay: value?.basic_pay ?? "",
        basic_salary: value?.latest_payroll?.basic_salary ?? "",
        pera: value?.latest_payroll?.pera ?? "",
        absent: value?.latest_payroll?.absent ?? "",
        late: value?.latest_payroll?.late ?? "",
        holding_tax: value?.latest_payroll?.holding_tax ?? "",
        tax_bal_due: value?.latest_payroll?.tax_bal_due ?? "",
        rlip: value?.latest_payroll?.rlip ?? "",
        policy_loan: value?.latest_payroll?.policy_loan ?? "",
        consol_loan: value?.latest_payroll?.consol_loan ?? "",
        emerg_loan: value?.latest_payroll?.emerg_loan ?? "",
        gel: value?.latest_payroll?.gel ?? "",
        gfal: value?.latest_payroll?.gfal ?? "",
        mpl: value?.latest_payroll?.mpl ?? "",
        mpl_lite: value?.latest_payroll?.mpl_lite ?? "",
        contributions: value?.latest_payroll?.contributions ?? "",
        loans: value?.latest_payroll?.loans ?? "",
        housing_loan: value?.latest_payroll?.housing_loan ?? "",
        philhealth: value?.latest_payroll?.philhealth ?? "",
        cfi: value?.latest_payroll?.cfi ?? "",
        tipid: value?.latest_payroll?.tipid ?? "",
        city_savings_bank: value?.latest_payroll?.city_savings_bank ?? "",
        fea: value?.latest_payroll?.fea ?? "",
        canteen: value?.latest_payroll?.canteen ?? "",
        disallowance: value?.latest_payroll?.disallowance ?? "",
        unliquidated_ca: value?.latest_payroll?.unliquidated_ca ?? "",
        disallowance_honoraria: value?.latest_payroll?.disallowance_honoraria ?? "",
        coop: value?.latest_payroll?.coop ?? "",
        landbank: value?.latest_payroll?.landbank ?? "",
        ucpb: value?.latest_payroll?.ucpb ?? "",
        });
        setDisableInput(false);
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

    const employeeOptions = useMemo(() => newPayroll || [], [newPayroll]);

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
                                        onClick={() => handleEmploymentType(name,name)}
                                        className="w-full px-4 py-2 text-left  hover:bg-white text-white hover:text-black"
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
                                    className="w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black"
                                >
                                    {`${user.employee_id} - ${user.first_name} ${user.last_name}`}
                                </button>
                                ))}
                            </Dropdown.Content>
                            </Dropdown>
                        </div>
                        <TextInputGroup label="Basic Salary" id="basic_pay" value={data.basic_pay} disabled />
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
                                placeholder={label === "RLIP" || label === "Philhealth" ? "(AUTOGENERATED)" : ""}
                            />
                            ))}
                        </div>
                        </InputWrapper>
                    ))}
                    <div className="flex gap-4">
                        <PrimaryButton disabled={disableInput || isSalaryZero} onClick={handleSubmit("publish")} className="text-md mt-4 py-2 hover:bg-yellow-600">
                        Publish
                        </PrimaryButton>
                        <PrimaryButton disabled={disableInput || isSalaryZero} onClick={handleSubmit("partial")} className="text-md mt-4 hover:bg-yellow-600">
                        Partial
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
                                        className="w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black"
                                    >
                                        {`${user.employee_id} - ${user.first_name} ${user.last_name}`}
                                    </button>
                                    ))}
                                </Dropdown.Content>
                                </Dropdown>
                            </div>
                            <TextInputGroup label="Hourly Rate" id="hourly_rate" onChange={handleInputChange} disabled={disableInput}/>
                            <TextInputGroup name="units" label="Units" id="Units"/>
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
                        <PrimaryButton disabled={disableInput || isSalaryZero} onClick={handleSubmit("publish")} className="text-md mt-4 py-2 hover:bg-yellow-600">
                        Publish
                        </PrimaryButton>
                        <PrimaryButton disabled={disableInput || isSalaryZero} onClick={handleSubmit("partial")} className="text-md mt-4 hover:bg-yellow-600">
                        Partial
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
                                        className="w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black"
                                    >
                                        {`${user.employee_id} - ${user.first_name} ${user.last_name}`}
                                    </button>
                                    ))}
                                </Dropdown.Content>
                                </Dropdown>
                            </div>
                            <TextInputGroup label="Daily Rate" id="daily_rate" onChange={handleInputChange} disabled={disableInput} />
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
                        <PrimaryButton disabled={disableInput || isSalaryZero} onClick={handleSubmit("publish")} className="text-md mt-4 py-2 hover:bg-yellow-600">
                        Publish
                        </PrimaryButton>
                        <PrimaryButton disabled={disableInput || isSalaryZero} onClick={handleSubmit("partial")} className="text-md mt-4 hover:bg-yellow-600">
                        Partial
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