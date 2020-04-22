class UserState {
    readonly username: string;
    readonly token: string;

    constructor(username: string, token: string) {
        this.username = username;
        this.token = token;
    }
}

export default UserState;
