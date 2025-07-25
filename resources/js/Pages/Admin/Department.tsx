import React from 'react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import Sidebar from '@/Components/Sidebar'
import AdminLayout from '@/Layouts/AdminLayout'
import CardWrapper from '@/Components/CardWrapper'
import AddDepartment from './partial/AddDepartment'
import PrimaryButton from '@/Components/PrimaryButton'
import AddDesignation from './partial/AddDesignation'
import AddEmployment from './partial/AddEmployment'
import JobTitlesModal from "@/Components/JobTitlesModal";
import { useState } from "react";

function Department(auth :PageProps) {
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState<'Department' | 'Designation' | 'Employment Type'>("Department");

        const handleAddClick = (type: 'Department' | 'Designation' | 'Employment Type') => {
            setActionType(type);
            setShowModal(true);
        };

        const handleSubmit = (data: { actionType: string; value: string }) => {
            console.log("Submitted data:", data);
            // You can send it to backend or update state here
            setShowModal(false);
        };

        console.log(showModal)
    return (
    <>
        <AuthenticatedLayout user={auth.auth.user}>
            <Head title="Department" />
            <Sidebar auth={auth.auth} />
            <AdminLayout title="Department Management">
                <div className="w-full flex justify-between flex-wrap gap-4 p-4">
                    <div className="bg-[#16423C] border-[1px] border-button-border-color rounded-lg w-full sm:w-[48%] lg:w-[32%] my-4 ">
                        <h2 className="text-lg font-semibold my-3 mx-5 text-white">Department</h2>
                        <AddDepartment/>
                        <div className='h-12 border px-5 place-content-center'>
                            <PrimaryButton onClick={() => handleAddClick("Department")} className='py-1.5'>Add New Department</PrimaryButton>
                        </div>
                    </div> 

                   <div className="bg-[#16423C] border-[1px] border-button-border-color rounded-lg w-full sm:w-[48%] lg:w-[32%] my-4 ">
                        <h2 className="text-lg font-semibold my-3 mx-5 text-white">Designation</h2>
                        <AddDesignation/>
                        <div className='h-12 border px-5 place-content-center'>
                            <PrimaryButton onClick={() => handleAddClick("Designation")} className='py-1.5'>Add New Designation</PrimaryButton>
                        </div>
                    </div> 

                    <div className="bg-[#16423C] border-[1px] border-button-border-color rounded-lg w-full sm:w-[48%] lg:w-[32%] my-4 ">
                        <h2 className="text-lg font-semibold my-3 mx-5 text-white">Employment Type</h2>
                        <AddEmployment/>
                        <div className='h-12 border px-5 place-content-center'>
                            <PrimaryButton onClick={() => handleAddClick("Employment Type")} className='py-1.5'>Add New Employment Type</PrimaryButton>
                        </div>
                    </div> 
                </div>
                <JobTitlesModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onClick={handleSubmit}
                    actionType={actionType}
                />
            </AdminLayout>
        </AuthenticatedLayout>
    </>
  )
}

export default Department