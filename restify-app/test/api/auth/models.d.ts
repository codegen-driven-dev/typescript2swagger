import {Model, Record} from 'waterline';

export interface IUser extends Record, Model, IUserBase {
}

export interface IUserBase {
    email: string;
    password?: string;
    title?: string;
}
