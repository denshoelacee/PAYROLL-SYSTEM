import Modal from "@/Components/Modal";
import InputWrapper from "@/Components/InputWrapper";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInputGroup from "@/Components/TextInputGroup";
import { IoMdClose } from "react-icons/io";
import { useEffect, useMemo, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import { fieldTitles, validFieldIds } from "./fieldTitles";
interface Row {
    payroll_id: string | number;
    user_id: string | number;
    basic_pay?: number;
    pera?: number | string;
    payslip_type: string;
    service_rendered?: number
    hourly_rate?: number 
    units?: number
    daily_rate?: number
    duty_count?: number
    [key: string]: any;
}

interface Props {
    show: boolean;
    onClose: () => void;
    row: Row;
    statutoryDeductions: {
        rlip: number;
        philhealth: number;
    };
    selectedYear: string;
    selectedMonth: string;
}

const fillable = {
    payroll_id: "",
    user_id: "",
    basic_pay: "",
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
    deduction1: "",
    deduction2: "",
    deduction3: "",
    // For Part-Time & Job Order
    hourly_rate: "",
    service_rendered: "",
    units: "",
    duty_count: "",
    daily_rate: "",
    employment_type: ""
}


export default function PayrollEditModal({ show, onClose, row, statutoryDeductions, selectedYear, selectedMonth }: Props) {
const [autoPhilhealth, setAutoPhilhealth] = useState(true);
const [autoRlip, setAutoRlip] = useState(true);
    const [submitTrigger, setSubmitTrigger] = useState<"partial" | "publish" | null>(null);
    const { data, setData, post } = useForm<any>(fillable);

    useEffect(() => {
    if (!show) return;

    const type = row?.payslip_type;

    let base = 0;
    console.log("Calculating deductions for type:", type, "with data:", data.basic_pay);
    // =========================
    // BASE PER TYPE
    // =========================
    if (type === "Regular") {
        base = Number(data.basic_salary || 0);
    } 
    else if (type === "Part-Time" || type === "Regular|Part-Time" || type === "Job Order|Part-Time") {
        base =
            Number(data.hourly_rate || 0) *
            Number(data.service_rendered || 0);
    } 
    else if (type === "Job Order") {
        base =
            Number(data.daily_rate || 0) *
            Number(data.duty_count || 0);
    }

    const minSalary = 10000;
    const maxSalary = 100000;

    const philRate = statutoryDeductions.philhealth / 100;
    const rlipRate = statutoryDeductions.rlip / 100;

    // =========================
    // PHILHEALTH
    // =========================
    let philhealth = 0;

    if (autoPhilhealth) {
        if (base <= minSalary) {
            philhealth = 250;
        } else if (base <= maxSalary) {
            philhealth = base * philRate;
        } else {
            philhealth = maxSalary * philRate;
        }
    } else {
        philhealth = 0;
    }

    // =========================
    // RLIP
    // =========================
    let rlip = 0;

    if (autoRlip) {
        rlip = base * rlipRate;
    } else {
        rlip = 0;
    }

    // =========================
    // APPLY
    // =========================
    setData("philhealth", philhealth.toFixed(2));
    setData("rlip", rlip.toFixed(2));

}, [
    show,
    row?.payslip_type,
    data.basic_pay,
    data.hourly_rate,
    data.units,
    data.daily_rate,
    data.duty_count,
    autoPhilhealth,
    autoRlip,
    statutoryDeductions
]);
    useEffect(() => {
        if (show && row?.payroll_id && row?.payslip_type) {
            router.get(
                route("admin.payroll.edit.data", {
                    payroll_id: row.payroll_id,
                    payslip_type: row.payslip_type,
                }),
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ["editPayroll"],
                    onSuccess: (page: any) => {
                        if (page.props?.editPayroll) {
                            setData((prev: any) => ({
                                ...prev,
                                ...page.props.editPayroll,
                            }));
                            console.log("EDIT", page.props?.editPayroll);
                        }
                    },
                }
            );
        }
    }, [show, row?.payroll_id, row?.payslip_type]);



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (validFieldIds.includes(name) && /^\d*\.?\d*$/.test(value)) setData(name, value);
    };

    // Publish / Partial
    const handleEdit = (actionType: "partial" | "publish") => (e: React.FormEvent) => {
        e.preventDefault();
        setData("publish_status", actionType);
        setData("employment_type", row.payslip_type);
        setSubmitTrigger(actionType);
    };

    useEffect(() => {
        if (submitTrigger && data.publish_status === submitTrigger) {
            const requestPayload = {
                ...data,
                philhealth_auto: autoPhilhealth,
                rlip_auto: autoRlip,
            };
            console.log("Submitting with payload:", requestPayload);
            post(route("admin.payroll.update-partial-publish", data.payroll_id), {
                data: requestPayload,
                onSuccess: () => {
                    onClose();
                    setSubmitTrigger(null);
                },
            });
        }
    }, [data.publish_status, submitTrigger]);


    const renderSectionFields = () =>
        fieldTitles.map((section, index) => (
            <InputWrapper
                key={index}
                className="justify-between p-3 w-full text-white"
            >
                <p>{section.title}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {section.fields
                        // .filter(({ id }) => {
                        //     if (row?.payslip_type === "Part-Time" || row?.payslip_type === "Job Order") {
                        //         return id !== "philhealth" && id !== "rlip" && id !== "contributions";
                        //     }
                        //     return true;
                        // })
                        .map(({ label, id }) => (
                            <div key={id} className="flex flex-col gap-1">
                                <TextInputGroup
                                    label={label}
                                    id={id}
                                    name={id}
                                    value={data[id]}
                                    onChange={handleInputChange}
                                    disabled={
                                        (id === 'rlip' || id === 'philhealth')
                                            ? true
                                            : false
                                    }
                                    placeholder={
                                        id === "rlip" || id === "philhealth"
                                            ? "(AUTOGENERATED)"
                                            : ""
                                    }
                                />

                                {(row?.payslip_type === "Part-Time" || row?.payslip_type === "Job Order" || row?.payslip_type === "Job Order|Part-Time" || row?.payslip_type === "Regular|Part-Time") && (
                                    <>
                                        {id === "philhealth" && (
                                            <label className="flex items-center gap-2 text-xs">
                                                <input
                                                    type="checkbox"
                                                    checked={autoPhilhealth}
                                                    onChange={(e) => setAutoPhilhealth(e.target.checked)}
                                                />
                                                {autoPhilhealth ? "Auto Deduction" : "No Deduction"}
                                            </label>
                                        )}
                                        {id === "rlip" && (
                                            <label className="flex items-center gap-2 text-xs">
                                                <input
                                                    type="checkbox"
                                                    checked={autoRlip}
                                                    onChange={(e) => setAutoRlip(e.target.checked)}
                                                />
                                                {autoRlip ? "Auto Deduction" : "No Deduction"}
                                            </label>
                                        )}
                                    </>
                                )}

                            </div>
                        ))}

                </div>
            </InputWrapper>
        ));

    const renderFooter = () => (
        <div className="flex gap-4">
            <PrimaryButton onClick={handleEdit("publish")} className="text-md mt-4 py-2 hover:bg-yellow-600">
                Publish
            </PrimaryButton>
            <PrimaryButton onClick={handleEdit("partial")} className="text-md mt-4 hover:bg-yellow-600">
                Partial
            </PrimaryButton>
            <PrimaryButton onClick={onClose} className="text-md mt-4 hover:bg-yellow-600">
                Cancel
            </PrimaryButton>
        </div>
    )
    if (!show) return null;
    const getMonthName = (month: number | string) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const index = Number(month) - 1;

    return months[index] || "";
};

const modalTitle = useMemo(() => {
    return `Update Payroll — ${row?.full_name || "Employee"} (${row?.payslip_type || "Type"}) — ${getMonthName(selectedMonth)} ${selectedYear}`;
}, [row?.payslip_type, row?.full_name, selectedYear, selectedMonth]);
    return (
        <Modal show={show} onClose={onClose} maxWidth="5xl" className="h-full">
            <form>
                <div className="p-6 space-y-4 border rounded-lg">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-bold mb-4 text-white">
                            {modalTitle}
                        </h2>
                        <span onClick={onClose}>
                            <IoMdClose color="white" className="cursor-pointer text-2xl" />
                        </span>
                    </div>

                    <InputWrapper className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-white">
                        {row?.payslip_type === "Regular" && (
                            <TextInputGroup label="Basic Salary" id="basic_pay" name="basic_pay" value={data?.basic_salary} disabled />
                        )}
                        {(row?.payslip_type === "Regular|Part-Time" || row?.payslip_type === "Part-Time" || row?.payslip_type === "Job Order|Part-Time") && (
                            <>
                                <TextInputGroup label="Hourly Rate" id="hourly_rate" name="hourly_rate" value={data?.hourly_rate} onChange={handleInputChange} />
                                <TextInputGroup name="units" label="Units" id="units" value={data?.units} onChange={handleInputChange} />
                                <TextInputGroup name="service_rendered" label="Service Rendered" id="service_rendered" value={data?.service_rendered} onChange={handleInputChange} />
                            </>
                        )}
                        {(row?.payslip_type === "Job Order") && (
                            <>
                                <TextInputGroup name="daily_rate" label="Daily Rate" id="daily_rate" value={data?.daily_rate} onChange={handleInputChange} />
                                <TextInputGroup name="duty_count" label="Daily Count" id="duty_count" value={data?.duty_count} onChange={handleInputChange} />
                            </>
                        )}
                        <TextInputGroup name="pera" label="PERA" id="PERA" value={data?.pera} onChange={handleInputChange} />
                    </InputWrapper>
                    {renderSectionFields()}
                    {renderFooter()}
                </div>
            </form>
        </Modal>
    );
}