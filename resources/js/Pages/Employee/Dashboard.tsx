import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import Sidebar from '@/Components/Sidebar'

export default function Dashboard({ auth}: PageProps) {
  return (
    <>
     <AuthenticatedLayout user={auth.user}>
        <Sidebar auth={auth}/> 
     </AuthenticatedLayout>
    </>
  )
}

