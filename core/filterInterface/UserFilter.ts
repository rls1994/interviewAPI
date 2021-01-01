
export interface UserFilter{
    name?: string;
    phone?: string;
    state?: string;
    city?: string;
    address?: string;
    area?: string;
    password?: string;
    image?: string;

    isVerified?: boolean;
    id?: string;
    isActive?:boolean;
    modifiedOn?: Date;
    search?: string;
    offset?: number;
    limit?: number;
};
