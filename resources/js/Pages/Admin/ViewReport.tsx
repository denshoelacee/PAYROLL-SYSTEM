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

export default function ViewReport({viewReport,headerMonthTitle,headerYearTitle}){
    console.log(headerMonthTitle)

    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Payroll');
        worksheet.pageSetup = {
            paperSize: 5, // legal
            orientation: 'landscape', 
            };
        worksheet.pageSetup.margins = {
            left: 0.3,
            right: 0.3,
            top: 0.3,
            bottom: 0.3,
            header: 1.9,
            footer: 0,
        };
        const worksheet2 = workbook.addWorksheet('limpyo');
        // Define header row
        const headerRow = [
        "No.", "Name", "Monthly Rate", "PERA","Gross Salary","Amount of Tardiness and Absences without pay", "W/ Holding TAX",
        "Tax Balance Due", "GSIS",
        "HDMF", "PHIC", "Other Deductions", "Total Deductions",
        "Net Pay", "Signature"
        ];
        //HEADER TITLE
        // Add title row if you want to display the selected month
        worksheet.mergeCells('A1:O1');
        worksheet.getCell('A1').value = `PAYROLL FOR REGULAR EMPLOYEES FOR ${headerMonthTitle}, ${headerYearTitle}`;
        worksheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getCell('A1').font = { bold: true, size: 14, name:'Cambria'};
        worksheet.getCell('A2').value = ''
        worksheet.getCell('A3').value = {
        richText: [
            { text: 'We hereby acknowledge to have received from ' },
            { text: 'MRS. JACQUELINE C. BAGUIO', font: { bold: true } },
            { text: ', Cashier II of CTU-DANAO CAMPUS, SABANG, DANAO CITY the sums herein specified opposite our respective names, the same being full ' }
        ]
        };
        worksheet.getCell('A3').font = { size: 11, name:'Cambria'};
        worksheet.getCell('A4').value =`compensation for our services rendered during the period stated below, to the correctness of which we hereby severally certify.`
        worksheet.getCell('A4').font = {size: 11, name:'Cambria'};
        
        
        // Add header row
        worksheet.addRow(headerRow);
        worksheet.getRow(5).height=100;

        //DEFININING COLUMNS
        worksheet.columns = [
        { width: 5},     // A: "No."
        { width: 20 },   // B: "Name"
        { width: 10 },   // C: "Monthly Rate"
        { width: 10 },   // D: "PERA"
        { width: 10 },   // E: "GROSS"
        { width: 15 },   // F  "Amount of Tardiness and Absences without pay"
        { width: 15 },   // G: "W/ Holding TAX"
        { width: 15 },   // H: "Tax Balance Due"
        { width: 10 },   // I: "GSIS"
        { width: 10 },   // J: "HDMF"
        { width: 10 },   // K: "PHIC"
        { width: 15 },   // L: "Other Deductions"
        { width: 15 },   // M: "Total Deductions"
        { width: 10 },   // N: "Net Pay"
        { width: 20 },   // O: "Signature"
        ];

         // Style the header row
        const headerStyle = {
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
        border: {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' },
        },
        font: { bold: true },
        };

        // Apply style to header
        worksheet.getRow(5).eachCell((cell) => {
        Object.assign(cell, headerStyle);
        });

        // ADDING DATA
        viewReport.forEach((row, index) => {
            const absentandLate = [
                row.absent,
                row.late,
            ].reduce((sum, val) => sum + parseFloat(val ?? 0), 0);
            // Compute GSIS total per row
            const gsisTotal = [
                row.rlip,
                row.policyloan,
                row.emergloan,
                row.gel,
                row.gfal,
                row.mpl,
                row.mpllite
            ].reduce((sum, val) => sum + parseFloat(val ?? 0), 0);

            const hdmfTotal = [
                row.contributions,
                row.loans,
                row.housing_loan
            ].reduce((sum, val) => sum + parseFloat(val ?? 0), 0);

            const otherDeductionTotal = [
                row.cfi,
                row.tipid,
                row.city_savings_bank,
                row.fea,
                row.canteen,
                row.disallowance,
                row.unliquidated_ca,
                row.disallowance_honoraria,
                row.coop,
                row.landbank,
                row.ucpb
            ].reduce((sum, val) => sum + parseFloat(val ?? 0), 0);
            const excelRow = worksheet.addRow([
                index + 1,
                row.employee_name ?? '',
                row.basic_salary ?? '',
                row.pera ?? '',
                row.gross_salary ?? '', 
                absentandLate,
                row.holding_tax ?? '',
                row.tax_bal_due ?? '',
                gsisTotal,
                hdmfTotal,
                row.philhealth ?? '',
                otherDeductionTotal,
                row.total_deduction ?? '',
                row.net_pay ?? '',
                ''
                ]);

            // Style the data row
            excelRow.eachCell((cell, colNumber) => {
            cell.alignment = { horizontal: 'right', wrapText: true };

            // Apply medium border only to Column A
            if (colNumber === 1) {
                cell.border = {
                top: { style: 'medium' },
                left: { style: 'medium' },
                bottom: { style: 'medium' },
                right: { style: 'medium' },
                };
                cell.alignment= {
                    horizontal: 'center'
                }
            } else if (colNumber === 15){
                cell.border = {
                top: { style: 'medium' },
                left: { style: 'medium' },
                bottom: { style: 'medium' },
                right: { style: 'medium' },
                };
            }else if (colNumber === 2) {
                cell.alignment = {horizontal: 'left'}
                cell.border = {
                    top: { style: 'dashed', color: { argb: 'FF000000' } },   // Black dashed
                    left: { style: 'dashed', color: { argb: 'FF000000' } },
                    bottom: { style: 'dashed', color: { argb: 'FF000000' } },
                    right: { style: 'thin', color: { argb: 'FF000000' } },
                };  
            }
            else{
                // Apply thin border to other columns
                cell.border = {
                top: { style: 'dashed', color: { argb: 'FF000000' } },   // Black dashed
                left: { style: 'dashed', color: { argb: 'FF000000' } },
                bottom: { style: 'dashed', color: { argb: 'FF000000' } },
                right: { style: 'thin', color: { argb: 'FF000000' } },
                };
            }
            });

        });


    //FOOTER
    // Compute footer totals
    const footerTotals = {
        basic_salary :0,
        pera :0,
        gross_salary :0,
        absentandLate :0, 
        holding_tax :0,
        tax_bal_due :0,
        gsisTotal:0,
        hdmfTotal:0,
        philhealth :0,
        other_deduction:0,
        total_deduction :0,
        net_pay :0,
    };

    viewReport.forEach(row => {
        footerTotals.basic_salary   += parseFloat(row.basic_salary ?? 0);
        footerTotals.pera           += parseFloat(row.pera ?? 0);
        footerTotals.gross_salary   += parseFloat(row.gross_salary ?? 0);
        footerTotals.absentandLate  += [row.absent,row.late,].reduce((sum, val) => sum + parseFloat(val ?? 0), 0);
        footerTotals.holding_tax    += parseFloat(row.holding_tax ?? 0)
        footerTotals.tax_bal_due    += parseFloat(row.tax_bal_due?? 0)
        footerTotals.gsisTotal      += [row.rlip,row.policyloan,row.emergloan,row.gel,row.gfal,row.mpl,row.mpllite].reduce((sum, val) => sum + parseFloat(val ?? 0), 0);
        footerTotals.hdmfTotal      += [row.contributions,row.loans,row.housing_loan].reduce((sum, val) => sum + parseFloat(val ?? 0), 0);
        footerTotals.philhealth     += parseFloat(row.philhealth ?? 0);
        footerTotals.other_deduction+= [row.cfi,row.tipid,row.city_savings_bank,row.fea,row.canteen,row.disallowance,row.unliquidated_ca,row.disallowance_honoraria,row.coop,row.landbank,row.ucpb].reduce((sum, val) => sum + parseFloat(val ?? 0), 0);
        footerTotals.total_deduction+= [row.total_deduction].reduce((sum, val) => sum + parseFloat(val ?? 0), 0);
        footerTotals.net_pay        += parseFloat(row.net_pay ?? 0);
    });

    const footerRow = worksheet.addRow([
        '', // No.
        'TOTAL:', // Name
        footerTotals.basic_salary,
        footerTotals.pera,
        footerTotals.gross_salary,
        footerTotals.absentandLate,
        footerTotals.holding_tax,
        footerTotals.tax_bal_due,
        footerTotals.gsisTotal,
        footerTotals.hdmfTotal,
        footerTotals.philhealth,
        footerTotals.other_deduction,
        footerTotals.total_deduction,
        footerTotals.net_pay,
        '' // Signature
    ]); 
    // Style the footer row
        footerRow.eachCell((cell,colNumber) => {
            cell.font = { bold: true };
            cell.alignment = { horizontal: 'right', vertical: 'middle' };
            cell.border = {
                top: { style: 'medium' },
                left: { style: 'medium' },
                bottom: { style: 'medium' },
                right: { style: 'medium' },
            };
            if(colNumber === 2){
                cell.alignment = {horizontal: 'center'}
            }
        });
        //Blank row before signatory
        const footerRowIndex = footerRow.number;
        const signatureStartRow = footerRowIndex + 1; // leave one blank row
        //A
        const alabelCell = worksheet.getCell(`A${signatureStartRow + 1}`);
        alabelCell.value = "A";
        alabelCell.alignment ={
            horizontal: 'center'
        }
        alabelCell.border ={
            top: {style: 'medium'},
            left: {style: 'medium'},
            right: {style: 'medium'},
            bottom: {style: 'medium'}
        }
        const aTitle = signatureStartRow + 1;
        worksheet.mergeCells(`B${aTitle}:G${aTitle}`);
        const atitleCell = worksheet.getCell(`B${aTitle}`);
        atitleCell.alignment = { horizontal: 'left' };
        atitleCell.font = { bold: true };
        worksheet.getCell(`B${aTitle}`).value = {
        richText: [
            { text: 'CERTIFIED: ', font: { bold: true , name:'Cambria'} },
            { text: 'Services duly rendered as stated', font: { name:'Cambria'} }
        ]
        
        };
        atitleCell.border = {
            top: {style: 'medium'},
            right: {style: 'medium'}
        }
        const aLeft = signatureStartRow + 2;
        const aEnd = aLeft + 6;
        for (let i = aLeft; i <= aEnd; i++) {
            const cell = worksheet.getCell(`A${i}`);
            cell.border = {
                left: { style: 'medium' },
            };
            if(i==aEnd){
                cell.border ={
                    left: { style: 'medium' },
                    bottom: { style: 'medium' },
                }
            }
        }
        const aBottomEnd = aLeft + 6;
        for (let col = 2; col <= 6; col++) { // columns B to G are 2 to 7
        const cell = worksheet.getCell(aBottomEnd, col);
            cell.border = {
                bottom: { style: 'medium' },
            };
        }

        for (let i = aLeft; i <= aEnd; i++) {
            const cell = worksheet.getCell(`G${i}`);
            cell.border = {
                right: { style: 'medium' },
            };
            if(i==aEnd){
                cell.border ={
                    right: { style: 'medium' },
                    bottom: { style: 'medium' },
                }
            }
        }
        //B
        const blabelCell = worksheet.getCell(`A${signatureStartRow + 9}`);
        blabelCell.value = "B";
        blabelCell.alignment ={
            horizontal: 'center'
        }
        blabelCell.border ={
            top: {style: 'medium'},
            left: {style: 'medium'},
            right: {style: 'medium'},
            bottom: {style: 'medium'}
        }
        
        const bTitle = signatureStartRow + 9;
        worksheet.mergeCells(`B${bTitle}:F${bTitle+1}`);
        const btitleCell = worksheet.getCell(`B${bTitle}`);
        btitleCell.alignment = { horizontal: 'left',wrapText:true,};
        btitleCell.font = { bold: true };
        worksheet.getCell(`B${bTitle}`).value = {
        richText: [
            { text: 'CERTIFIED: ' ,font:{bold: true, size:11,name:'Cambria'}},
            { text:'Supporting documents complete and proper; and cash available in the amount of  P______________________.'},
        ]
        
        };
        btitleCell.border = {
            top: {style: 'medium'},
        }
        const bLeft = signatureStartRow + 10;
        const bEnd = bLeft + 6;
        for (let i = bLeft; i <= bEnd; i++) {
            const cell = worksheet.getCell(`A${i}`);
            cell.border = {
                left: { style: 'medium' },
            };
            if(i==bEnd){
                cell.border ={
                    left: { style: 'medium' },
                    bottom: { style: 'medium' },
                }
            }
        }
        const bBottomEnd = bLeft + 6;
        for (let col = 2; col <= 6; col++) { // columns B to G are 2 to 7
        const cell = worksheet.getCell(bBottomEnd, col);
            cell.border = {
                bottom: { style: 'medium' },
            };
        }

        for (let i = bLeft; i <= bEnd; i++) {
            const cell = worksheet.getCell(`G${i}`);
            cell.border = {
                right: { style: 'medium' },
            };
            if(i==bEnd){
                cell.border ={
                    right: { style: 'medium' },
                    bottom: { style: 'medium' },
                }
            }
        }

        //C
        const clabelCell = worksheet.getCell(`H${signatureStartRow + 1}`);
        clabelCell.value = "C";
        clabelCell.alignment ={
            horizontal: 'center'
        }
        clabelCell.border ={
            top: {style: 'medium'},
            left: {style: 'medium'},
            right: {style: 'medium'},
            bottom: {style: 'medium'}
        }
        const cTitle = signatureStartRow + 1;
        worksheet.mergeCells(`I${cTitle}:O${cTitle}`);
        const ctitleCell = worksheet.getCell(`I${cTitle}`);
        ctitleCell.alignment = { horizontal: 'left' };
        ctitleCell.font = { bold: true };
        worksheet.getCell(`I${cTitle}`).value = {
        richText: [
            { text: 'APPROVED FOR PAYMENT: _________________________________', font: { bold: true , name:'Cambria'} },
        ]
        };
        ctitleCell.border = {
            top: {style: 'medium'},
            right: {style: 'medium'}
        }

        const cTitle2 = signatureStartRow + 2;
        worksheet.mergeCells(`I${cTitle2}:O${cTitle2}`);
        const ctitleCell2 = worksheet.getCell(`I${cTitle2}`);
        ctitleCell2.alignment = { horizontal: 'left' };
        ctitleCell2.font = { bold: true };
        worksheet.getCell(`I${cTitle2}`).value = {
        richText: [
            { text: '            ____________________________________________________ (P                                              )', font: { bold: true , name:'Cambria'} },
        ]
        }
        const cRight = signatureStartRow + 2;
        const cEnd = cRight + 6;
        for (let i = cRight; i <= cEnd; i++) {
            const cell = worksheet.getCell(`H${i}`);
            cell.border = {
                left: { style: 'medium' },
            };
            if(i==cEnd){
                cell.border ={
                    left: { style: 'medium' },
                    bottom: { style: 'medium' },
                }
            }
        }
        const cBottomEnd = cRight + 6;
        for (let col = 9; col <= 14; col++) { // columns I to N are 9 to 14
        const cell = worksheet.getCell(cBottomEnd, col);
            cell.border = {
                bottom: { style: 'medium' },
            };
        }

        for (let i = cRight; i <= cEnd; i++) {
            const cell = worksheet.getCell(`O${i}`);
            cell.border = {
                right: { style: 'medium' },
            };
            if(i==cEnd){
                cell.border ={
                    right: { style: 'medium' },
                    bottom: { style: 'medium' },
                }
            }
        }
        //D
        const dlabelCell = worksheet.getCell(`H${signatureStartRow + 9}`);
        dlabelCell.value = "D";
        dlabelCell.alignment ={
            horizontal: 'center'
        }
        dlabelCell.border ={
            top: {style: 'medium'},
            left: {style: 'medium'},
            right: {style: 'medium'},
            bottom: {style: 'medium'}
        }
        
        const dTitle = signatureStartRow + 9;
        worksheet.mergeCells(`I${dTitle}:O${dTitle}`);
        const dtitleCell = worksheet.getCell(`I${dTitle}`);
        dtitleCell.alignment = { horizontal: 'left' };
        dtitleCell.font = { bold: true };
        worksheet.getCell(`I${dTitle}`).value = {
        richText: [
            { text: 'CERTIFIED: ', font: { bold: true , name:'Cambria'} },
            { text: 'Services duly rendered as stated', font: { name:'Cambria'} }
        ]
        
        };
        dtitleCell.border = {
            top: {style: 'medium'},
            right: {style: 'medium'}
        }
        const dRight = signatureStartRow + 10;
        const dEnd = dRight + 6;
        for (let i = dRight; i <= dEnd; i++) {
            const cell = worksheet.getCell(`H${i}`);
            if(i==dEnd){
                cell.border ={
                    left: { style: 'medium' },
                    bottom: { style: 'medium' },
                }
            }
        }
        const dBottomEnd = bLeft + 6;
        for (let col = 9; col <= 14; col++) { // columns B to G are 2 to 7
        const cell = worksheet.getCell(dBottomEnd, col);
            cell.border = {
                bottom: { style: 'medium' },
            };
        }

        for (let i = dRight; i <= dEnd; i++) {
            const cell = worksheet.getCell(`O${i}`);
            cell.border = {
                right: { style: 'medium' },
            };
            if(i==dEnd){
                cell.border ={
                    right: { style: 'medium' },
                    bottom: { style: 'medium' },
                }
            }
        }
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
        {field: 'basic_salary',headerName: 'Monthly Rate',flex: 1,align: 'center',headerAlign: 'center',sortable: false,},
        {field: 'pera',headerName: 'PERA',flex: 1,align: 'center',headerAlign: 'center',sortable: false,},
        {field: 'gross_salary', headerName:'Gross Salary',flex:1, align: 'center', headerAlign:'center',sortable:false},
        {field: 'absentandLate', headerName:'Late/Absent',flex:1, align: 'center', headerAlign:'center',sortable:false,
            renderCell: (params) => {
                const {absent,late} = params.row
                return [absent,late]
                .map(Number)
                .reduce((sum, val) => sum + (isNaN(val) ? 0 : val), 0);

            }
        },
        {field: 'holding_tax',headerName: 'W/Holding Tax',flex: 1,align: 'center',headerAlign: 'center',sortable: false,},
        {field: 'tax_bal_due',headerName: 'Tax Balance Due',flex: 1,align: 'center',headerAlign: 'center',sortable: false,},
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
        {field: 'philhealth',headerName: 'PHIC',flex: 1,align: 'center',headerAlign: 'center',sortable: false,},
        {field: 'other_deductions',headerName: 'Other Deductions',flex: 1,align: 'center',headerAlign: 'center',sortable: false,
            renderCell: (params) => {
                const {cfi,tipid,city_savings_bank,fea,canteen,disallowance,unliquidated_ca,disallowance_honoraria,coop,landbank,ucpb} = params.row
                return [cfi,tipid,city_savings_bank,fea,canteen,disallowance,unliquidated_ca,disallowance_honoraria,coop,landbank,ucpb]
                .map(Number)
                .reduce((sum,val) => + sum + (isNaN(val) ? 0 : val), 0);
            }
        },
        {field: 'total_deduction',headerName: 'Total Deductions',flex: 1,align: 'center',headerAlign: 'center',sortable: false,},
        {field: 'net_pay',headerName: 'Net Pay',flex: 1,align: 'center',headerAlign: 'center',sortable: false,},
        {field: 'signature',headerName: 'Signature',flex: 1,align: 'center',headerAlign: 'center',sortable: false,},
    ]
    console.log(viewReport)
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