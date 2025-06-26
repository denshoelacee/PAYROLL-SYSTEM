
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
}


export interface JobTitles{
    designation:string,
    department:string
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };

};

