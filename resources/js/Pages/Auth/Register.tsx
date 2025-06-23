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
import {ErrorMessage, SuccessMessage} from '@/Components/Alert';




export default function Register() {

    const [step, setStep] = useState(1);
    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);
    const [selectedDropdown, setSelectedDropdown] = useState('Select Question');
    const options = ['What is ROBLOX', 'ADIK BA SI RAYJAY UG GROW A GARDEN?'];

    const {message}:any = usePage().props;

    
    const { data, setData, post, processing, errors, reset } = useForm({
        employee_id: '',
        last_name: '',
        first_name: '',
        designation: '',
        department: '',
        employment_type:'',
        basic_pay: '',
        password: '',
        password_confirmation: '',
        secret_question: '',
        secret_answer: '',
    });

    useEffect(() => {
        if (message?.success) {
        setStep(1);       
        reset();         
        setSelectedDropdown('Select Question'); 
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
            setData('basic_pay', value);
        }
    }
    return (
        <RegisterLayout>
            <Head title="Register" />

        <div className="my-7 lg:my-6">
            <div className='text-white font-black tracking-normal text-4xl flex justify-center'>REGISTER</div>
            <form onSubmit={submit} className="space-y-1">
                {step === 1 && (
                    <> 
                        {message.success && (
                            <SuccessMessage className="my-2 "success={message.success}/>
                        )}
                        {message.error && (
                            <ErrorMessage className="my-2" error={message.error}/>
                        )}
                        <div>
                            <InputLabel htmlFor="employee_id" value="Employee ID" className='text-white'/>
                                <div className="bg-gray-300 rounded-xl">
                                    <TextInput
                                    id="employee_id"
                                    name="employee_id"
                                    value={data.employee_id}
                                    className=" block w-full bg-gray-300 text-black"
                                    onChange={(e) => setData('employee_id', e.target.value)}
                                    required
                                />
                                </div>
                            <InputError message={errors.employee_id} className="mt-1" />
                        </div>

                        <div className="flex justify-between gap-5">
                            <div>
                                <InputLabel htmlFor="first_name" value="First Name" className='text-white' />
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
                                <InputError message={errors.first_name} className="mt-1" />
                            </div>
                            <div>
                                <InputLabel htmlFor="last_name" value="Last Name" className='text-white'/>
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
                                <InputError message={errors.last_name} className="mt-1" />
                            </div>
                            
                        </div>

                            <div>
                                <InputLabel htmlFor="designation" value="Designation"  className='text-white'/>
                                <div className="bg-gray-300 rounded-xl">
                                    <TextInput
                                        id="designation"
                                        name="designation"
                                        value={data.designation}
                                        className=" block w-full bg-gray-300 text-black"
                                        onChange={(e) => setData('designation', e.target.value)}
                                        required
                                    />
                                </div>
                            <InputError message={errors.designation} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="department" value="Department"  className='text-white'/>
                                <div className="bg-gray-300 rounded-xl">
                                    <TextInput
                                    id="department"
                                    name="department"
                                    value={data.department}
                                    className=" block w-full bg-gray-300 text-black"
                                    onChange={(e) => setData('department', e.target.value)}
                                    required
                                />
                                </div>
                            <InputError message={errors.department} className="mt-1" />
                        </div>
                        <div>
                                <InputLabel htmlFor="employment_type" value="Employment Type" className='text-white'/>
                                    <div className="bg-gray-300 rounded-xl">
                                        <TextInput
                                        id="employment_type"
                                        name="employment_type"
                                        value={data.employment_type}
                                        className=" block w-full bg-gray-300 text-black"
                                        onChange={(e) => setData('employment_type', e.target.value)}
                                        required
                                    />
                                </div>
                                <InputError message={errors.last_name} className="mt-1" />
                            </div>
                        <div className="pt-10">
                            <PrimaryButton className=" py-2" onClick={nextStep}>
                                Next
                            </PrimaryButton>
                        </div>
                    </>
                )}
                

                {/*<div>
                    <InputLabel htmlFor="basic_pay" value="Basic Pay"  className='text-white' />
                    <div className="bg-gray-300 rounded-xl">
                        <TextInput
                            id="basic_pay"
                            name="basic_pay"
                            type="text"
                            step="1.0"
                            value={data.basic_pay}
                            className="block w-full bg-gray-300 text-black" 
                            onChange={inputHandler}
                            inputMode='numeric'
                        />
                    </div>
                    <InputError message={errors.basic_pay} className="mt-1" />
                </div>*/}
                {step === 2 && (
                <>
                    <div>
                        <InputLabel htmlFor="password" value="Password"  className='text-white'/>
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
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" className='text-white' />
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
                        <InputLabel htmlFor="secret_question" value="Secret Question" className='text-white' />
                            {/*<Dropdown>
                                <Dropdown.Trigger>
                                    <SecondaryButton className="flex justify-between items-center md:w-full">
                                        <p className='text-sm'>{selectedDropdown}</p>
                                        <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                    </SecondaryButton>
                                </Dropdown.Trigger> 
                                <Dropdown.Content contentClasses="w-full" align="left" >
                                    {options.map((option, index) => (
                                    <button
                                        key={index}
                                        id='secret_question'
                                        name='secret_question'
                                        onClick={() => {
                                        setSelectedDropdown(option);
                                        setData('secret_question', option); // <-- this line syncs the data
                                        }}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                    >
                                        {option}
                                    </button>
                                    ))}
                                </Dropdown.Content>
                            </Dropdown>*/}
                            <div className="bg-gray-300 rounded-xl">
                                <TextInput
                                    id="secret_question"
                                    type="text"
                                    name="secret_question"
                                    value={data.secret_question}
                                    className=" block w-full bg-gray-300 text-black"
                                    onChange={(e) => setData('secret_question', e.target.value)}
                                    required
                                />
                            </div>
                        <InputError message={errors.secret_question} className="mt-1" />
                    </div>
                    <div>
                        <InputLabel htmlFor="secret_answer" value="Secret Answer" className='text-white' />
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
                        <PrimaryButton className=" py-2" onClick={prevStep}>
                            Back
                        </PrimaryButton>
                        <PrimaryButton className=" py-2" disabled={processing}>
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
