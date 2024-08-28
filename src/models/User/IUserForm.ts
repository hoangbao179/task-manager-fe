export interface IUserForm {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export class UserForm implements IUserForm {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(users: IUserForm) {
        this.id = users.id;
        this.firstName = users.firstName;
        this.lastName = users.lastName;
        this.email = users.email;
        this.password = users.password
    }
}
