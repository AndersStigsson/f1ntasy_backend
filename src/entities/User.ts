export interface IUser {
    id: number;
    username: string;
    password: string;
}

class User implements IUser {

    public id: number;
    public username: string;
    public password: string;

    constructor(usernameOrUser: string | IUser, password?: string, id?: number) {
        if (typeof usernameOrUser === 'string') {
            this.username = usernameOrUser;
            this.password = password || '';
            this.id = id || -1;
        } else {
            this.username = usernameOrUser.username;
            this.password = usernameOrUser.password;
            this.id = usernameOrUser.id;
        }
    }
}

export default User;
