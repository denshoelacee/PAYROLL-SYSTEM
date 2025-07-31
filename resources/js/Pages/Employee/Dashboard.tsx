import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import Sidebar from '@/Components/Sidebar'
import EmployeeLayout from '@/Layouts/EmployeeLayout'

export default function Dashboard({ auth}: PageProps) {
  return (
    <>
     
        <Sidebar auth={auth}/> 
      <EmployeeLayout>

     </EmployeeLayout>
    </>
  )
}

