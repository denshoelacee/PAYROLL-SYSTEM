<?php

namespace App\Services\PayrollService;

use App\Contracts\Repository\IPayrollRepository;
use App\Contracts\Services\IPayrollService\IGeneratePayrollService;
use Illuminate\Http\Request;

class GeneratePayrollService implements IGeneratePayrollService
{

     public function __construct(protected IPayrollRepository $payrollRepository){}

     public function createPayroll(Request $request):void
     {
 
        $validated = $this->payrollRepository->getPayrollModel->create([
                
            
                      
        ]);
     }
}