<?php

namespace App\Http\Controllers\AdminController;
use App\Contracts\Services\IEmploymentTypeService;
use App\Http\Controllers\Controller;

class AdminUtilsController extends Controller
{
    public function __construct(protected IEmploymentTypeService $employmentTypeService){}

    public function displayEmpTypeList()
    {
       return $this->employmentTypeService->list();
    }

    public function createEmploymentType(array $data)
    {
        return $this->employmentTypeService->create($data);
    }
}
