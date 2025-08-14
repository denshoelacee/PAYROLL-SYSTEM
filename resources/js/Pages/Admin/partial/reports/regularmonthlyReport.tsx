import ExcelJS from 'exceljs';
import { UserPayroll } from '@/types';
type GeneratemonthyReportParams  ={
  worksheet: ExcelJS.Worksheet;
  headerMonthTitle: string;
  headerYearTitle: string;
  viewReport: UserPayroll[];
}
export default function generatemonthlyReport({worksheet,headerMonthTitle,headerYearTitle,viewReport}:GeneratemonthyReportParams) {
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
        // Define header row
            const headerRow = [
            "No.", "Name", "Monthly Rate", "PERA","Gross Salary","Amount of Tardiness and Absences without pay", "W/ Holding TAX",
            "Tax Balance Due", "GSIS - Life and Retirement",
            "Pag-IBIG", "PHIC", "Other Deductions",
            "Net Pay", "Signature of Employee"
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
            worksheet.getRow(5).height=110;
    
            //Defining Columns
            worksheet.columns = [
            { width: 5},     // A: "No."
            { width: 20 },   // B: "Name"
            { width: 12 },   // C: "Monthly Rate"
            { width: 10 },   // D: "PERA"
            { width: 12 },   // E: "GROSS"
            { width: 13 },   // F  "Amount of Tardiness and Absences without pay"
            { width: 13 },   // G: "W/ Holding TAX"
            { width: 13 },   // H: "Tax Balance Due"
            { width: 12 },   // I: "GSIS/RLIP"
            { width: 12 },   // J: "PAGIBIG"
            { width: 12 },   // K: "PHIC"
            { width: 13 },   // L: "Other Deductions"
            { width: 15 },   // N: "Net Pay"
            { width: 15 },   // O: "Signature"
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
            worksheet.getRow(5).eachCell((cell:any) => {
            Object.assign(cell, headerStyle);
            });
    
            // ADDING DATA
            viewReport.forEach((row:any, index:number) => {
                const absentandLate = [
                    row.absent,
                    row.late,
                ].reduce((sum, val) => sum + parseFloat(val ?? 0), 0);
                const otherDeductionTotal = [
                    row.loans,row.housing_loan,row.policy_loan,row.consol_loan,row.emerg_loan,row.gel,row.gfal,row.mpl,row.mpl_lite,row.cfi,row.tipid,row.city_savings_bank,row.fea,row.canteen,row.disallowance,row.unliquidated_ca,row.disallowance_honoraria,row.coop,row.landbank,row.ucpb
                ].reduce((sum, val) => sum + parseFloat(val ?? 0), 0);
                const excelRow = worksheet.addRow([
                    index + 1,
                    row.employee_name ?? 0,
                    row.basic_salary ?? 0,
                    row.pera ?? 0,
                    row.gross_salary ?? 0, 
                    absentandLate,
                    row.holding_tax ?? 0,
                    row.tax_bal_due ?? 0,
                    row.rlip ?? 0,
                    row.contributions ?? 0,
                    row.philhealth ?? 0,
                    otherDeductionTotal,
                    row.net_pay ?? 0,
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
                } else if (colNumber === 14){
                    cell.border = {
                    top: { style: 'medium' },
                    left: { style: 'dashed', color: { argb: 'FF000000' } },
                    bottom: { style: 'medium' },
                    right: { style: 'thin', color: { argb: 'FF000000' } },
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
            gsisrlipTotal:0,
            contributionspagibig:0,
            philhealth :0,
            other_deduction:0,
            net_pay :0,
        };
    
        viewReport.forEach((row:any) => {
            footerTotals.basic_salary   += parseFloat(row.basic_salary ?? 0);
            footerTotals.pera           += parseFloat(row.pera ?? 0);
            footerTotals.gross_salary   += parseFloat(row.gross_salary ?? 0);
            footerTotals.absentandLate  += [row.absent,row.late,].reduce((sum, val) => sum + parseFloat(val ?? 0), 0);
            footerTotals.holding_tax    += parseFloat(row.holding_tax ?? 0)
            footerTotals.tax_bal_due    += parseFloat(row.tax_bal_due?? 0)
            footerTotals.gsisrlipTotal      += parseFloat(row.rlip ?? 0)
            footerTotals.contributionspagibig      += parseFloat(row.contributions ?? 0)
            footerTotals.philhealth     += parseFloat(row.philhealth ?? 0);
            footerTotals.other_deduction+= [row.loans,row.housing_loan,row.policy_loan,row.consol_loan,row.emerg_loan,row.gel,row.gfal,row.mpl,row.mpl_lite,row.cfi,row.tipid,row.city_savings_bank,row.fea,row.canteen,row.disallowance,row.unliquidated_ca,row.disallowance_honoraria,row.coop,row.landbank,row.ucpb].reduce((sum, val) => sum + parseFloat(val ?? 0), 0);
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
            footerTotals.gsisrlipTotal,
            footerTotals.contributionspagibig,
            footerTotals.philhealth,
            footerTotals.other_deduction,
            footerTotals.net_pay,
            '' // Signature
        ]); 
        // Style the footer row
            footerRow.eachCell((cell:any,colNumber:any) => {
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
            const signatureStartRow = footerRowIndex + 1; //Leave 1 Blank

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

            // A Left Border
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
            // A Bottom Border
            const aBottomEnd = aLeft + 6;
            for (let col = 2; col <= 6; col++) { // columns B to G are 2 to 7
            const cell = worksheet.getCell(aBottomEnd, col);
                cell.border = {
                    bottom: { style: 'medium' },
                };
            }
            
            //A Right Border
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

            // === Add Signatory Data Below (leave 3 blank rows) ===
            const certifiedEndRow = signatureStartRow; 
            const adataStartRow = certifiedEndRow + 3; // 3 blank rows

            const asignatories = [
            { name: "", title: "Signature over Printed Name of Authorized Official" },
            ];

            asignatories.forEach((sig, index) => {
                const row = adataStartRow + index + 2;

                // Merge B & C for Name
                worksheet.mergeCells(`B${row}:C${row}`);
                const anameCell = worksheet.getCell(`B${row}`);
                anameCell.value = sig.name;
                anameCell.alignment = { horizontal: 'center' };
                anameCell.font = { bold: true };

                // Merge B & C for Title
                worksheet.mergeCells(`B${row + 1}:C${row + 2}`);
                const atitleCell = worksheet.getCell(`B${row + 1}`);
                atitleCell.value = sig.title;
                atitleCell.alignment = { horizontal: 'center', wrapText:true};
                atitleCell.font = { name: 'Cambria'};
                atitleCell.border = {
                    top: {style: 'medium'}
                }
            });

            // for Date
            const aRowBlank = adataStartRow + 1; // E34
            const aRowDate = aRowBlank + 2     // E35

            worksheet.getCell(`E${aRowBlank}`).value = '';
            worksheet.getCell(`E${aRowBlank}`).alignment = { horizontal: 'left' };

            const adateCell = worksheet.getCell(`E${aRowDate}`);
            adateCell.value = 'Date:';
            adateCell.font = { name: 'Cambria'};
            adateCell.alignment = { horizontal: 'center' };
            adateCell.border = { top: {style: 'medium'}}

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

            //B Left Border
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

            // B Bottom Border
            const bBottomEnd = bLeft + 6;
            for (let col = 2; col <= 6; col++) { // columns B to G are 2 to 7
            const cell = worksheet.getCell(bBottomEnd, col);
                cell.border = {
                    bottom: { style: 'medium' },
                };
            }
            
            // B Right Border
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
            // === Add Signatory Data Below (leave 10 blank rows) ===
            const bdataStartRow = certifiedEndRow + 10; // 10 blank rows

            const bsignatories = [
            { name: "", title: "(Signature over Printed Name) Head of Accounting Division/Unit" },
            ];

            bsignatories.forEach((sig, index) => {
                const row = bdataStartRow + index + 4

                // Merge B & C for Name
                worksheet.mergeCells(`B${row}:C${row}`);
                const bnameCell = worksheet.getCell(`B${row}`);
                bnameCell.value = sig.name;
                bnameCell.alignment = { horizontal: 'center' };
                bnameCell.font = { bold: true };

                // Merge B & C for Title
                worksheet.mergeCells(`B${row + 1}:C${row + 2}`);
                const btitleCell = worksheet.getCell(`B${row + 1}`);
                btitleCell.value = sig.title;
                btitleCell.alignment = { horizontal: 'center', wrapText:true};
                btitleCell.font = { name: 'Cambria'};
                btitleCell.border = {
                    top: {style: 'medium'},
                    bottom: {style: 'medium'}
                }
            });

            // For Date
            const bRowBlank = bdataStartRow + 1;
            const bRowDate = bRowBlank + 4    

            worksheet.getCell(`E${bRowBlank}`).value = '';
            worksheet.getCell(`E${bRowBlank}`).alignment = { horizontal: 'left' };

            const bdateCell = worksheet.getCell(`E${bRowDate}`);
            bdateCell.value = 'Date:';
            bdateCell.font = { name: 'Cambria'};
            bdateCell.alignment = { horizontal: 'center' };
            bdateCell.border = { top: {style: 'medium'}}


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
            worksheet.mergeCells(`I${cTitle}:N${cTitle}`);
            const ctitleCell = worksheet.getCell(`I${cTitle}`);
            ctitleCell.alignment = { horizontal: 'left' };
            ctitleCell.font = { bold: true };
            worksheet.getCell(`I${cTitle}`).value = {
            richText: [
                { text: 'APPROVED FOR PAYMENT: _______________________________________________________', font: { bold: true , name:'Cambria'} },
            ]
            };
            ctitleCell.border = {
                top: {style: 'medium'},
                right: {style: 'medium'}
            }
    
            const cTitle2 = signatureStartRow + 2;
            worksheet.mergeCells(`I${cTitle2}:N${cTitle2}`);
            const ctitleCell2 = worksheet.getCell(`I${cTitle2}`);
            ctitleCell2.alignment = { horizontal: 'left' };
            ctitleCell2.font = { bold: true };
            worksheet.getCell(`I${cTitle2}`).value = {
            richText: [
                { text: '           ____________________________________________________ (P                                              )', font: { bold: true , name:'Cambria'} },
                ]
            }
            const cRight = signatureStartRow + 2;
            const cEnd = cRight + 6;
            // C Bottom Border
            const cBottomEnd = cRight + 6;
            for (let col = 9; col <= 13; col++) {
            const cell = worksheet.getCell(cBottomEnd, col);
                cell.border = {
                    bottom: { style: 'medium' },
                };
            }
            
            //C Right Border
            for (let i = cRight; i <= cEnd; i++) {
                const cell = worksheet.getCell(`N${i}`);
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

            // === Add Signatory Data Below (leave 3 blank rows) ===
            const cdataStartRow = certifiedEndRow + 3; // 3 blank rows

            const csignatories = [
            { name: "", signature: '(Signature over Printed Name)',title: " Head of Agency/Authorized Representative" },
            ];

            csignatories.forEach((sig, index) => {
                const row = cdataStartRow + index + 2

                // Merge J & L for Name
                worksheet.mergeCells(`I${row}:K${row}`);
                const cnameCell = worksheet.getCell(`I${row}`);
                cnameCell.value = sig.name;
                cnameCell.alignment = { horizontal: 'center' };
                cnameCell.font = { bold: true };

                worksheet.mergeCells(`I${row+1}:K${row+1}`);
                const csignature = worksheet.getCell(`I${row+1}`);
                csignature.value = sig.signature;
                csignature.alignment = { horizontal: 'center',wrapText:true};
                csignature.font = { name: 'Cambria'};
                csignature.border = {
                    top: {style: 'medium'},
                }

                // Merge J & L for Title
                worksheet.mergeCells(`I${row + 2}:K${row + 3}`);
                const ctitleCell = worksheet.getCell(`I${row + 2}`);
                ctitleCell.value = sig.title;
                ctitleCell.alignment = { horizontal: 'center', wrapText:true};
                ctitleCell.font = { name: 'Cambria'};
                ctitleCell.border = {
                    bottom: {style: 'medium'}
                }
            });

            // For Date
            const cRowBlank = cdataStartRow + 1;
            const cRowDate = cRowBlank + 2

            worksheet.getCell(`E${cRowBlank}`).value = '';
            worksheet.getCell(`E${cRowBlank}`).alignment = { horizontal: 'left' };

            const cdateCell = worksheet.getCell(`M${cRowDate}`);
            cdateCell.value = 'Date:';
            cdateCell.font = { name: 'Cambria'};
            cdateCell.alignment = { horizontal: 'center' };
            cdateCell.border = { top: {style: 'medium'}}

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
            worksheet.mergeCells(`I${dTitle}:L${dTitle+2}`);
            const dtitleCell = worksheet.getCell(`I${dTitle}`);
            dtitleCell.alignment = { horizontal: 'left',vertical: 'top',wrapText:true };
            dtitleCell.font = { bold: true };
            worksheet.getCell(`I${dTitle}`).value = {
            richText: [
                { text: 'CERTIFIED: ', font: { bold: true , name:'Cambria'} },
                { text: 'Each employee whose name appears on the payroll has been paid the amount as indicated opposite his/her name', font: { name:'Cambria'} }
            ]
            
            };
            dtitleCell.border = {
                top: {style: 'medium'},
                right: {style: 'medium'}
            }
            // D Left End Border
            const dRight = signatureStartRow + 9;
            const dEnd = dRight + 7;
            for (let i = dRight; i <= dEnd; i++) {
                const cell = worksheet.getCell(`H${i}`);
                if(i==dEnd){
                    cell.border ={
                        left: { style: 'medium' },
                        bottom: { style: 'medium' },
                    }
                }
            }
            // D Bottom BOrder
            const dBottomEnd = bLeft + 6;
            for (let col = 9; col <= 14; col++) { 
            const cell = worksheet.getCell(dBottomEnd, col);
                cell.border = {
                    bottom: { style: 'medium' },
                };
            }
            
            // D Right Border
            for (let i = dRight; i <= dEnd; i++) {
                const cell = worksheet.getCell(`N${i}`);
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

            // === Add Signatory Data Below (leave 10 blank rows) ===

            const ddataStartRow = certifiedEndRow + 10; // 10 Blank rows

            const dsignatories = [
            { name: "", signature:'(Signature over Printed Name)',title: "Disbursing Officer" },
            ];

            dsignatories.forEach((sig, index) => {
                const row = ddataStartRow + index + 4

                // Merge J & L for Name
                worksheet.mergeCells(`I${row}:K${row}`);
                const dnameCell = worksheet.getCell(`I${row}`);
                dnameCell.value = sig.name;
                dnameCell.alignment = { horizontal: 'center' };
                dnameCell.font = { bold: true };

                worksheet.mergeCells(`I${row+1}:K${row+1}`);
                const dsignatureCell = worksheet.getCell(`I ${row+1}`);
                dsignatureCell.value = sig.signature;
                dsignatureCell.alignment = { horizontal: 'center',wrapText:true };
                dsignatureCell.font = { name: 'Cambria'};
                dsignatureCell.border = {
                    top: {style: 'medium'},
                }

                // Merge J & L for Title
                worksheet.mergeCells(`I${row + 2}:K${row + 2}`);
                const dtitleCell = worksheet.getCell(`I${row + 2}`);
                dtitleCell.value = sig.title;
                dtitleCell.alignment = { horizontal: 'center', wrapText:true};
                dtitleCell.font = { name: 'Cambria'};
                dtitleCell.border = {
                    bottom: {style: 'medium'}
                }
            });
            //E
            const elabelCell = worksheet.getCell(`M${signatureStartRow + 9}`);
            elabelCell.value = "E";
            elabelCell.alignment ={ 
                horizontal: 'center'
            }
            elabelCell.border ={
                top: {style: 'medium'},
                left: {style: 'medium'},
                right: {style: 'medium'},
                bottom: {style: 'medium'}
            }
            const eRight = signatureStartRow + 10;
            const eEnd = eRight + 6;
            for (let i = eRight; i <= eEnd; i++) {
                const cell = worksheet.getCell(`M${i}`);
                    cell.border ={
                        left: { style: 'medium' },
                    }
                if(i==eEnd){
                    cell.border ={
                        left: { style: 'medium' },
                        bottom: { style: 'medium' },
                    }
                }
            
            }
    
            const eStartRow = signatureStartRow + 10;
            const eEndRow = eStartRow + 6;
        
    
            const eDataCell = worksheet.getCell(`M${eStartRow}`);
    
            eDataCell.value =
            'ORS/BURS No. : _______________\n' +
            'Date         : _______________\n' +
            '\n' +
            'JEV No.      : _______________\n' +
            'Date         : _______________';
    
            eDataCell.alignment = {
            vertical: 'top',
            horizontal: 'left',
            wrapText: true
            };
    
            // Set row height for visibility
            for (let i = eStartRow; i <= eEndRow; i++) {
            worksheet.getRow(i).height = 20;
    }
    
}