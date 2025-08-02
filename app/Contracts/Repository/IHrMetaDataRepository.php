<?php

namespace App\Contracts\Repository;
use App\Models\EmploymentType;

interface IHrMetaDataRepository
{
    //CRUD JobTitle
    public function getJobTitle();

    public function addJobTitleDepartment(array $data);
    
    public function addJobTitleDesignation(array $data);

    public function updateJobTitle($id,array $data);

    public function deleteJobTitleDepartment($id);

    public function deleteJobTitleDesignation($id);
    
    //CRUD Employment Type
    public function getEmpTypeList();
    public function addEmpType(array $data);

    public function updateEmpType(int $id, array $data);
    public function deleteEmpType(int $id): bool;

    //Contribution
     public function create(array $data);
    
}