<?php

namespace App\Services;

use App\Contracts\Repository\IEmploymentTypeRepository;
use App\Contracts\Services\IEmploymentTypeService;

class EmploymentTypeService implements IEmploymentTypeService
{
    public function __construct(protected IEmploymentTypeRepository $employmentTypeRepository ){}

    public function list()
    {
        return $this->employmentTypeRepository->getEmpTypeList();
    }
    public function create(array $data)
    {
         return $this->employmentTypeRepository->addEmpType($data);
    }

    public function update(int $id, array $data)
    {
        return $this->employmentTypeRepository->updateEmpType($id, $data);
    }

    public function delete(int $id)
    {
        return $this->employmentTypeRepository->deleteEmpType($id);
    }
}