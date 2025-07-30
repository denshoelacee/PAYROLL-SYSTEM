import { useEffect, FormEventHandler, useState } from 'react';
import RegisterLayout from '@/Layouts/RegisterLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import LoginLayout from '@/Layouts/LoginLayout';
import Dropdown from '@/Components/Dropdown';
import SecondaryButton from '@/Components/SecondaryButton';
import { RiArrowDropDownLine } from 'react-icons/ri';
import VerifyMessage from '@/Components/VerifyMessage';
import { Alert } from '@mui/material';
import {InfoMessage} from '@/Components/Alert';
import { EmploymentTypes, PageProps } from '@/types';
import { JobTitles } from '@/types';

type Props = {
    Jobtitles : JobTitles[]
    employeeTypeList :EmploymentTypes[]
}
export default function Register({Jobtitles,employeeTypeList}: Props) {

    

    const jobtitles = Jobtitles;
    //const designation = Jobtitles;
    const employeeTypelist = employeeTypeList

    const [step, setStep] = useState(1);
    const [validateErrors, setValidationErrors] = useState({
	employee_id: '',
        first_name: '',
        last_name: '',
        designation: '',
        department: '',
        employment_type: '',
})

const nextStep = () => {
    const errors = {
        employee_id: '',
        first_name: '',
        last_name: '',
        designation: '',
        department: '',
        employment_type: '',
    };

    const nameRegex = /^[A-Za-z\s'-]+$/;

    if (!data.employee_id.trim()) errors.employee_id = 'Employee ID is required.';
    if (!data.first_name.trim()) {
        errors.first_name = 'First name is required.';
    } else if (!nameRegex.test(data.first_name)) {
        errors.first_name = 'First name must contain only letters.';
    }

    if (!data.last_name.trim()) {
        errors.last_name = 'Last name is required.';
    } else if (!nameRegex.test(data.last_name)) {
        errors.last_name = 'Last name must contain only letters.';
    }

    if (!data.designation.trim()) errors.designation = 'Designation is required.';
    if (!data.department.trim()) errors.department = 'Department is required.';
    if (!data.employment_type.trim()) errors.employment_type = 'Employment Type is required.';

    setValidationErrors(errors);

    // If no errors, go to next step
    const hasErrors = Object.values(errors).some((msg) => msg !== '');
    if (!hasErrors) {
        setStep((prev) => prev + 1);
    }
};
    const prevStep = () => setStep(prev => prev - 1);
    const [selectDepartment, setSelectDepartment] = useState('Select Department');
    const [selectQuestion, setSelectQuestion] = useState('Select Question');
    const [selectDesignation, setSelectDesignation] = useState('Select Designation');
    const [selectEmploymentType, setSelectEmploymentType] = useState('Select Employment Type');

    const options = ['What is ROBLOX', 'ADIK BA SI RAYJAY UG GROW A GARDEN?'];

    const {message}:any = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm<any>({
        employee_id: '',
        last_name: '',
        first_name: '',
        designation: '',
        department: '',
        employment_type:'',
        password: '',
        password_confirmation: '',
        secret_question: '',
        secret_answer: '',
    });
    

    useEffect(() => {
        if (message?.success) {
        setStep(1);       
        reset();         
        setSelectQuestion('Select Question'); 
        setSelectDepartment('Select Department')
        setSelectDesignation('Select Designation')
        setSelectEmploymentType('Select Employment Type')
        }
        return () => {
            reset('password', 'password_confirmation'); 
        };
        
    }, [message?.success]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value } = e.target;

        if(/^[0-9]*$/.test(value) ){
            setData('employee_id', value);
        }
    }

     const handleDropdownSelect = (value: any, field: string) => {
        if(field === 'department'){
            setSelectDepartment(value)
        }else if (field === 'secret_question'){
            setSelectQuestion(value)        }
        else if(field === 'designation'){
            setSelectDesignation(value)
        }else if(field === 'employment_type'){
            setSelectEmploymentType(value)
        }
        setData(field, value); 
    };

    return (
        <RegisterLayout>
            <Head title="Register" />

        <div className="my-7 lg:my-6">
            <div className='text-white font-black tracking-normal text-4xl flex justify-center'>REGISTER</div>
            <form onSubmit={submit} className="space-y-1">
                {step === 1 && (
                    <> 
                        <div>
                            <InputLabel htmlFor="employee_id" value="Employee ID *" className='text-white'/>
                                <div className="bg-gray-300 rounded-xl">
                                    <TextInput
                                        id="employee_id"
                                        type="text"
                                        name="employee_id"
                                        value={data.employee_id}
                                        className=" block w-full bg-gray-300"
                                        isFocused={true}
                                        onChange={inputHandler}
                                        inputMode='numeric'
                                    />
                                </div>
                            <InputError message={errors.employee_id} className="mt-1" />
                        </div>

                        <div className="flex justify-between gap-5">
                            <div>
                                <InputLabel htmlFor="first_name" value="First Name *" className='text-white' />
                                <div className='bg-gray-300 rounded-xl'>
                                    <TextInput
                                    id="first_name"
                                    name="first_name"
                                    value={data.first_name}
                                    className=" block w-full bg-gray-300 text-black"
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    required
                                />
                                </div>
                                <InputError message={validateErrors.first_name || errors.first_name} className="mt-1" />
                            </div>
                            <div>
                                <InputLabel htmlFor="last_name" value="Last Name *" className='text-white'/>
                                    <div className="bg-gray-300 rounded-xl">
                                        <TextInput
                                        id="last_name"
                                        name="last_name"
                                        value={data.last_name}
                                        className=" block w-full bg-gray-300 text-black"
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        required
                                    />
                                </div>
                                <InputError message={validateErrors.last_name || errors.last_name} className="mt-1" />
                            </div>
                            
                        </div>
                            <div>
                                <InputLabel htmlFor="department" value="Department *"  className='text-white'/>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button type="button" className="bg-gray-300 w-full border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full">
                                            <p className='text-sm'>{selectDepartment}</p>
                                            <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                        </button>
                                    </Dropdown.Trigger> 
                                    <Dropdown.Content contentClasses="w-full max-h-[200px]  bg-gray-300 overflow-y-auto p-0 " align="left">
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
                                            className="w-full px-4 py-2 text-left bg-gray-300 hover:bg-[#145858] text-black hover:text-white"
                                        >
                                        {name}
                                    </button>
                                    ))}
                                </Dropdown.Content>
                            </Dropdown>
                            <InputError message={errors.department} className="mt-1" />

                            </div>
                            <div>
                                <InputLabel htmlFor="designation" value="Designation *"  className='text-white'/>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button type="button" className="bg-gray-300 w-full border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full">
                                            <p className='text-sm'>{selectDesignation}</p>
                                            <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                        </button>
                                    </Dropdown.Trigger> 
                                    <Dropdown.Content ableSearch={true} contentClasses=" bg-gray-300 p-0 w-full max-h-[200px] overflow-y-auto" align="left">
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
                                            className="w-full px-4 py-2 text-left bg-gray-300 text-black hover:bg-[#145858] hover:text-white"
                                        >
                                        {name}
                                    </button>
                                    ))}
                                </Dropdown.Content>
                            </Dropdown>
                            <InputError message={errors.designation} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="employment_type" value="Employment Type *" className='text-white' />
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button type="button" className="bg-gray-300 w-full border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center">
                                            <p className='text-sm'>{selectEmploymentType}</p>
                                            <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                        </button>
                                    </Dropdown.Trigger> 
                                    <Dropdown.Content ableSearch={true} contentClasses="bg-gray-300 p-0 w-full max-h-[200px] overflow-y-auto" align="left" >
                                        {employeeTypelist.map((option, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            id='role'
                                            name='role'
                                            onClick={() => {
                                            handleDropdownSelect(option.employment_type_list, 'employment_type');
                                            }}
                                            className="w-full px-4 py-2 text-left bg-gray-300 text-black hover:bg-[#145858] hover:text-white"
                                        >
                                            {option.employment_type_list}
                                        </button>
                                        ))}
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        <div className="pt-10">
                            <PrimaryButton className=" py-2 hover:bg-yellow-600" onClick={nextStep} >
                                Next
                            </PrimaryButton>
                        </div>
                    </>
                )}
                
                {step === 2 && (
                <>
                    <div>
                        <InputLabel htmlFor="password" value="Password *"  className='text-white'/>
                        <div className="bg-gray-300 rounded-xl">
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full bg-gray-300 text-black"
                                autoComplete="new-password "
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                        </div>
                        
                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation *" value="Confirm Password" className='text-white' />
                            <div className="bg-gray-300 rounded-xl">
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className=" block w-full bg-gray-300 text-black"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                            </div>
                        <InputError message={errors.password_confirmation} className="mt-1" />
                    </div>
                    <div>
                        <InputLabel htmlFor="secret_question" value="Secret Question *" className='text-white' />
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button" className="w-full bg-gray-300 border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full">
                                        <p className='text-sm'>{selectQuestion}</p>
                                        <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                    </button>
                                </Dropdown.Trigger> 
                                <Dropdown.Content contentClasses="w-full" align="left" >
                                    {options.map((option, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        id='secret_question'
                                        name='secret_question'
                                        onClick={() => {
                                        handleDropdownSelect(option, 'secret_question');
                                        }}
                                        className="w-full px-4 py-2 text-left bg-gray-300 text-black"
                                    >
                                        {option}
                                    </button>
                                    ))}
                                </Dropdown.Content>
                            </Dropdown>
                            
                        <InputError message={errors.secret_question} className="mt-1" />
                    </div>
                    <div>
                        <InputLabel htmlFor="secret_answer" value="Secret Answer *" className='text-white' />
                            <div className="bg-gray-300 rounded-xl">
                                <TextInput
                                    id="secret_answer"
                                    name="secret_answer"
                                    value={data.secret_answer}
                                    className="block w-full bg-gray-300 text-black"
                                    onChange={(e) => setData('secret_answer', e.target.value)}
                                />
                            </div>
                        <InputError message={errors.secret_answer} className="mt-1" />
                    </div>
                    <div className="flex items-center justify-end gap-5 pt-10">
                        <PrimaryButton className=" py-2 hover:bg-yellow-600" onClick={prevStep}>
                            Back
                        </PrimaryButton>
                        <PrimaryButton className=" py-2 hover:bg-yellow-600" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </>
                )}
            <div className="pt-5">
                <Link
                    href={route('login')}
                    className="underline text-sm text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Already registered?
                </Link>
            </div>
            </form>
        </div>
        </RegisterLayout>
    );
}
