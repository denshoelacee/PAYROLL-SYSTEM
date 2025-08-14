import Modal from "@/Components/Modal";
import InputWrapper from "@/Components/InputWrapper";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInputGroup from "@/Components/TextInputGroup";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { fieldTitles, validFieldIds } from "./fieldTitles";

interface Row {
    payroll_id: string | number;
    user_id: string | number;
    basic_pay?: number | string;
    pera?: number | string;
    [key: string]: any;
}

interface Props {
    show: boolean;
    onClose: () => void;
    row: Row;
}

export default function PayrollEditModal({ show, onClose, row }: Props) {
    const [submitTrigger, setSubmitTrigger] = useState<"partial" | "publish" | null>(null);

    const { data, setData, post } = useForm<any>({
        payroll_id: "",
        user_id: "",
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

    useEffect(() => {
        if (show && row) {
        setData({
            payroll_id: row?.payroll_id ?? "",
            user_id: row?.user_id,
            basic_salary: row?.basic_pay ?? "",
            pera: row?.pera ?? "",
            absent: row?.absent ?? "",
            late: row?.late ?? "",
            holding_tax: row?.holding_tax ?? "",
            tax_bal_due: row?.tax_bal_due ?? "",
            rlip: row?.rlip ?? "",
            policy_loan: row?.policy_loan ?? "",
            consol_loan: row?.consol_loan ?? "",
            emerg_loan: row?.emerg_loan ?? "",
            gel: row?.gel ?? "",
            gfal: row?.gfal ?? "",
            mpl: row?.mpl ?? "",
            mpl_lite: row?.mpl_lite ?? "",
            contributions: row?.contributions ?? "",
            loans: row?.loans ?? "",
            housing_loan: row?.housing_loan ?? "",
            philhealth: row?.philhealth ?? "",
            cfi: row?.cfi ?? "",
            tipid: row?.tipid ?? "",
            city_savings_bank: row?.city_savings_bank ?? "",
            fea: row?.fea ?? "",
            canteen: row?.canteen ?? "",
            disallowance: row?.disallowance ?? "",
            unliquidated_ca: row?.unliquidated_ca ?? "",
            disallowance_honoraria: row?.disallowance_honoraria ?? "",
            coop: row?.coop ?? "",
            landbank: row?.landbank ?? "",
            ucpb: row?.ucpb ?? "",
            publish_status: row?.publish_status,
        });
        }
    }, [show, row?.payroll_id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (validFieldIds.includes(name) && /^\d*\.?\d*$/.test(value)) setData(name, value);
    };

  // Publish / Partial
    const handleEdit = (actionType: "partial" | "publish") => (e: React.FormEvent) => {
        e.preventDefault();
        setData("publish_status", actionType);
        setSubmitTrigger(actionType);
    };

    useEffect(() => {
        if (submitTrigger && data.publish_status === submitTrigger) {
        post(route("admin.payroll.update-partial-publish", data.payroll_id), {
            onSuccess: () => {
            setSubmitTrigger(null);
            onClose();
            },
        });
        }
    }, [data.publish_status, submitTrigger]);

    if (!show) return null;

    return (
        <Modal show={show} onClose={onClose} maxWidth="5xl" className="h-full">
        <form>
            <div className="p-6 space-y-4 border rounded-lg">
            <div className="flex justify-between">
                <h2 className="text-lg font-bold mb-4 text-white">
                Edit Employee's Payroll
                </h2>
                <span onClick={onClose}>
                <IoMdClose color="white" className="cursor-pointer text-2xl" />
                </span>
            </div>

            <InputWrapper className="flex gap-4 p-3">
                <TextInputGroup label="Basic Salary" id="basic_pay" value={row?.basic_pay as any} disabled />
                <TextInputGroup name="pera" label="PERA" id="PERA" value={data.pera} onChange={handleInputChange} />
            </InputWrapper>

            {fieldTitles.map((section, idx) => (
                <InputWrapper key={idx} className="p-3 text-white space-y-4">
                <p className="font-medium">{section.title}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                    {section.fields.map(({ label, id, disabled = false }) => (
                    <TextInputGroup
                        key={id}
                        label={label}
                        id={id}
                        name={id}
                        value={data[id]}
                        onChange={handleInputChange}
                        disabled={disabled}
                        placeholder={label === "RLIP" || label === "Philhealth" ? "(AUTOGENERATED)" : ""}
                    />
                    ))}
                </div>
                </InputWrapper>
            ))}

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
            </div>
        </form>
        </Modal>
    );
}