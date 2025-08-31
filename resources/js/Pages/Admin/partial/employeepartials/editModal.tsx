import Modal from "@/Components/Modal";
import InputWrapper from "@/Components/InputWrapper";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInputGroup from "@/Components/TextInputGroup";
import InputLabel from "@/Components/InputLabel";
import Dropdown from "@/Components/Dropdown";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Employee, JobTitles, EmploymentTypes } from "@/types";

    //created_at not in query!!
interface Props {
    show: boolean;
    onClose: () => void;
    row: Employee | null;
    jobtitles: JobTitles[];
    employeeTypeList: EmploymentTypes[];
}

export default function EditEmployeeModal({
    show,
    onClose,
    row,
    jobtitles,
    employeeTypeList,
}: Props) {
    const roleOptions = ["Admin", "User"];

    const { data, setData, patch } = useForm<any>({
        employee_id: "",
        first_name: "",
        last_name: "",
        designation: "",
        department: "",
        employment_type: "",
        basic_pay: "",
        role: "",
    });

    const [selectDepartment, setSelectDepartment] = useState("Select Department");
    const [selectDesignation, setSelectDesignation] = useState("Select Designation");
    const [selectRole, setSelectRole] = useState("Select Role");
    const [selectEmploymentType, setSelectEmploymentType] = useState("Select Employment Type");

    useEffect(() => {
        if (show && row) {
        setData({
            employee_id: row.employee_id ?? "",
            first_name: row.first_name ?? "",
            last_name: row.last_name ?? "",
            designation: row.designation ?? "",
            department: row.department ?? "",
            employment_type: row.employment_type ?? "",
            basic_pay: row.basic_pay ?? "",
            role: row.role ?? "",
        });
        setSelectDepartment(row.department ?? "Select Department");
        setSelectDesignation(row.designation ?? "Select Designation");
        setSelectRole(row.role ?? "Select Role");
        setSelectEmploymentType(row.employment_type ?? "Select Employment Type");
        }
    }, [show, row]);

    const handleDropdownSelect = (value: string, field: string) => {
        if (field === "department") setSelectDepartment(value);
        if (field === "designation") setSelectDesignation(value);
        if (field === "role") setSelectRole(value);
        if (field === "employment_type") setSelectEmploymentType(value);
        setData(field, value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (
        (name === "employee_id" && /^[0-9]*$/.test(value)) ||
        (name === "basic_pay" && /^\d*\.?\d*$/.test(value)) ||
        (name !== "employee_id" && name !== "basic_pay")
        ) {
        setData(name, value);
        }
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!row?.user_id) return;
        patch(route("update.account", row.user_id), {
        onSuccess: onClose,
        });
    };

    if (!show) return null;

    return (
    <Modal show={show} onClose={onClose} maxWidth="2xl">
        <form onSubmit={handleUpdate}>
        <div className="p-6 space-y-4">
            <div className="flex justify-between">
                <h2 className="text-lg font-bold mb-4 text-white">
                Edit: {row?.employee_id} - {row?.last_name}, {row?.first_name}
                </h2>
                <span onClick={onClose}>
                <IoMdClose color="white" className="cursor-pointer text-2xl" />
                </span>
            </div>

            <InputWrapper className="justify-between p-3 gap-4">
            <TextInputGroup
                label="Employee ID*"
                id="employee_id"
                name="employee_id"
                type="text"
                value={data.employee_id}
                onChange={handleInputChange}
                inputMode="numeric"
                disabled
            />
            <div className="flex justify-between gap-4 w-full">
            <TextInputGroup
                label="First Name*"
                id="first_name"
                name="first_name"
                type="text"
                value={data.first_name}
                onChange={handleInputChange}
            />
            <TextInputGroup
                label="Last Name*"
                id="last_name"
                name="last_name"
                type="text"
                value={data.last_name}
                onChange={handleInputChange}
            />
            </div>
        </InputWrapper>

        <InputWrapper className="p-3 flex gap-4">
            <div className="w-full">
                <InputLabel htmlFor="department" value="Department *" className="text-white" />
                <Dropdown>
                <Dropdown.Trigger>
                    <button
                    type="button"
                    className="bg-transparent w-full border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center"
                    >
                    <p className="text-sm">{selectDepartment}</p>
                    <RiArrowDropDownLine className="text-2xl" />
                    </button>
                </Dropdown.Trigger>
                <Dropdown.Content ableSearch contentClasses="w-full max-h-[200px] overflow-y-auto p-0" align="left">
                    {jobtitles
                    .map((dep) => dep.department)
                    .filter((d) => d && d.toUpperCase() !== "NULL")
                    .map((name, idx) => (
                        <button
                        key={idx}
                        type="button"
                        onClick={() => handleDropdownSelect(name, "department")}
                        className="w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black"
                        >
                        {name}
                        </button>
                    ))}
                </Dropdown.Content>
                </Dropdown>
            </div>
                    
            <div className="w-full">
                <InputLabel htmlFor="designation" value="Designation *" className="text-white" />
                <Dropdown>
                <Dropdown.Trigger>
                    <button
                    type="button"
                    className="bg-transparent w-full border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center"
                    >
                    <p className="text-sm">{selectDesignation}</p>
                    <RiArrowDropDownLine className="text-2xl" />
                    </button>
                </Dropdown.Trigger>
                <Dropdown.Content ableSearch contentClasses="p-0 w-full max-h-[200px] overflow-y-auto" align="left">
                    {jobtitles
                    .map((des) => des.designation)
                    .filter((d) => d && d.toUpperCase() !== "NULL")
                    .map((name, idx) => (
                        <button
                        key={idx}
                        type="button"
                        onClick={() => handleDropdownSelect(name, "designation")}
                        className="w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black"
                        >
                        {name}
                        </button>
                    ))}
                </Dropdown.Content>
                </Dropdown>
            </div>
        </InputWrapper>
                
        <InputWrapper className="flex justify-between p-3 gap-4 w-full">
        <TextInputGroup
            label="Basic Pay*"
            id="basic_pay"
            name="basic_pay"
            type="text"
            value={data.basic_pay}
            onChange={handleInputChange}
        />
        </InputWrapper>

            <InputWrapper className=" p-3 gap-4 flex flex-wrap md:flex-nowrap">
                    <div className="w-full">
                        <InputLabel htmlFor="role" value="Role *" className='text-white' />
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="w-full bg-transparent border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center ">
                                    <p className='text-sm'>{selectRole}</p>
                                    <RiArrowDropDownLine className={` text-2xl transition-transform duration-500 ease-in-out`}/>
                                </button>
                            </Dropdown.Trigger> 
                            <Dropdown.Content contentClasses="w-full" align="left" >
                                {roleOptions.map((option, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    id='role'
                                    name='role'
                                    onClick={() => {
                                    handleDropdownSelect(option, 'role');
                                    }}
                                    className="w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black"
                                >
                                    {option}
                                </button>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div className="w-full">
                        <InputLabel htmlFor="employment_type" value="Employment Type *" className='text-white' />
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="w-full bg-transparent border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center">
                                    <p className='text-sm'>{selectEmploymentType}</p>
                                    <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                </button>
                            </Dropdown.Trigger> 
                            <Dropdown.Content contentClasses=" w-full" align="left" >
                                {employeeTypeList.map((option, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    id='role'
                                    name='role'
                                    onClick={() => {
                                    handleDropdownSelect(option.employment_type_list, 'employment_type');
                                    }}
                                    className="w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black"
                                >
                                    {option.employment_type_list}
                                </button>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </InputWrapper>

          <div className="flex gap-4">
            <PrimaryButton type="submit" className="text-md mt-4 py-2 hover:bg-yellow-600">
              Save
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
