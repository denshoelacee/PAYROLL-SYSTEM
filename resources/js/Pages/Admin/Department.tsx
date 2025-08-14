import { EmploymentTypes, JobTitles, PageProps } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import AdminLayout from "@/Layouts/AdminLayout";
import AddDepartment from "./partial/AddDepartment";
import AddDesignation from "./partial/AddDesignation";
import AddEmployment from "./partial/AddEmployment";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInputGroup from "@/Components/TextInputGroup";
import InputWrapper from "@/Components/InputWrapper";

type Contributions = {
    rlip: number;
    philhealth: number;
};

type Props = PageProps<{
    empTypeList: EmploymentTypes[];
    jobTitleList: JobTitles[];
    contributionType: Contributions;
}>;

function Department({ auth, empTypeList, jobTitleList, contributionType }: Props) {
    // Initialize form data with useForm
    const { data, setData, post } = useForm({
        rlip: contributionType?.rlip?.toString() ?? "",
        philhealth: contributionType?.philhealth?.toString() ?? "",
    });

    // Get validation errors from Inertia props
    const { errors } = usePage().props as any;

    // Handle input change allowing only valid numbers (with decimals)
    const handleNumberChange = (key: "rlip" | "philhealth", value: string) => {
        // Allow digits and one dot only
        if (/^\d{0,2}(\.\d{0,2})?$/.test(value) || value === "") {
            setData(key, value);
        }
    };

    // Submit form using Inertia post
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("admin.contribution.add"));
    };


    return (
        <>
            <Head title="HR Configuration" />
            <div className="font-Inter">
                <Sidebar auth={auth} />
                <AdminLayout title="HR Configuration Settings">
                    <div className="w-full flex justify-between flex-wrap gap-4 p-4">
                        {/* Department Section */}
                        <div className="bg-[#16423C] border border-button-border-color rounded-lg w-full sm:w-[48%] lg:w-[32%] my-4">
                            <h2 className="text-lg font-semibold my-3 mx-5 text-white">
                                Department
                            </h2>
                            <AddDepartment jobTitleList={jobTitleList} />
                        </div>

                        {/* Designation Section */}
                        <div className="bg-[#16423C] border border-button-border-color rounded-lg w-full sm:w-[48%] lg:w-[32%] my-4">
                            <h2 className="text-lg font-semibold my-3 mx-5 text-white">
                                Designation
                            </h2>
                            <AddDesignation jobTitleList={jobTitleList} />
                        </div>

                        {/* Employment Type Section */}
                        <div className="bg-[#16423C] border border-button-border-color rounded-lg w-full sm:w-[48%] lg:w-[32%] my-4">
                            <h2 className="text-lg font-semibold my-3 mx-5 text-white">
                                Employment Type
                            </h2>
                            <AddEmployment empTypeList={empTypeList} />
                        </div>

                        {/* Fixed Payroll Settings */}
                        <form onSubmit={handleSubmit} className="w-full sm:w-[48%] lg:w-[32%]">
                            <InputWrapper className="p-4">
                                <p className="text-white mb-4 font-semibold">
                                    Fixed Payroll Settings Input
                                </p>

                                <TextInputGroup
                                    label="RLIP"
                                    id="rlip"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="99.99"
                                    value={data.rlip}
                                    onChange={(e) => handleNumberChange("rlip", e.target.value)}
                                />
                                {errors.rlip && (
                                    <div className="text-red-500 text-sm mt-1">{errors.rlip}</div>
                                )}

                                <TextInputGroup
                                    label="Philhealth"
                                    id="philhealth"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="99.99"
                                    value={data.philhealth}
                                    onChange={(e) => handleNumberChange("philhealth", e.target.value)}
                                    className="mt-4"
                                />
                                {errors.philhealth && (
                                    <div className="text-red-500 text-sm mt-1">{errors.philhealth}</div>
                                )}

                                <PrimaryButton type="submit" className="mt-6">
                                    Save
                                </PrimaryButton>
                            </InputWrapper>
                        </form>
                    </div>
                </AdminLayout>
            </div>
        </>
    );
}

export default Department;
