import { useEffect, FormEventHandler } from 'react';
import {CtuLogo} from '@/Components/CtuLogo';
import LoginLayout from '@/Layouts/LoginLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        employee_id: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

   

    return (
        <LoginLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className='flex justify-center items-center py-12 sm:py-8 md:py-10 lg:py-16 gap-5'> 
                <div className="flex sm:hidden md:flex lg:hidden">
                    <Link href="/">
                        <CtuLogo className='w-[50px] h-[50px]'/>
                    </Link>
                </div>
                <div className='text-white font-black tracking-widest text-5xl'>LOGIN</div>
            </div>
            <form onSubmit={submit}>
                <div className=" mt-1 sm:mt-2 md:mt-3 lg:mt-4 ">
                    <InputLabel className="text-white" htmlFor="employeeID" value="Employee ID" />
                    <div className="bg-white rounded-xl">
                        <TextInput
<<<<<<< HEAD
                            id="employee_id"
                            type="number"
                            name="employee_id"
                            value={data.employee_id}
                            className="bg-white  block w-full"
                            isFocused={true}
                            onChange={(e) => setData('employee_id', e.target.value)}
=======
                            id="text"
                            type="text"
                            name="text"
                            value={data.email}
                            className="bg-white  block w-full"
                            isFocused={true}
                            onChange={inputHandler}
                            pattern='^\d+$'
>>>>>>> 2fee2648032065294f191e220a637bd41ad04fd2
                        />
                    </div>

                    <InputError message={errors.employee_id} className="mt-2" />
                </div>
                
                <div className="mt-1 sm:mt-2 md:mt-3 lg:mt-4">
                    <InputLabel className="text-white" htmlFor="password" value="Password" />
                    <div className="bg-white rounded-xl">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className=" block w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
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

                <div className="space-y-5 mb-10 sm:mb-5 md:mb-7 lg:mb-8">
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
                    <PrimaryButton  disabled={processing}>
                            <p className="text-lg font-black tracking-widest">SIGN IN</p>
                    </PrimaryButton>
                </div>

            </form>
        </LoginLayout>
    );
}
