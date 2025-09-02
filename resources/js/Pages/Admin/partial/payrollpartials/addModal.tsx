import Modal from "@/Components/Modal";
import InputWrapper from "@/Components/InputWrapper";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInputGroup from "@/Components/TextInputGroup";
import Dropdown from "@/Components/Dropdown";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useMemo, useState } from "react";
import { useForm } from "@inertiajs/react";
import { fieldTitles, validFieldIds } from "./fieldTitles";
import type { UserPayroll, filteredSelectedTypeUser } from "@/types";
import { router } from "@inertiajs/react";
import { JobTitles } from "@/types";

interface Props {
    show: boolean;
    onClose: () => void;
    newPayroll: UserPayroll[];
    filteredEmployementType: filteredSelectedTypeUser[];
    jobLists: JobTitles[];
}

export default function PayrollAddModal({
    show,
    onClose,
    filteredEmployementType,
    jobLists
}: Props) {
    const [selectName, setSelectName] = useState("Select Employee");
    const [disableInput, setDisableInput] = useState(true);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("Select Employment Type");
    const [selectDepartment, setselectDepartment] = useState("Select Department");
    const [selectDesignation, setselectDesignation] = useState("Select Designation");

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
    sss: "",
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
    deduction1: "",
    deduction2: "",
    deduction3: "",
    publish_status: "",
    employment_type: "",
    // For Part-Time & Job Order
    hourly_rate: "",
    service_rendered:"",
    units: "",
    duty_count: "",
    daily_rate: "",
    assigned_department: "",
    assigned_designation: "",
    });

    const isInvalid =
    (activeTab === "Regular" && Number(data.basic_pay) === 0) ||
    (activeTab === "Part-Time" &&
        (
        !data.hourly_rate?.trim() ||
        !data.units?.trim() ||
        !data.service_rendered?.trim() ||
        !data.assigned_department?.trim() ||
        !data.assigned_designation?.trim()
        )
    ) ||
    (activeTab === "Job Order" && 
        (
        !data.daily_rate?.trim() || 
        !data.duty_count?.trim()
        )
    );


    const employeeOptions = useMemo(
        () => filteredEmployementType || [],
        [filteredEmployementType]
    );

  /** --- Handlers --- **/
    const handleDropdownSelect = (value: filteredSelectedTypeUser) => {
        setSelectName(`${value.employee_id} - ${value.full_name}`);
        setDisableInput(true);
        const currentEmploymentType = data.employment_type;
        setData({
            ...data,
            user_id: value.user_id ?? "",
            basic_pay: value?.latest_payroll?.basic_pay ?? "",
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
            sss: value?.latest_payroll?.sss ?? "",
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
            employment_type: currentEmploymentType,
        });

    if (value.user_id) {
        setLoading(true);
        const employmentType = activeTab.toLowerCase().replace(/\s+/g, "-");
        router.get(`/admin/payroll/select/${employmentType}/${value.user_id}`,{},
            {
            preserveState: true,
            preserveScroll: true,
            only: ["newPayroll"],
            onSuccess: (page: any) => {
                const newPayroll: UserPayroll = page.props.newPayroll;
                setData((prevData: any) => ({
                ...prevData,
                ...newPayroll,
                basic_pay: newPayroll?.basic_pay || prevData.basic_pay,
                pera: newPayroll?.latest_payroll?.pera ?? "",
                absent: newPayroll?.latest_payroll?.absent ?? "",
                late: newPayroll?.latest_payroll?.late ?? "",
                holding_tax: newPayroll?.latest_payroll?.holding_tax ?? "",
                tax_bal_due: newPayroll?.latest_payroll?.tax_bal_due ?? "",
                rlip: newPayroll?.latest_payroll?.rlip ?? "",
                policy_loan: newPayroll?.latest_payroll?.policy_loan ?? "",
                consol_loan: newPayroll?.latest_payroll?.consol_loan ?? "",
                emerg_loan: newPayroll?.latest_payroll?.emerg_loan ?? "",
                gel: newPayroll?.latest_payroll?.gel ?? "",
                gfal: newPayroll?.latest_payroll?.gfal ?? "",
                mpl: newPayroll?.latest_payroll?.mpl ?? "",
                mpl_lite: newPayroll?.latest_payroll?.mpl_lite ?? "",
                contributions: newPayroll?.latest_payroll?.contributions ?? "",
                loans: newPayroll?.latest_payroll?.loans ?? "",
                housing_loan: newPayroll?.latest_payroll?.housing_loan ?? "",
                philhealth: newPayroll?.latest_payroll?.philhealth ?? "",
                sss: newPayroll?.latest_payroll?.sss ?? "",
                cfi: newPayroll?.latest_payroll?.cfi ?? "",
                tipid: newPayroll?.latest_payroll?.tipid ?? "",
                city_savings_bank: newPayroll?.latest_payroll?.city_savings_bank ?? "",
                fea: newPayroll?.latest_payroll?.fea ?? "",
                canteen: newPayroll?.latest_payroll?.canteen ?? "",
                disallowance: newPayroll?.latest_payroll?.disallowance ?? "",
                unliquidated_ca: newPayroll?.latest_payroll?.unliquidated_ca ?? "",
                disallowance_honoraria: newPayroll?.latest_payroll?.disallowance_honoraria ?? "",
                coop: newPayroll?.latest_payroll?.coop ?? "",
                landbank: newPayroll?.latest_payroll?.landbank ?? "",
                ucpb: newPayroll?.latest_payroll?.ucpb ?? "",
                employment_type: currentEmploymentType,
                }));
                //console.log(newPayroll)
                setLoading(false);
                setDisableInput(false);
            },   
            onError: () => {
                setLoading(false);
                setDisableInput(false);
            },
            }
        
        );
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

    const handleSubmit =
    (actionType: "partial" | "publish") => (e: React.FormEvent) => {
        e.preventDefault();

        const url = actionType === "partial" ? "/admin/payroll/store": "/admin/payroll/publish";

        post(url, {
        onSuccess: () => {
            reset();
            setSelectName("Select Employee");
            onClose();
        },
        });
    };


const handleEmploymentType = (field: string) => {
    reset();

    setSelectName("Select Employee"); 
    setselectDepartment("Select Department"); 
    setselectDesignation("Select Designation"); 
    setDisableInput(true);
    setData("employment_type", field);
    setActiveTab(field);

    const typeParam = field.toLowerCase().replace(/\s+/g, "-");

    router.post(
        `/admin/payroll/select/${typeParam}`, 
        { employmentType: field },
        { preserveState: true }
    );
};



  /** --- Reusable Renders --- **/
    const renderEmployeeDropdown = () => (
        <div className="my-2">
        <InputLabel htmlFor="employee" value="Employee *" className="text-white" />
        <Dropdown>
            <Dropdown.Trigger>
            <button
                type="button"
                className="bg-transparent w-full border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center"
            >
                <p className="text-sm">{selectName}</p>
                <RiArrowDropDownLine className="text-2xl" />
            </button>
            </Dropdown.Trigger>
            <Dropdown.Content
            ableSearch
            contentClasses="w-[275px] md:w-[225px] lg:w-[300px] max-h-[200px] overflow-y-auto p-0"
            align="left"
            >
            {employeeOptions.map((user, index) => (
                <button
                key={index}
                type="button"
                onClick={() => handleDropdownSelect(user)}
                disabled={loading}
                className="w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black disabled:opacity-50"
                >
                {loading && data.user_id === user.user_id
                    ? "Loading..."
                    : `${user.employee_id} - ${user.full_name}`}
                </button>
            ))}
            </Dropdown.Content>
        </Dropdown>
        </div>
        
    );

    const renderSectionFields = () =>
        fieldTitles.map((section, index) => (
        <InputWrapper
            key={index}
            className="justify-between p-3 w-full text-white"
        >
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
                placeholder={
                    label === "RLIP" || label === "Philhealth"
                    ? "(AUTOGENERATED)"
                    : ""
                }
                />
            ))}
            </div>
        </InputWrapper>
        ));

    const renderFooter = () => (
        <div className="flex gap-4">
        <PrimaryButton
            disabled={disableInput  || isInvalid || loading }
            onClick={handleSubmit("publish")}
            className="text-md mt-4 py-2 hover:bg-yellow-600"
        >
            {loading ? "Loading..." : "Publish"}
        </PrimaryButton>
        <PrimaryButton
            disabled={disableInput  || isInvalid || loading}
            onClick={handleSubmit("partial")}
            className="text-md mt-4 hover:bg-yellow-600"
        >
            {loading ? "Loading..." : "Partial"}
        </PrimaryButton>
        <PrimaryButton onClick={onClose} className="text-md mt-4 hover:bg-yellow-600">
            Cancel
        </PrimaryButton>
        </div>
    );

    if (!show) return null;

    return (
        <Modal
        show={show}
        onClose={onClose}
        maxWidth="5xl"
        className="h-full scrollbar-hidden"
        >
        {/* Header */}
        <div>
            <div className="px-6 py-5 flex justify-between">
            <h2 className="text-lg text-white">New Payroll</h2>
            <IoMdClose
                color="white"
                className="cursor-pointer text-2xl"
                onClick={onClose}
            />
            </div>

            {/* Employment Type Selector */}
            <div className="px-6">
            <InputWrapper className="p-3 flex">
                <div className="w-full">
                <InputLabel
                    htmlFor="salary_type"
                    value="Salary Type *"
                    className="text-white"
                />
                <Dropdown>
                    <Dropdown.Trigger>
                    <button
                        type="button"
                        className="bg-transparent w-full border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full"
                    >
                        <p className="text-sm">{activeTab}</p>
                        <RiArrowDropDownLine className="text-2xl" />
                    </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content
                    ableSearch
                    contentClasses=" w-full max-h-[200px] overflow-y-auto p-0"
                    align="left"
                    >
                    {["Regular", "Part-Time", "Job Order"].map((field, index) => (
                        <button
                        key={index}
                        type="button"
                        onClick={() => handleEmploymentType(field)}
                        className="w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black"
                        >
                        {field}
                        </button>
                    ))}
                    </Dropdown.Content>
                </Dropdown>
                </div>
            </InputWrapper>
            </div>
        </div>

        {/* Regular */}
        {activeTab === "Regular" && (
            <form>
            <div className="p-6 space-y-4">
                <InputWrapper className="justify-between p-3 w-full text-white">
                <p>Earning</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {renderEmployeeDropdown()}
                    <TextInputGroup
                    label="Basic Salary"
                    id="basic_pay"
                    name="basic_pay"
                    value={data.basic_pay}
                    disabled
                    />
                    <TextInputGroup
                    name="pera"
                    label="PERA"
                    id="pera"
                    value={data.pera}
                    onChange={handleInputChange}
                    disabled={disableInput}
                    />
                </div>
                </InputWrapper>
                {renderSectionFields()}
                {renderFooter()}
            </div>
            </form>
        )}

        {/* Part-Time */}
        {activeTab === "Part-Time" && (
            <form>
            <div className="p-6 space-y-4">
                <InputWrapper className="justify-between p-3 w-full text-white">
                <p>Earning</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {renderEmployeeDropdown()}
                    <div className="w-full my-2">
                        <InputLabel htmlFor="assigned_department" value="Department *" className='text-white' />
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="bg-transparent border w-full text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full">
                                    <p className='text-sm'>{selectDepartment}</p>
                                    <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                </button>
                            </Dropdown.Trigger> 
                            <Dropdown.Content ableSearch={true} contentClasses="w-full" align="left">
                            {jobLists
                                .map(dep => dep.department)
                                .filter(
                                department => department && department.toUpperCase() !== "NULL"
                                )
                                .map((department, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    id="assigned_department"
                                    name="assigned_department"
                                    onClick={() => {
                                    setselectDepartment(department);
                                    setData("assigned_department", department); 
                                    }}
                                    className="w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black"
                                >
                                    {department}
                                </button>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div className="w-full my-2">
                        <InputLabel htmlFor="assigned_department" value="Department *" className='text-white' />
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="bg-transparent border w-full text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full">
                                    <p className='text-sm'>{selectDesignation}</p>
                                    <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                </button>
                            </Dropdown.Trigger> 
                            <Dropdown.Content ableSearch={true} contentClasses="w-full" align="left">
                            {jobLists
                                .map(des => des.designation)
                                .filter(
                                designation => designation && designation.toUpperCase() !== "NULL"
                                )
                                .map((designation, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    id="assigned_designation"
                                    name="assigned_designation"
                                    onClick={() => {
                                    setselectDesignation(designation);
                                    setData("assigned_designation", designation); 
                                    }}
                                    className="w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black"
                                >
                                    {designation}
                                </button>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <TextInputGroup
                    label="Hourly Rate"
                    id="hourly_rate"
                    name="hourly_rate"
                    onChange={handleInputChange}
                    value={data.hourly_rate}
                    disabled={disableInput}
                    />
                    <TextInputGroup 
                    name="units" 
                    label="Units" 
                    id="units" 
                    onChange={handleInputChange} 
                    value={data.units}
                    disabled={disableInput}
                    />
                    <TextInputGroup
                    name="service_rendered"
                    label="Service Rendered"
                    id="service_rendered"
                    value={data.service_rendered}
                    onChange={handleInputChange}
                    disabled={disableInput}
                    />
                    <TextInputGroup
                    name="pera"
                    label="PERA"
                    id="pera"
                    value={data.pera}
                    onChange={handleInputChange}
                    disabled={disableInput}
                    />
                </div>
                </InputWrapper>
                {renderSectionFields()}
                {renderFooter()}
            </div>
        </form>
        )}

        {/* Job Order */}
        {activeTab === "Job Order" && (
            <form>
            <div className="p-6 space-y-4">
                <InputWrapper className="justify-between p-3 w-full text-white">
                <p>Earning</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {renderEmployeeDropdown()}
                    <TextInputGroup
                    label="Daily Rate"
                    id="daily_rate"
                    name="daily_rate"
                    value={data.daily_rate}
                    onChange={handleInputChange}
                    disabled={disableInput}
                    />
                    <TextInputGroup
                    label="Duty Count"
                    id="duty_count"
                    name="duty_count"
                    value={data.duty_count}
                    onChange={handleInputChange}
                    disabled={disableInput}
                    />
                    <TextInputGroup
                    name="pera"
                    label="PERA"
                    id="pera"
                    value={data.pera}
                    onChange={handleInputChange}
                    disabled={disableInput}
                    />
                </div>
                </InputWrapper>
                {renderSectionFields()}
                {renderFooter()}
            </div>
            </form>
        )}
        </Modal>
    );
}
