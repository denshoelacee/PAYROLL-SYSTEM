import { useEffect, FormEventHandler } from 'react';
import RegisterLayout from '@/Layouts/RegisterLayout';
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

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value } = e.target;

        if(/^[0-9]*$/.test(value) ){
            setData('basic_pay', value);
        }
    }
    return (
        <RegisterLayout>
            <Head title="Register" />

        <div className="my-7 lg:my-16">
            <div className='text-white font-black tracking-normal text-4xl flex justify-center'>REGISTER</div>
            <form onSubmit={submit} className="space-y-1">
                <div>
                    <InputLabel htmlFor="employee_id" value="Employee ID" className='text-white'/>
                        <div className="bg-gray-300 rounded-xl">
                            <TextInput
                            id="employee_id"
                            name="employee_id"
                            value={data.employee_id}
                            className="mt-1 block w-full bg-gray-300 text-black"
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
                            className="mt-1 block w-full bg-gray-300 text-black"
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
                                className="mt-1 block w-full bg-gray-300 text-black"
                                onChange={(e) => setData('last_name', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.last_name} className="mt-1" />
                    </div>
                </div>

                <div className="flex justify-between gap-5">
                    <div>
                    <InputLabel htmlFor="designation" value="Designation"  className='text-white'/>
                    <div className="bg-gray-300 rounded-xl">
                        <TextInput
                            id="designation"
                            name="designation"
                            value={data.designation}
                            className="mt-1 block w-full bg-gray-300 text-black"
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
                            className="mt-1 block w-full bg-gray-300 text-black"
                            onChange={(e) => setData('department', e.target.value)}
                            required
                        />
                        </div>
                    <InputError message={errors.department} className="mt-1" />
                </div>
                </div>

                <div>
                    <InputLabel htmlFor="basic_pay" value="Basic Pay"  className='text-white' />
                    <div className="bg-gray-300 rounded-xl">
                        <TextInput
                            id="basic_pay"
                            name="basic_pay"
                            type="text"
                            step="1.0"
                            value={data.basic_pay}
                            className="mt-1 block w-full bg-gray-300 text-black" 
                            onChange={inputHandler}
                            inputMode='numeric'
                        />
                    </div>
                    <InputError message={errors.basic_pay} className="mt-1" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password"  className='text-white'/>
                    <div className="bg-gray-300 rounded-xl">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full bg-gray-300 text-black"
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
                                className="mt-1 block w-full bg-gray-300 text-black"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                        </div>
                    <InputError message={errors.password_confirmation} className="mt-1" />
                </div>

                <div>
                    <InputLabel htmlFor="secret_password" value="Secret Password" className='text-white' />
                        <div className="bg-gray-300 rounded-xl">
                            <TextInput
                                id="secret_password"
                                name="secret_password"
                                value={data.secret_password}
                                className="mt-1 block w-full bg-gray-300 text-black"
                                onChange={(e) => setData('secret_password', e.target.value)}
                            />
                        </div>
                    <InputError message={errors.secret_password} className="mt-1" />
                </div>

                <div className="flex items-center justify-end pt-10">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-white  rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4 py-2" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </div>
        </RegisterLayout>
    );
}
