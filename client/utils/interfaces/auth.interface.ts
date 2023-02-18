import { IUser } from './user.interface';

export interface ILogin {
    token: string;
    user: IUser;
}
