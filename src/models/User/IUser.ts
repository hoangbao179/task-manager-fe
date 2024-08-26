export interface IUser {
    id: string,
    fullName: string,
    email: string,
    password: string,
}

export class User implements IUser {
    id: string;
    fullName: string;
    email: string;
    password: string;

    constructor(users: IUser) {
        this.id = users.id;
        this.fullName = users.fullName;
        this.email = users.email;
        this.password = users.password;
    }
}
