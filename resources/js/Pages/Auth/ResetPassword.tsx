import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/LoginLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ employee_id, }: { employee_id:number }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        employee_id : employee_id,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    useEffect(() =>{
        console.log(data);
    })
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('reset-password'));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="employee_id" value="Employee ID" className='text-white' />

                    <div className='bg-gray-300 rounded-xl'>
                        <TextInput
                        id="employee_id"
                        type="number"
                        name="employee_id"
                        value={data.employee_id}
                        className="mt-1 block w-full bg-gray-300"
                        autoComplete="username"
                        disabled
                    />
                    </div>

                    {/*<InputError message={errors.email} className="mt-2" />*/}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className='text-white' />
                    <div className='bg-gray-300 rounded-xl'>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full text-black bg-gray-300"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password"  className='text-white'/>
                    <div className='bg-gray-300 rounded-xl'>
                    <TextInput
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full bg-gray-300"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Reset Password
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
