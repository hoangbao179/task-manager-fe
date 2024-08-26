export interface IUserDetail {
    id: string,
    fullName: string,
    email: string,
}

export class UserDetail implements IUserDetail {
    id: string;
    fullName: string;
    email: string;

    constructor(users: IUserDetail) {
        this.id = users.id;
        this.fullName = users.fullName;
        this.email = users.email;
    }
}
