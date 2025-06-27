import { useState,useEffect, FormEventHandler } from 'react';
import {CtuLogo} from '@/Components/CtuLogo';
import LoginLayout from '@/Layouts/LoginLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {ErrorMessage, InfoMessage,SuccessMessage} from '@/Components/Alert';
import { Head, Link, useForm, usePage } from '@inertiajs/react';





export default function Login({ status, canResetPassword, }: { status?: string, canResetPassword: boolean, }) {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        employee_id: '',
        password: '',
        remember: false,
    });

    const { message }: any = usePage().props;

    const [failedAttempts, setFailedAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [lockTimer, setLockTimer] = useState(30);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isLocked && lockTimer > 0) {
            timer = setTimeout(() => {
                setLockTimer((prev) => prev - 1);
            }, 1000);
        } else if (isLocked && lockTimer === 0) {
            setIsLocked(false);
            setFailedAttempts(0);
            setLockTimer(30); 
        }

        return () => clearTimeout(timer);
    }, [isLocked, lockTimer]);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isLocked) return;

        post(route('login'), {
            onError: () => {
                setFailedAttempts((prev) => {
                    const updated = prev + 1;
                    if (updated >= 5) {
                        setIsLocked(true);
                    }
                    return updated;
                });
            },
        });
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (/^[0-9]*$/.test(value)) {
            setData('employee_id', value);
        }
    };
    return (
        <LoginLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className='flex justify-center  pt-12 sm:py-8 md:py-10 lg:pt-14 gap-5'> 
                <div className="flex sm:hidden md:flex lg:hidden">
                    <Link href="/">
                        <CtuLogo className='w-[50px] h-[50px]'/>
                    </Link>
                </div>
                <div className='text-white font-black tracking-widest text-5xl'>LOGIN</div>
            </div>
            <form onSubmit={submit}>
                <div className=" mt-1 sm:mt-2 lg:mt-2 ">
                    
                    {message.information && (
                        <InfoMessage className='my-2' info={message.information}/>

                    )}
                    {message.error && (
                        <ErrorMessage className="my-2" error={message.error}/>
                    )}
                                        
                    <InputLabel className="text-white" htmlFor="employeeID" value="Employee ID" />
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
                
                <div className="mt-1 lg:mt-2">
                    <InputLabel className="text-white" htmlFor="password" value="Password" />
                    <div className="bg-gray-300 rounded-xl">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className=" block w-full bg-gray-300"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                {/*<div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>*/}

                <div className="space-y-4 mb-10 sm:mb-5 md:mb-7 lg:mb-8">
                    <div className="flex items-center justify-end mt-5">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className=" text-sm text-white rounded-md focus:outline-none"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>
                    <PrimaryButton disabled={processing || isLocked}>
                    {processing
                        ? 'Signing in...'
                        : isLocked
                            ? `Try again in ${lockTimer}s`
                            : <p className="text-[15px] py-1 font-black tracking-widest">SIGN IN</p>
                    }
                    </PrimaryButton>

                </div>
                <div className="flex justify-center text-white gap-1">
                    <span>Don't have an account? </span>
                    <Link href={route('register')}
                        className='text-white text-md'>
                    <span className='underline'>Register</span>
                </Link> 
                </div>

            </form>
        </LoginLayout>
    );
}
