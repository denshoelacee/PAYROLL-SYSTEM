<?php

namespace App\Repository;

use App\Contracts\Repository\IEmploymentTypeRepository;
use App\Models\EmploymentType;

class EmploymentTypeRepository implements IEmploymentTypeRepository
{
    
   
    public function employmentTypeModel(int $id): ?EmploymentType
    {
        return EmploymentType::find($id);
    }


    public function getEmpTypeList()
    {
        return EmploymentType::all();
    }
    public function addEmpType(array $data): EmploymentType
    {
        return EmploymentType::create($data);
    }

    public function updateEmpType(int $id, array $data): ?EmploymentType
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
}