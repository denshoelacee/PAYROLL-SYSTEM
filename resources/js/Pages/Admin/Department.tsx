import { EmploymentTypes, JobTitles, PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import AdminLayout from "@/Layouts/AdminLayout";
import AddDepartment from "./partial/AddDepartment";
import AddDesignation from "./partial/AddDesignation";
import AddEmployment from "./partial/AddEmployment";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInputGroup from "@/Components/TextInputGroup";
import InputWrapper from "@/Components/InputWrapper";


type Contributions = {
  rlip:number
  philhealth:number
}
type Props = PageProps<{
  empTypeList: EmploymentTypes[];
  jobTitleList: JobTitles[];
  contributionType: Contributions
}>;

function Department({ auth, empTypeList, jobTitleList,contributionType}: Props) {
  console.log(contributionType)
  const {data,setData,post} = useForm<any>({
      rlip: contributionType?.rlip ??0,
      philhealth: contributionType?.philhealth ?? 0
  })
const handleNumberChange = (key: 'rlip' | 'philhealth', value: string) => {
  const numericValue = value.replace(/[^0-9.]/g, ''); // allows only numbers and decimal
  setData(key, numericValue);
};

  const handleSubmit = () => {
    post(route('admin.contribution.add')),{
      
    }
  }
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
              <InputWrapper className="p-4">
                  <p className="text-white">Fixed Payroll Settings Input</p>
                  <TextInputGroup
                  label="RLIP"
                  id="rlip"
                  value={data.rlip}
                  onChange={(e) => handleNumberChange('rlip', e.target.value)}

                  />
                  <TextInputGroup
                  label="Philhealth"
                  id="philhealth"
                  value={data.philhealth}
                  onChange={(e) => handleNumberChange('philhealth', e.target.value)}
                  />
                  <PrimaryButton onClick={handleSubmit}>
                    Save
                  </PrimaryButton>
              </InputWrapper>
            </div>
        </AdminLayout>
    </>
  );
}

export default Department;
