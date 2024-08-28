export interface IUserDetail {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
}

export class UserDetail implements IUserDetail {
    id: string;
    firstName: string;
    lastName: string;
    email: string;

    constructor(users: IUserDetail) {
        this.id = users.id;
        this.firstName = users.firstName;
        this.lastName = users.lastName;
        this.email = users.email;
    }
}
