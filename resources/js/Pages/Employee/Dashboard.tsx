import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
export default function Dashboard({ auth}: PageProps) {
  return (
    <>
     <AuthenticatedLayout user={auth.user}>
        {auth.user.role === 'user' && (
            <div>User</div>
        )}
     </AuthenticatedLayout>
    </>
  )
}

