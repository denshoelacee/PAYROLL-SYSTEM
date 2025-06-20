export interface User {
    employee_id: number;
    last_name: string;
    email_verified_at: string;
    role: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
