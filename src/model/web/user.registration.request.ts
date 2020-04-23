class UserRegistrationRequest {
    readonly displayName: string;
    readonly username: string;
    readonly password: string;
    readonly email: string;

    constructor(displayName: string, username: string, password: string, email: string) {
        this.displayName = displayName;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}

export default UserRegistrationRequest;
