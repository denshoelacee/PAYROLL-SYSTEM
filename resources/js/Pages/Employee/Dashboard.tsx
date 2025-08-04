import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import Sidebar from '@/Components/Sidebar'
import EmployeeLayout from '@/Layouts/EmployeeLayout'
import AdminLayout from '@/Layouts/AdminLayout'

export default function Dashboard({ auth}: PageProps) {
  return (
    <>
    
       <Sidebar auth={auth}/> 
      <AdminLayout>

     </AdminLayout>
     
    </>
  )
}

