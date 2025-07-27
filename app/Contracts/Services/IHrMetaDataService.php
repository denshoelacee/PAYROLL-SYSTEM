<?php

namespace App\Contracts\Services;

interface IHrMetaDataService
{

    public function jobTitleList();
    public function empTypeList();
    public function createEmpType(array $data);
    public function updateEmpType(int $id, array $data);
    public function deleteEmpType(int $id);
}