<?php

namespace App\Services;

use App\Contracts\Repository\IHrMetaDataRepository;
use App\Contracts\Services\IHrMetaDataService;

class HrMetaDataService implements IHrMetaDataService
{
    public function __construct(protected IHrMetaDataRepository $hrMetaDataRepository){}

    public function jobTitleList()
    {
        return $this->hrMetaDataRepository->getJobTitle();
    }

    public function empTypeList()
    {
         return $this->hrMetaDataRepository->getEmpTypeList();
    }

    public function createEmpType(array $data)
    {
       return $this->hrMetaDataRepository->addEmpType($data);
    }

    public function updateEmpType(int $id, array $data)
    {
        return $this->hrMetaDataRepository->updateEmpType($id, $data);
    }

    public function deleteEmpType(int $id)
    {
        return $this->hrMetaDataRepository->deleteEmpType($id);
    }
}