export interface User {
    employee_id: number;
    first_name: string;
    last_name: string;
    email_verified_at: string;
    role: string;
}

export interface Employee{
    employee_id: number;
    first_name:string;
    last_name: string;
    designation: string;
    department: string;
    employment_type: string;
    role: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };

};
