<?php

namespace App\Repository;

use App\Contracts\Repository\IHrMetaDataRepository;
use Illuminate\Validation\ValidationException;
use App\Models\JobTitle;
use App\Models\ContributionType;
use App\Models\EmploymentType;

class HrMetaDataRepository implements IHrMetaDataRepository
{
 
    public function getJobTitle()
    {
        return JobTitle::SELECT('id','department','designation')->get();
    }

    public function addJobTitleDepartment(array $data)
    {
        $exists = JobTitle::where('department', $data['department'])->exists();

          if ($exists) {
                throw ValidationException::withMessages([
                      'title' => ['The job title already exists.']]);
          }else{
                return JobTitle::create($data);
          }
    }

    public function addJobTitleDesignation(array $data)
    {
        $exists = JobTitle::where('designation', $data['designation'])->exists();

          if ($exists) {
                throw ValidationException::withMessages([
                      'title' => ['The job title already exists.']]);
          }else{
                return JobTitle::create($data);
          }
    }

    public function updateJobTitle($id,array $data)
    {
        return JobTitle::where('id', $id)->update($data);
    }

    public function deleteJobTitleDepartment($id)
    {
        $find = JobTitle::findOrFail($id);
        
        if($find->designation !== null){

            $find ->department = null;
            $find->save(); 
        }else{

             $find->delete();
         }
    }

    public function deleteJobTitleDesignation($id)
    {
        $find = JobTitle::findOrFail($id);
        
        if($find->department !== null){
           
            $find->designation = null;
            $find->save();
        }else{
            $find->delete();
        }
    }
    //CRUD EMPLOYEE TYPE
    public function getEmpTypeList()
    {
        return EmploymentType::SELECT('id','employment_type_list')->get();
    }
    public function addEmpType(array $data)
    {
        return EmploymentType::create($data);
    }

    public function updateEmpType(int $id, array $data)
    {
        $employmentType = EmploymentType::find($id);
        if ($employmentType) {
            $employmentType->update($data);
        }
        return $employmentType;
    }

    public function deleteEmpType(int $id): bool
    {
        return EmploymentType::destroy($id) > 0;
    }

    //Contribution Type
    public function create(array $data)
    {
        return ContributionType::Create($data);
    }

}   