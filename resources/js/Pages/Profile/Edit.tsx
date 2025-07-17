import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import NavLink from '@/Components/NavLink';
import { BiLeftArrow } from 'react-icons/bi';
import { FaLessThan } from 'react-icons/fa6';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';



export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
           >
            <Head title="Profile" />
            <Sidebar auth={auth}/>  
            <AdminLayout>
                <h2 className="font-semibold text-xl my-2 md:mx-20 md:my-5 text-white">Profile</h2>
                <div className="mx-auto  sm:px-6 lg:px-20 space-y-6">
                    <div className="p-4 sm:p-8 bg-green-100 rounded-md bg-clip-padding bg-opacity-10 border border-button-border-color sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="w-full"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-green-100 rounded-md bg-clip-padding bg-opacity-10 border border-button-border-color sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-green-100 rounded-md bg-clip-padding bg-opacity-10 border border-button-border-color sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </AdminLayout>
        </AuthenticatedLayout>
    );
}
