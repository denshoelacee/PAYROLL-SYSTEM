<?php

namespace App\Contracts\Services;

interface IHrMetaDataService
{
    //JOBTITLE CRUD INTERFACE
    public function jobTitleList();

    public function addJobTitle(array $data,$checker):void;

    public function updatePositions($id,array $data);

    public function destroyJobtitle($id,$checker):void;



    //EMPLOYEE TYPE CRUD INTERFACE
    public function empTypeList();
    public function createEmpType(array $data);
    public function updateEmpType(int $id, array $data);
    public function deleteEmpType(int $id);

    //Contribution
    public function addContributionType(array $data);
    public function displayContributionType();
    


}