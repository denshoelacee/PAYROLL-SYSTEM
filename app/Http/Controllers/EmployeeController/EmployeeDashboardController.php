<?php

namespace App\Http\Controllers\EmployeeController;

use App\Traits\YearRange;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Contracts\Services\IPayrollReportsServices\GeneratePayrollsReportServiceInterface;

class EmployeeDashboardController extends Controller
{

    use YearRange;
    public function __construct(
         protected GeneratePayrollsReportServiceInterface $payrollReportsService,
    ){}
    public function dashboard(Request $request){

        $year = $request->year ?? now()->year;

        $availableYears = $this->yearRange();

        $yearlyReports = $this->payrollReportsService->generatedPayrollReportsYearlyById($year);

        // Total contribution rlip,contributions,philhealth -> intended to regular employee's
        // Return null if not Regular Employee's
        $contributions = $this->payrollReportsService->generateContributionThisMonthById(); 

        $taxAndLoan = $this->payrollReportsService->generateLoanAndTaxThisMonthById();

  //dd($yearlyReports);
  //dd($contributions);
  //dd($taxAndLoan);
        return Inertia::render('Employee/Dashboard',
                [   
                    'selectedYear'   => (string)$year,
                    'availableYears' => $availableYears,
                    'yearReports'    => $yearlyReports,
                    'contributions'  => $contributions,
                    'taxAndLoans'    => $taxAndLoan,
                    
                ]);
    }
}
