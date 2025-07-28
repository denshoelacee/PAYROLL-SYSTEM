import PrimaryButton from "@/Components/PrimaryButton"
import Table from "@/Components/Table"
import AdminLayout from "@/Layouts/AdminLayout"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { router } from "@inertiajs/react"
import { GridColDef } from "@mui/x-data-grid"
import { FaArrowLeft } from "react-icons/fa"
import style from '../../../styles/style.css'
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { UserPayroll } from "@/types"
import generatemonthlyReport from "./partial/reports/monthlyReport"
import generateSundry from "./partial/reports/sundry"
type Props  ={
  worksheet2: ExcelJS.Worksheet;
  headerMonthTitle: string;
  headerYearTitle: string;
  viewReport: UserPayroll[];
}
export default function ViewReport({viewReport,headerMonthTitle,headerYearTitle}:Props){
    console.log(viewReport)
    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet(`${headerMonthTitle}`);
        const worksheet2 = workbook.addWorksheet('sundry');

        generatemonthlyReport({worksheet,headerMonthTitle,headerYearTitle,viewReport})
        generateSundry({worksheet2,headerMonthTitle,headerYearTitle,viewReport})
        // Download
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        saveAs(blob, `Payroll_Report_${headerMonthTitle}_${headerYearTitle}.xlsx`);
    };

    const columns:GridColDef[] = [
        {field: 'user_id',headerName: 'No.',flex: 1,align: 'center',headerAlign: 'center',sortable: false,},
        {field: 'employee_name',headerName: 'Name',flex: 1,align: 'center',headerAlign: 'center',sortable: false,},
        {field: 'basic_salary',headerName: 'Monthly Rate',flex: 1,align: 'center',headerAlign: 'center',sortable: false,
            renderCell: (params) => Number(params.value ?? 0)
        },
        {field: 'pera',headerName: 'PERA',flex: 1,align: 'center',headerAlign: 'center',sortable: false,
            renderCell: (params) => Number(params.value ?? 0)
        },
        {field: 'gross_salary', headerName:'Gross Salary',flex:1, align: 'center', headerAlign:'center',sortable:false,
            renderCell: (params) => Number(params.value ?? 0)
        },
        {field: 'absentandLate', headerName:'Late/Absent',flex:1, align: 'center', headerAlign:'center',sortable:false,
            renderCell: (params) => {
                const {absent,late} = params.row
                return [absent,late]
                .map(Number)
                .reduce((sum, val) => sum + (isNaN(val) ? 0 : val), 0);

            }
        },
        {field: 'holding_tax',headerName: 'W/Holding Tax',flex: 1,align: 'center',headerAlign: 'center',sortable: false,
            renderCell: (params) => Number(params.value ?? 0)
        },
        {field: 'tax_bal_due',headerName: 'Tax Balance Due',flex: 1,align: 'center',headerAlign: 'center',sortable: false,
            renderCell: (params) => Number(params.value ?? 0)
        },
        {field: 'gsis_total',headerName: 'GSIS',flex: 1,align: 'center',headerAlign: 'center',sortable: false,
            renderCell : (params) => {
                const {rlip,policy_loan,emerg_loan,gel,gfal,mpl,mpl_lite} = params.row
                return [rlip, policy_loan, emerg_loan, gel, gfal, mpl, mpl_lite]
                .map(Number)
                .reduce((sum, val) => sum + (isNaN(val) ? 0 : val), 0);
            }
        },
        {field: 'hdmf',headerName: 'HDMF',flex: 1,align: 'center',headerAlign: 'center',sortable: false,
            renderCell: (params) => {
                const {contributions,loans,housing_loan} = params.row
                return [contributions,loans,housing_loan]
                .map(Number)
                .reduce((sum,val) => + sum + (isNaN(val) ? 0 : val), 0);
            }
        },
        {field: 'philhealth',headerName: 'PHIC',flex: 1,align: 'center',headerAlign: 'center',sortable: false,
            renderCell: (params) => Number(params.value ?? 0)
        },
        {field: 'other_deductions',headerName: 'Other Deductions',flex: 1,align: 'center',headerAlign: 'center',sortable: false,
            renderCell: (params) => {
                const {cfi,tipid,city_savings_bank,fea,canteen,disallowance,unliquidated_ca,disallowance_honoraria,coop,landbank,ucpb} = params.row
                return [cfi,tipid,city_savings_bank,fea,canteen,disallowance,unliquidated_ca,disallowance_honoraria,coop,landbank,ucpb]
                .map(Number)
                .reduce((sum,val) => + sum + (isNaN(val) ? 0 : val), 0);
            }
        },
        {field: 'total_deduction',headerName: 'Total Deductions',flex: 1,align: 'center',headerAlign: 'center',sortable: false,
            renderCell: (params) => Number(params.value ?? 0)
        },
        {field: 'net_pay',headerName: 'Net Pay',flex: 1,align: 'center',headerAlign: 'center',sortable: false,
            renderCell: (params) => Number(params.value ?? 0)
        },
        {field: 'signature',headerName: 'Signature',flex: 1,align: 'center',headerAlign: 'center',sortable: false,},
    ]
    return(
        <>
        <div className="bg-mainColor p-5 h-screen">
            <div className="w-[100px] mb-4">
                <PrimaryButton onClick={() => window.history.back()}>
                    <div className="flex justify-center items-center">
                        <FaArrowLeft className="text-xl mx-2" />
                        <p>Back</p>
                    </div>
                </PrimaryButton>
            </div>

            <p className="text-white mb-4">
                PAYROLL FOR REGULAR EMPLOYEES FOR {headerMonthTitle} 2025
            </p>
        <PrimaryButton onClick={exportToExcel}>Download Excel</PrimaryButton>

            {/* Responsive horizontal scroll wrapper */}
            <div className="overflow-x-auto h-[550px] ">
                <div className="min-w-[120em] h-[550px]">
                    <Table
                        rows={viewReport}
                        columns={columns}
                        hideFooter={false}
                        pageSize={10}
                        getRowId={(row) => row.user_id}
                    />
                </div>
            </div>

        </div>

        </>
    ) 
}