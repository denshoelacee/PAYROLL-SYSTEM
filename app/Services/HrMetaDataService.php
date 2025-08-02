<?php

namespace App\Services;

use App\Contracts\Repository\IContributionTypeRepository;
use App\Contracts\Repository\IHrMetaDataRepository;
use App\Contracts\Services\IHrMetaDataService;

class HrMetaDataService implements IHrMetaDataService
{
    public function __construct(
        protected IHrMetaDataRepository $hrMetaDataRepository,
        protected IContributionTypeRepository $contributionTypeRepository
    ){}

    public function jobTitleList()
    {
        return $this->hrMetaDataRepository->getJobTitle();
    }

    public function addJobTitle(array $data,$checker):void
    {   
        //dd($data,$checker);
        if($checker === 'toDepartment')
        {
            $this->hrMetaDataRepository->addJobTitleDepartment($data);
        }
        elseif($checker === 'toDesignation')
        {
            $this->hrMetaDataRepository->addJobTitleDesignation($data);
        }

    }

    public function updatePositions($id,array $data)
    {
         return $this->hrMetaDataRepository->updateJobTitle($id, $data);
    }

    public function destroyJobtitle($id,$checker):void
    {
        if($checker === 'toDepartment')
        {
            $this->hrMetaDataRepository->deleteJobTitleDepartment($id);
        }
        if($checker === 'toDesignation')
        {
            $this->hrMetaDataRepository->deleteJobTitleDesignation($id);
        }
    }


    //CRUD EMPLOYEE TYPE
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
    //Contribution
    public function addContributionType(array $data)
    {
        return $this->hrMetaDataRepository->create($data);
    }

    public function displayContributionType()
    {
        return $this->contributionTypeRepository->getContribution();
    }
}