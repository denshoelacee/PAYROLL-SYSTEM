import { FormEventHandler, useState } from "react";
import { EmploymentTypes, JobTitles, PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import AdminLayout from "@/Layouts/AdminLayout";
import CardWrapper from "@/Components/CardWrapper";
import AddDepartment from "./partial/AddDepartment";
import AddDesignation from "./partial/AddDesignation";
import AddEmployment from "./partial/AddEmployment";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal"; // Ensure Modal is correctly imported
import TextInputGroup from "@/Components/TextInputGroup"; // Ensure this is your input component

type Props = PageProps<{
  empTypeList: EmploymentTypes[];
  jobTitleList: JobTitles[];
}>;

function Department({ auth, empTypeList, jobTitleList }: Props) {

  return (
    <>
        <Sidebar auth={auth} />
        <AdminLayout title="Department Management">
          <div className="w-full flex justify-between flex-wrap gap-4 p-4">
            {/* Department Section */}
            <div className="bg-[#16423C] border border-button-border-color rounded-lg w-full sm:w-[48%] lg:w-[32%] my-4">
              <h2 className="text-lg font-semibold my-3 mx-5 text-white">Department</h2>
              <AddDepartment jobTitleList={jobTitleList} />
            </div>

            {/* Designation Section */}
            <div className="bg-[#16423C] border border-button-border-color rounded-lg w-full sm:w-[48%] lg:w-[32%] my-4">
              <h2 className="text-lg font-semibold my-3 mx-5 text-white">Designation</h2>
              <AddDesignation jobTitleList={jobTitleList} />
            </div>

            {/* Employment Type Section */}
            <div className="bg-[#16423C] border border-button-border-color rounded-lg w-full sm:w-[48%] lg:w-[32%] my-4">
              <h2 className="text-lg font-semibold my-3 mx-5 text-white">Employment Type</h2>
              <AddEmployment empTypeList={empTypeList} />
            </div>
          </div>
        </AdminLayout>

    </>
  );
}

export default Department;
