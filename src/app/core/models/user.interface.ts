import { AuthInterface } from './auth.interface';

export interface UserInterface extends AuthInterface {
    uid: string;
    name?: string;
    fullName?: string;
    phone?: string;
    address?: string;
    imageProfile?: string;
}