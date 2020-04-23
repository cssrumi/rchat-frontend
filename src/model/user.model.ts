import {UserStatus} from "../model";

class UserModel {
    readonly displayName: string;
    readonly username: string;
    readonly createdAt: number;
    readonly status: UserStatus;

    constructor(displayName: string, username: string, createdAt: number, status: UserStatus) {
        this.displayName = displayName;
        this.username = username;
        this.createdAt = createdAt;
        this.status = status;
    }

}

export default UserModel;
