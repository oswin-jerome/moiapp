export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

export interface Event {
    id: number;
    name: string;
    date: Date;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    gifts_count: number;
}

export interface Gift {
    id: number;
    name: string;
    address: string;
    phone: string;
    gifted_to: string;
    amount: number;
    note: string;
    event_id: number;
    created_at: Date;
    updated_at: Date;
}
