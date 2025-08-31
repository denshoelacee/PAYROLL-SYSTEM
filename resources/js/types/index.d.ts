
/**
 * 
 * @User -- for Login Verification
 * @Employee - for Displaying Data 
 * @JobTitles -- for Registration of Users
 */
export interface User {
    employee_id: number;
    first_name: string;
    last_name: string;
    role: string;
    user_id: number | string;
}

export interface filteredSelectedTypeUser{
    user_id: number | string;
    employee_id: number;
    full_name: string;
    hashid: string;

    latest_payroll?: UserPayroll
}

    export interface Employee{
        user_id: number |string ;
        employee_id: number;
        full_name: string;
        first_name:string;
        last_name: string;
        basic_pay:number;
        designation: string;
        department: string;
        employment_type: string;
        role: string;
        status: string;

      //  latest_payroll?: UserPayroll
    }


    export interface JobTitles{
        id:number
        designation:string,
        department:string
    }

    export interface UserPayroll extends Employee{
        latest_payroll: any;
            user_id: number;
            employee_id: number;
            basic_pay: number;
            payslip_id: number | string;
            payroll_id: number | null;
            full_name: string;
            daily_rate: number | null,
            duty_count: number | null,
            hourly_rate: number | null;
            units: number | null;
            service_rendered: number | null;
            basic_salary: number | null;
            pera: number| null;
            absent: number | null;
            late: number | null;
            holding_tax: number | null;
            tax_bal_due: number | null;
            rlip: number | null;
            policy_loan: number | null;
            consol_loan: number | null;
            emerg_loan: number | null;
            gel: number | null;
            gfal: number | null;
            mpl: number | null;
            mpl_lite: number | null;
            contributions: number | null;
            loans: number | null;
            housing_loan: number | null;
            philhealth: number | null;
            cfi: number | null;
            tipid: number | null;
            city_savings_bank: number | null;
            fea: number | null;
            canteen: number | null;
            disallowance: number | null;
            unliquidated_ca: number | null;
            disallowance_honoraria: number | null;
            coop: number | null;
            landbank: number | null;
            ucpb: number | null;
            sss: number| null;
            deduction1: number | null;
            deduction2: number | null;
            deduction3: number | null;
            assigned_designation: string | null; //PAYSLIP JOB ASSIGN
            assigned_department: string | null; //PAYSLIP JOB ASSIGN
            payslip_type: string | null;    // WHAT PAYSLIP TYPE REGULAR/PART-TIME,JOB ORDER/PART-TIME,REGULAR
            publish_status: 'publish' | 'partial' | 'none';
            created_at: string;
            updated_at: string;
        //Payroll Deductions for Regular,Job Order
        total_accrued_period?:number
        total_deduction?: number; 
        net_pay?: number; 

        users?:Employee
        previousPayroll?: UserPayroll
        employee_name?:string
        gross_salary?:number
    }

    export interface EmploymentTypes{
        id: number
        employment_type_list: string
    }


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };

};

