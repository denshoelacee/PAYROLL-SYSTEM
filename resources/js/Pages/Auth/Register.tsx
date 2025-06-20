import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/LoginLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        employee_id: '',
        last_name: '',
        first_name: '',
        designation: '',
        department: '',
        basic_pay: '',
        password: '',
        password_confirmation: '',
        secret_password: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="employee_id" value="Employee ID" />
                    <TextInput
                        id="employee_id"
                        name="employee_id"
                        value={data.employee_id}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('employee_id', e.target.value)}
                        required
                    />
                    <InputError message={errors.employee_id} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="last_name" value="Last Name" />
                    <TextInput
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('last_name', e.target.value)}
                        required
                    />
                    <InputError message={errors.last_name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="first_name" value="First Name" />
                    <TextInput
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('first_name', e.target.value)}
                        required
                    />
                    <InputError message={errors.first_name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="designation" value="Designation" />
                    <TextInput
                        id="designation"
                        name="designation"
                        value={data.designation}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('designation', e.target.value)}
                        required
                    />
                    <InputError message={errors.designation} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="department" value="Department" />
                    <TextInput
                        id="department"
                        name="department"
                        value={data.department}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('department', e.target.value)}
                        required
                    />
                    <InputError message={errors.department} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="basic_pay" value="Basic Pay" />
                    <TextInput
                        id="basic_pay"
                        name="basic_pay"
                        type="number"
                        step="1.0"
                        value={data.basic_pay}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('basic_pay', e.target.value)}
                    />
                    <InputError message={errors.basic_pay} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="secrete_password" value="Secret Password" />
                    <TextInput
                        id="secrete_password"
                        name="secrete_password"
                        value={data.secret_password}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('secret_password', e.target.value)}
                    />
                    <InputError message={errors.secret_password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-6">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
