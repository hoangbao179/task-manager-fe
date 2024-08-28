export interface IUser {
    id: string,
    firstName: string;
    lastName: string;
    email: string,
    password: string,
}

export class User implements IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(users: IUser) {
        this.id = users.id;
        this.firstName = users.firstName;
        this.lastName = users.lastName;
        this.email = users.email;
        this.password = users.password;
    }
}
