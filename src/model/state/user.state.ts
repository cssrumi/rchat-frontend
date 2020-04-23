class UserState {
    private static EMPTY_STATE = new UserState("", "");
    readonly username: string;
    readonly token: string;

    constructor(username: string, token: string) {
        this.username = username;
        this.token = token;
    }

    static empty(): UserState {
        return UserState.EMPTY_STATE;
    }
}

export default UserState;
