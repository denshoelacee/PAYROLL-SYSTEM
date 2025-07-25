import React from 'react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import Sidebar from '@/Components/Sidebar'
import AdminLayout from '@/Layouts/AdminLayout'
import ReportsPartial from './partial/Reports'

export default function Reports(auth :PageProps) {

  return (
    <>
        <AuthenticatedLayout user={auth.auth.user}>
            <Head title="Reports" />
            <Sidebar auth={auth.auth} />
            <AdminLayout title="Reports">
                   <ReportsPartial/>
            </AdminLayout>
        </AuthenticatedLayout>
    </>
  )
}

