import ExcelJS from 'exceljs';
import { UserPayroll } from '@/types';
type GenerateSundryParams  ={
  worksheet2: ExcelJS.Worksheet;
  headerMonthTitle: string;
  headerYearTitle: string;
  viewReport: UserPayroll[];
}
export default function generateSundry({ worksheet2, headerMonthTitle, headerYearTitle, viewReport }:GenerateSundryParams) {
    worksheet2.pageSetup = {
        paperSize: 5, // Legal
        orientation: 'landscape',
        margins: {
            left: 0.3, right: 0.3, top: 0.3, bottom: 0.3,
            header: 1.9, footer: 0,
        },
    };
    // ===== Titles =====
    worksheet2.mergeCells('A1:W1');
    worksheet2.getCell('A1').value = 'ABSTRACT OF OTHER DEDUCTIONS';
    worksheet2.getCell('A1').alignment = { horizontal: 'center' };
    worksheet2.getCell('A1').font = { bold: true, name: 'Cambria' };

    worksheet2.mergeCells('A2:W2');
    worksheet2.getCell('A2').value = `ATTACHMENT OF PAYROLL FOR REGULAR EMPLOYEES FOR ${headerMonthTitle}, ${headerYearTitle}`;
    worksheet2.getCell('A2').alignment = { horizontal: 'center' };
    worksheet2.getCell('A2').font = { bold: true, name: 'Cambria' };

    // ===== Header Merges =====
    worksheet2.mergeCells('A3:A4'); // No.
    worksheet2.mergeCells('B3:B4'); // Name
    worksheet2.mergeCells('C3:I3'); // GSIS
    worksheet2.mergeCells('J3:K3'); // HDMF
    worksheet2.mergeCells('L3:V3'); // Other Deductions
    worksheet2.mergeCells('W3:W4'); // OTHER DEDUCTION TOTAL

    worksheet2.getCell('A3').value = 'No.';
    worksheet2.getCell('B3').value = 'Name';
    worksheet2.getCell('C3').value = 'GOVERNMENT SERVICE INSURANCE SERVICE';
    worksheet2.getCell('K3').value = 'HDMF';
    worksheet2.getCell('N3').value = 'OTHER DEDUCTIONS';


    // ===== Subheaders in Row 4 =====
    const subHeaders = [
        "Policy Loan", "Consol Loan", "Emergency Loan","GEL", "GFAL", "MPL", "MPL LITE", // C to I
        "LOANS", "Housing Loan",                                         // J to L
        "CFI", "TIPID", "CITY BANK SAVINGS", "FEA", "CANTEEN",                                 // M to Q
        "Disallowance", "Unliquidated Cash", "Disallowance (COA)",                        // R to T
        "COOP", "LAND BANK", "UCPB","OTHER DEDUCTIONS"                                                 // U to W
    ];

    let colIndex = 3; // Column C
    subHeaders.forEach((text) => {
        const cell = worksheet2.getRow(4).getCell(colIndex++);
        cell.value = text;
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        cell.font = { bold: true, name: 'Cambria' };
        
    });

    worksheet2.columns = [
            { width: 5},     // A: "No."
            { width: 20 },   // B: "Name"
            { width: 10 },   // C: "Policy Loan"
            { width: 10 },   // D: "Consol Loan"
            { width: 10 },   // E: "Emergency Loan"
            { width: 10 },   // F  "GEL"
            { width: 10 },   // G: "GFAL"
            { width: 10 },   // H: "MPL"
            { width: 10 },   // I: "MPL LITE"
            { width: 10 },   // K: "LOANS"
            { width: 11 },   // L: "Housing Loans"
            { width: 10 },   // M: "CFI"
            { width: 10 },   // N: "TIPID"
            { width: 10 },   // O: "CITY SAVINGS"
            { width: 10 },   // P: "FEA"
            { width: 10 },   // Q: "CANTEEN"
            { width: 10 },   // R: "Disallowance"
            { width: 15 },   // S: "Unliquidated Cash"
            { width: 15 },   // T: "Disallowance COA"
            { width: 10 },   // U: "COOP"
            { width: 10 },   // V: "LandBank"
            { width: 10 },   // W: "UCPB"
            { width: 15 },   // X: "OTHER DEDUCTION"
            ];
    
    // ===== Format Header Rows =====
    const headerRange = { fromCol: 1, toCol: 23, rows: [3, 4] }; // A (1) to X (24), rows 3 & 4
    for (let rowNum of headerRange.rows) {
        const row = worksheet2.getRow(rowNum);
        for (let col = headerRange.fromCol; col <= headerRange.toCol; col++) {
            const cell = row.getCell(col);
            cell.font = { bold: true, name: 'Cambria' };
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            cell.border = {
                top: { style: 'medium' },
                left: { style: 'medium' },
                bottom: { style: 'medium' },
                right: { style: 'medium' },
            };
        }
    }

    viewReport.forEach((row:any,index:number)=>{
        const otherdeductiontotal = [
            row.loans,row.housing_loan,row.policy_loan,row.consol_loan,row.emerg_loan,row.gel,row.gfal,row.mpl,row.mpl_lite,row.cfi,row.tipid,row.city_savings_bank,row.fea,row.canteen,row.disallowance,row.unliquidated_ca,row.disallowance_honoraria,row.coop,row.landbank,row.ucpb
        ].reduce((sum, val) => sum + parseFloat(val ?? 0), 0);
        const excelRow = worksheet2.addRow([
            index + 1,
            row.employee_name ?? '',
            row.policy_loan ?? 0,
            row.consol_loan ?? 0,
            row.emerg_loan ?? 0,
            row.gel ?? 0,
            row.gfal ?? 0,
            row.mpl?? 0,
            row.mpl_lite ?? 0,
            row.loans ?? 0,
            row.housing_loan ?? 0,
            row.cfi ?? 0,
            row.tipid ?? 0,
            row.city_savings_bank ?? 0,
            row.fea ?? 0,
            row.canteen ?? 0,
            row.disallowance ?? 0,
            row.unliquidated_ca?? 0,
            row.disallowance_honoraria?? 0,
            row.coop ?? 0,
            row.landbank ?? 0,
            row.ucpb?? 0,
            otherdeductiontotal
            ]);

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
                } else if (colNumber === 23){
                    cell.border = {
                    top: { style: 'medium' },
                    left: { style: 'medium' },
                    bottom: { style: 'medium' },
                    right: { style: 'medium' },
                    };
                }else if (colNumber === 2) {
                    cell.alignment = {horizontal: 'left'}
                    cell.border = {
                        top: { style: 'dashed', color: { argb: 'FF000000' } },  
                        left: { style: 'dashed', color: { argb: 'FF000000' } },
                        bottom: { style: 'dashed', color: { argb: 'FF000000' } },
                        right: { style: 'thin', color: { argb: 'FF000000' } },
                    };  
                }
                else{
                    // Apply thin border to other columns
                    cell.border = {
                    top: { style: 'dashed', color: { argb: 'FF000000' } },  
                    left: { style: 'dashed', color: { argb: 'FF000000' } },
                    bottom: { style: 'dashed', color: { argb: 'FF000000' } },
                    right: { style: 'thin', color: { argb: 'FF000000' } },
                    };
                }
            });
    })
         //FOOTER
        // Compute footer totals
        const footerTotals = {
            policy_loan :0,
            consol_loan :0,
            emergency_loan :0,
            gel :0,
            gfal :0,
            mpl:0,
            mpl_lite:0,
            loans:0,
            housing_loans :0,
            cfi :0,
            tipid:0,
            city_savings_bank:0,
            fea:0,
            canteen:0,
            disallowance:0,
            unliquidated_cash_advances:0,
            disallowance_honoraria:0,
            coop:0,
            landbank:0,
            ucpb:0,
            otherdeducTotal:0
        };
    
        viewReport.forEach((row:any )=> {
            footerTotals.policy_loan        += parseFloat(row.policy_loan ?? 0);
            footerTotals.consol_loan        += parseFloat(row.consol_loan ?? 0);
            footerTotals.emergency_loan     += parseFloat(row.emerg_loan ?? 0);
            footerTotals.gel                += parseFloat(row.gel ?? 0)
            footerTotals.gfal               += parseFloat(row.gfal?? 0)
            footerTotals.mpl                += parseFloat(row.mpl ?? 0)
            footerTotals.mpl_lite           += parseFloat(row.mpl_lite ?? 0)
            footerTotals.loans              += parseFloat(row.loans ?? 0);
            footerTotals.housing_loans      += parseFloat(row.housing_loan ?? 0)
            footerTotals.cfi                += parseFloat(row.cfi ?? 0);
            footerTotals.tipid              += parseFloat(row.tipid ?? 0);
            footerTotals.city_savings_bank  += parseFloat(row.city_savings_bank ?? 0);
            footerTotals.fea                += parseFloat(row.fea ?? 0);
            footerTotals.canteen            += parseFloat(row.canteen ?? 0);
            footerTotals.disallowance       += parseFloat(row.disallowance ?? 0);
            footerTotals.unliquidated_cash_advances += parseFloat(row.unliquidated_ca ?? 0);
            footerTotals.disallowance_honoraria += parseFloat(row.disallowance_honoraria ?? 0);
            footerTotals.coop               += parseFloat(row.coop ?? 0);
            footerTotals.landbank           += parseFloat(row.landbank ?? 0);
            footerTotals.ucpb               += parseFloat(row.ucpb ?? 0);
            footerTotals.otherdeducTotal    += [row.loans,row.housing_loan,row.policy_loan,row.consol_loan,row.emerg_loan,row.gel,row.gfal,row.mpl,row.mpl_lite,row.cfi,row.tipid,row.city_savings_bank,row.fea,row.canteen,row.disallowance,row.unliquidated_ca,row.disallowance_honoraria,row.coop,row.landbank,row.ucpb].reduce((sum, val) => sum + parseFloat(val ?? 0), 0);
        });
    
        const footerRow = worksheet2.addRow([
            '', // No.
            'TOTAL:', // Name
            footerTotals.policy_loan   ,     
            footerTotals.consol_loan        ,
            footerTotals.emergency_loan     ,
            footerTotals.gel                ,
            footerTotals.gfal               ,
            footerTotals.mpl                ,
            footerTotals.mpl_lite           ,
            footerTotals.loans              ,
            footerTotals.housing_loans      ,
            footerTotals.cfi                ,
            footerTotals.tipid              ,
            footerTotals.city_savings_bank  ,
            footerTotals.fea                ,
            footerTotals.canteen            ,
            footerTotals.disallowance       ,
            footerTotals.unliquidated_cash_advances,
            footerTotals.disallowance_honoraria,
            footerTotals.coop               ,
            footerTotals.landbank           ,
            footerTotals.ucpb               ,
            footerTotals.otherdeducTotal    ,
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
}
