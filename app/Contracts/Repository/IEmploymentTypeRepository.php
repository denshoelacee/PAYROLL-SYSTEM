<?php

namespace App\Contracts\Repository;
use App\Models\EmploymentType;

interface IEmploymentTypeRepository
{
     public function employmentTypeModel(int $id): ?EmploymentType;
     public function getEmpTypeList();
     public function addEmpType(array $data): EmploymentType;
     public function updateEmpType(int $id, array $data): ?EmploymentType;
     public function deleteEmpType(int $id): bool;

}