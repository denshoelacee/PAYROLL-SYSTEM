import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import UpdateSecretPassword from './Partials/UpdateSecretPassword';



export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    return (

            <>
            <Head title="Profile" />
            <Sidebar auth={auth}/>  
            <AdminLayout>
                <div className="mx-auto  sm:px-6 lg:px-15 w-full space-y-6">
                    <h2 className="font-semibold text-xl my-2 lg:px-15 mx-auto md:my-5 text-white">Profile</h2>
                    <div className="p-4 sm:p-8 bg-green-100 rounded-md bg-clip-padding bg-opacity-10 border border-button-border-color sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="w-full"
                        />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div className=" sm:p-8 gap-5  p-4  bg-green-100 rounded-md bg-clip-padding bg-opacity-10 border border-button-border-color sm:rounded-lg">
                        <UpdatePasswordForm className="w-full" />
                        </div>
                    <div className=" sm:p-8 gap-5 p-4  bg-green-100 rounded-md bg-clip-padding bg-opacity-10 border border-button-border-color sm:rounded-lg">
                        <UpdateSecretPassword className="w-full" />
                    </div>
                    </div>

                    <div className="p-4 sm:p-8 bg-green-100 rounded-md bg-clip-padding bg-opacity-10 border border-button-border-color sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </AdminLayout>
            </>
    );
}

