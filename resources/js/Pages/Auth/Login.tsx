import { useEffect, FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import LoginLayout from '@/Layouts/LoginLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
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

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value } = e.target;

        if(/^[0-9]*$/.test(value) ){
            setData('email', value);
        }
    }

    return (
        <LoginLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className='flex justify-center items-center py-16'> 
                <p className='text-white font-black tracking-widest text-5xl'>LOGIN</p>
            </div>
            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel className="text-white" htmlFor="employeeID" value="Employee ID" />

                    <TextInput
                        id="text-number"
                        type="text-number"
                        name="text-number"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={inputHandler}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                
                <div className="mt-4">
                    <InputLabel className="text-white" htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

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

                <div className="space-y-5">
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
