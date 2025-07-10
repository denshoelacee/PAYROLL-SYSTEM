import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import { PageProps } from '@/types';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        first_name: user.first_name,
        email: user.last_name,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-white">Profile Information</h2>

                <p className="mt-1 text-sm text-white">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6  ">
                <div className="flex w-full justify-between gap-5">
                    <div className='w-full'>
                    <InputLabel htmlFor="name" value="First Name" className='text-white'/>

                    <TextInput
                        id="name"
                        className=" block w-full bg-transparent text-white"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                        required
                        isFocused
                        autoComplete="first_name"
                    />

                    <InputError className="mt-2" message={errors.first_name} />
                </div>

                <div className='w-full'>
                    <InputLabel htmlFor="email" value="Last Name" className='text-white' />

                    <TextInput
                        id="email"
                        type="email"
                        className=" block w-full bg-transparent text-white"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
