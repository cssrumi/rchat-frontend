class LoginResponse {
    public readonly token: string;

    constructor(token: string) {
        this.token = token;
    }
}

export default LoginResponse;
