import React, { useState } from 'react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import Sidebar from '@/Components/Sidebar'
import AdminLayout from '@/Layouts/AdminLayout'
import Search from '@/Components/Search'
import Dropdown from '@/Components/Dropdown'
import SecondaryButton from '@/Components/SecondaryButton'
import { RiArrowDropDownLine } from 'react-icons/ri'
import ReportsPartial from './partial/Reports'
export default function Reports(auth :PageProps) {

    const [searchQuery, setSearchQuery] = useState('')
  return (
    <>
        <AuthenticatedLayout user={auth.auth.user}>
            <Head title="Reports" />
            <Sidebar auth={auth.auth} />
            <AdminLayout title="Reports">
                    <Dropdown>
                        <Dropdown.Trigger>
                        <SecondaryButton className="flex w-full justify-between items-center md:w-[200px]">
                            <p className="text-sm">Select Year</p>
                            <RiArrowDropDownLine className="text-2xl transition-transform duration-500 ease-in-out" />
                        </SecondaryButton>
                        </Dropdown.Trigger>
                        <Dropdown.Content contentClasses="w-[200px]" align="left">
                            <option value="">haha</option>
                        </Dropdown.Content>
                    </Dropdown>
                   <div className='py-5'>
                        <div className="bg-[#16423C] border-[1px] border-button-border-color rounded-lg w-full">
                            <h2 className="text-lg font-semibold my-3 mx-5 text-white">List of Reports</h2>
                            <ReportsPartial />
                        </div>
                    </div> 
            </AdminLayout>
        </AuthenticatedLayout>
    </>
  )
}

