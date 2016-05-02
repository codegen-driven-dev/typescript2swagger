import {IUserBase, IUser} from './models.d';

export interface cb {
    (err: Error, res?: any): void;
}

export interface ITestSDK {
    register(user: IUserBase, done: cb);
    get_user(access_token: string, user: IUser | IUserBase, done: cb);
    update(user: IUserBase, done: cb);
    logout(access_token: string, done: cb): void;
    unregister(ident: { access_token?: string, user_id?: string }, done: cb);
    logout(access_token: string, done: cb);
    registerLoginFaux(user: IUserBase, done: cb);
    logoutUnregisterFaux(user: IUser, done: cb);
    unregisterManyFaux(users: Array<IUser | IUserBase>, done: cb);
}
