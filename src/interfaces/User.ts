export interface User{
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    roles?: string[];
    birthdate?: string;
    cedula?: string;
    phone?: string;
    createdAt?:Date;
    id?: number;
}