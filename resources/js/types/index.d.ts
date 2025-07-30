
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
}

    export interface Employee{
        user_id:number;
        employee_id: number;
        first_name:string;
        last_name: string;
        basic_pay:number;
        designation: string;
        department: string;
        employment_type: string;
        role: string;
        status: string;

        latest_payroll?: UserPayroll
    }


    export interface JobTitles{
        id:number
        designation:string,
        department:string
    }

    export interface UserPayroll extends Employee{
        payroll_id: number;
        first_name:string;
        last_name: string;
        basic_salary: number | null;
        pera: number | null;
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
        publish_status: 'publish' | 'partial' | 'none';
        created_at: string;
        updated_at: string;

        total_accrued_period?:number
        total_deduction?: number; // Optional field for total deductions
        net_pay?: number; // Optional field for net pay

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

