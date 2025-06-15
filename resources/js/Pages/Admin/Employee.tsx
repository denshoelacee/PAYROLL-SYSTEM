import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Sidebar from '@/Components/Sidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import Search from '@/Components/Search';
import PrimaryButton  from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { useState } from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import { IoMdAdd } from "react-icons/io";
import Dropdown from '@/Components/Dropdown';
import { RiArrowDropDownLine } from "react-icons/ri";
import Card from '@/Components/Card';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
export default function Employee({ auth}: PageProps) {

    const [isOpen, setisOpen] = useState(false);


    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Employee" />
            <div className="">
                <div className="">
                    <Sidebar/>
                </div>
                <AdminLayout
                    title="Employee">
                        <div className="flex justify-end gap-2">
                            <Search/>
                            <Dropdown>
                                    <Dropdown.Trigger>
                                        <SecondaryButton className="flex w-32 justify-center">
                                            <p className='text-sm'>Department</p>
                                            <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                        </SecondaryButton>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content contentClasses="w-32" align="right" >
                                        <option value="Regular">COT</option>
                                        <option value="Regular">Part-Time</option>
                                    </Dropdown.Content>
                            </Dropdown>
                            <Dropdown>
                                    <Dropdown.Trigger>
                                        <SecondaryButton className="flex w-32 justify-center">
                                            <p className='text-sm'>All Role</p>
                                            <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                        </SecondaryButton>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content contentClasses="w-32" align="right" >
                                        <option value="Regular">Regular</option>
                                        <option value="Regular">Part-Time</option>
                                    </Dropdown.Content>
                            </Dropdown>
                            <SecondaryButton onClick={() => setisOpen(true)}>
                                <div className="flex items-center gap-2">
                                    <IoMdAdd className='text-custom-word-color font-black text-1xl'/>
                                    <span className="text-sm">New Employee</span>
                                </div>
                            </SecondaryButton>
                        </div>
                        <Modal show={isOpen} onClose={() => setisOpen(false)} maxWidth="lg">
                            <div className="p-6">
                            <h2 className="text-lg font-bold mb-4 text-white">Add New Employee</h2>
                                <div className="space-y-2">
                                    <Card className="flex justify-between p-3 gap-4">
                                        <div>
                                            <InputLabel className=' py-1 text-white'>Employee Name</InputLabel>
                                            <TextInput className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1" />
                                        </div>
                                        <div>
                                            <InputLabel className='py-1 text-white'>Basic Pay</InputLabel>
                                            <TextInput className="text-white bg-transparent border-1 border-gray-200 focus:outline-offset-1" />
                                        </div>
                                    </Card>
                                    <Card className="">
                                        <p className="text-sm text-gray-600 mb-6">
                                            This is your modal content. You can place forms, messages, or anything here.
                                        </p>
                                    </Card>
                                    <Card className="">
                                        <p className="text-sm text-gray-600 mb-6">
                                            This is your modal content. You can place forms, messages, or anything here.
                                        </p>
                                    </Card>
                                </div>
                            <PrimaryButton className='text-md' onClick={() => setisOpen(false)}>
                                Save
                            </PrimaryButton>
                                
                            </div>
                        </Modal>
                </AdminLayout>
            </div>
        </AuthenticatedLayout>
    );
}
