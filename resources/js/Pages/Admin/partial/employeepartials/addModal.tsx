import Modal from "@/Components/Modal";
import InputWrapper from "@/Components/InputWrapper";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInputGroup from "@/Components/TextInputGroup";
import Dropdown from "@/Components/Dropdown";
import { RiArrowDropDownLine } from "react-icons/ri";
import {  useState,FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { JobTitles,EmploymentTypes } from "@/types";

interface Props {
  show: boolean;
  onClose: () => void;
  jobtitles: JobTitles[];
  employeeTypeList: EmploymentTypes[];
}

export default function EmployeeAddModal({ show, onClose,jobtitles,employeeTypeList }: Props) {
    const [selectDepartment, setSelectDepartment] = useState('Select Department');
    const [selectDesignation, setSelectDesignation] = useState('Select Designation');
    const [selectRole, setSelectRole] = useState('Select Role');
    const [selectEmploymentType, setSelectEmploymentType] = useState('Select Employment Type');
    const role = ['Admin','User'];

    const { data, setData, post} = useForm<any>({
        user_id:'',
        employee_id: '',
        last_name: '',
        first_name: '',
        designation: '',
        department: '',
        employment_type:'',
        basic_pay:'',
        role:''
    });

    const resetForms = () => {
        setData({
            employee_id: '',
            last_name: '',
            first_name: '',
            designation: '',
            department: '',
            employment_type: '',
            basic_pay: '',
            role: ''
        });
        setSelectDepartment('Select Department');
        setSelectDesignation('Select Designation');
        setSelectRole('Select Role');
        setSelectEmploymentType('Select Type');
    };

    const handleDropdownSelect = (value: any, field: string) => {
        if(field === 'department'){
            setSelectDepartment(value)
        } 
        else if(field === 'designation'){
            setSelectDesignation(value)
        }
        else if(field === 'role'){
            setSelectRole(value)
        }
        else if(field === 'employment_type'){
            setSelectEmploymentType(value)
        } 
        setData(field, value); 
    };

    const addSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('add.new.account'), {
            onSuccess: () => {
                onClose()
                resetForms();
            },
        });
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;

            if (
                (name === 'employee_id' && /^[0-9]*$/.test(value)) ||
                (name === 'basic_pay' && /^\d*\.?\d*$/.test(value))
            ) {
                setData(name, value);
            }
        };
  if (!show) return null;

  return (
    <Modal show={show} onClose={onClose} maxWidth="2xl" className="h-[600px] scrollbar-hidden" >
                <form onSubmit={addSubmit} >
                <div className="p-6 space-y-4 rounded-lg">
                    <h2 className="text-lg font-bold mb-4 text-white">Add New Employee</h2>
                        <InputWrapper className="justify-between p-3 gap-4 text-white">
                            <TextInputGroup 
                                label='Employee ID*' 
                                id='employee_id' 
                                type='text' 
                                value={data.employee_id}
                                onChange={handleInputChange}
                                inputMode="numeric"
                            />
                            
                        <div className='flex justify-between gap-4 w-full'>
                            <TextInputGroup 
                                label='First Name*' 
                                id='first_name' 
                                type='text' 
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                            />
                            <TextInputGroup 
                                label='Last Name*' 
                                id='last_name' 
                                type='text' 
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                            />
                        </div>
                    </InputWrapper>
                    <InputWrapper className="p-3 flex gap-4 flex-wrap md:flex-nowrap ">
                        <div className='w-full'>
                            <InputLabel htmlFor="department" value="Department *"  className='text-white'/>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button" className="bg-transparent w-full border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center ">
                                        <p className='text-sm'>{selectDepartment}</p>
                                        <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                    </button>
                                </Dropdown.Trigger> 
                                <Dropdown.Content ableSearch={true} contentClasses=" w-full max-h-[200px] overflow-y-auto p-0" align="left">
                                {jobtitles
                                    .map(dep => dep.department)
                                    .filter(department => department && department.toUpperCase() !== 'NULL') 
                                    .map((name, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        id="department"
                                        name="department"
                                        onClick={() => handleDropdownSelect(name, 'department')}
                                        className="w-full px-4 py-2 text-left  hover:bg-white text-white hover:text-black"
                                    >
                                    {name}
                                    </button>
                                ))}
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                        <div className='w-full'>
                            <InputLabel htmlFor="designation" value="Designation *"  className='text-white'/>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button" className="bg-transparent w-full border text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full">
                                        <p className='text-sm'>{selectDesignation}</p>
                                        <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                    </button>
                                </Dropdown.Trigger> 
                                <Dropdown.Content ableSearch={true} contentClasses="p-0 max-h-[200px] overflow-y-auto" align="left">
                                {jobtitles
                                    .map(des => des.designation)
                                    .filter(designations => designations && designations.toUpperCase() !== 'NULL') 
                                    .map((name, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        id="designation"
                                        name="designation"
                                        onClick={() => handleDropdownSelect(name, 'designation')}
                                        className=" w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black"
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
                            label='Basic Pay' 
                            id='basic_pay' 
                            type='text' 
                            value={data.basic_pay}
                            onChange={handleInputChange}
                            disabled={data.employment_type === "Part Time" || data.employment_type === "Job Order" || data.employment_type === ""}

                        />
                    </InputWrapper>
                    <InputWrapper className=" p-3 gap-4 flex flex-wrap md:flex-nowrap">
                        <div className="w-full">
                            <InputLabel htmlFor="role" value="Role *" className='text-white' />
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button" className="bg-transparent border w-full text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full">
                                        <p className='text-sm'>{selectRole}</p>
                                        <RiArrowDropDownLine className={` text-2xl transition-transform duration-500 ease-in-out`}/>
                                    </button>
                                </Dropdown.Trigger> 
                                <Dropdown.Content ableSearch={true} contentClasses="w-full" align="left" >
                                    {role.map((option, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        id='role'
                                        name='role'
                                        onClick={() => {
                                        handleDropdownSelect(option, 'role');
                                        }}
                                        className="w-full px-4 py-2 text-left  hover:bg-white text-white hover:text-black"
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
                                    <button type="button" className="bg-transparent border w-full text-white border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full">
                                        <p className='text-sm'>{selectEmploymentType}</p>
                                        <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                    </button>
                                </Dropdown.Trigger> 
                                <Dropdown.Content ableSearch={true} contentClasses=" w-full" align="left" >
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
                    <div className="flex gap-2">
                        <PrimaryButton className='text-md mt-1 py-2'>Save</PrimaryButton>
                        <PrimaryButton onClick={onClose}className='text-md mt-1'>Close</PrimaryButton>
                    </div>

                </div>
                </form>
            </Modal>
            
  );
}