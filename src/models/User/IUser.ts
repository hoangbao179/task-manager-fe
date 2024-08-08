export interface IUser {
    id: string,
    userName: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

export class User implements IUser {
    id: string;
    userName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;

    constructor(users: IUser) {
        this.id = users.id;
        this.userName = users.userName;
        this.email = users.email;
        this.password = users.password;
        this.firstName = users.firstName;
        this.lastName = users.lastName;
    }
}
