import { AuthInterface } from './auth.interface';

export interface RegisterInterface extends AuthInterface {
    name?: string;
    fullName?: string;
    sex?: string;
    phone?: string;
    address?: string;
    imageProfile?: string;
    userReport?: boolean
}
