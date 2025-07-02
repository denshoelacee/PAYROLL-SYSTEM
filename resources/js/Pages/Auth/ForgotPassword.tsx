import GuestLayout from '@/Layouts/LoginLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage,router, Link} from '@inertiajs/react';
import { FormEventHandler,useState,useEffect} from 'react';
import InputLabel from '@/Components/InputLabel';
import Dropdown from '@/Components/Dropdown';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { SuccessMessage,ErrorMessage } from '@/Components/Alert';





export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<any>({
        employee_id: '',
        secret_question:'',
        secret_answer:''
    });

    const {message}:any = usePage().props;
    const [selectQuestion, setSelectQuestion] = useState('Select Question');
    
    const options = ['What is ROBLOX', 'ADIK BA SI RAYJAY UG GROW A GARDEN?'];

     const handleDropdownSelect = (value: any, field: string) => {

        setSelectQuestion(value)        
        setData(field, value); 
    };

    const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('reset.password'), data); 
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value } = e.target;

        if(/^[0-9]*$/.test(value) ){
            setData('employee_id', value);
        }
    }
    

    useEffect(() => {
        if(message.success){
            router.visit(`/reset-password/${data.employee_id}`)}
    },[message])

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
                    {message.success && (
                        <SuccessMessage success={message.success}/>

                    )}
                    {message.error && (
                        <ErrorMessage error={message.error}/>
                    )}
            <div className="mb-4 mt-10 text-sm text-white ">
                Forgot your password? No problem. Just enter your Employee ID and input your Secret Question and Secret Password to Reset your password
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <InputLabel className="text-white" htmlFor="employee_id" value="Employee ID" />
            <form onSubmit={submit}>
                <div className="bg-gray-300 rounded-xl">
                    <TextInput
                    id="employee_id"
                    type="text"
                    name="employee_id"
                    value={data.employee_id}
                    className=" block w-full bg-transparent text-black"
                    isFocused={true}
                    onChange={inputHandler}
                    inputMode='numeric'
                />

                </div>
                <InputError message={errors.employee_id} className="mt-2" />
                <div>
                    <InputLabel htmlFor="secret_question" value="Secret Question" className='text-white' />
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

                <div className="flex items-center justify-end mt-12 gap-5">
                    <Link href={route('login')} className='w-full text-white text-md'>
                        <PrimaryButton className='py-2'>Back</PrimaryButton>
                    </Link> 
                    <PrimaryButton className="py-2 px-1" disabled={processing}>
                        NEXT
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
