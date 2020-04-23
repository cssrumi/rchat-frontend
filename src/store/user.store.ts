import UserState from "../model/state/user.state";
import {Subject, Subscription} from "rxjs";
import {Dispatch, SetStateAction} from "react";
import {login} from "../api/user.api";
import {LoginRequest} from "../model/web";

class UserStore {
    private readonly userStateObserver: Subject<UserState>
    private userState: UserState;

    private constructor(userState: UserState) {
        this.userStateObserver = new Subject<UserState>();
        this.userState = userState;
        this.userStateObserver.next(userState);
    }

    static create() {
        return new UserStore(UserState.empty());
    }

    subscribe(setState: Dispatch<SetStateAction<UserState>>): Subscription {
        return this.userStateObserver.subscribe(setState)
    }

    authorizeOptions(): RequestInit {
        return {
            headers: {
                Authorization: `Bearer ${this.userState.token}`,
                Username: this.userState.username
            }
        }
    }

    async login(username: string, password: string): Promise<void> {
        login(new LoginRequest(username, password))
            .then((loginResponse) => this.userState = new UserState(username, loginResponse.token))
            .then(() => this.userStateObserver.next(this.userState));
    }

    logout(): void {
        this.userState = UserState.empty();
        this.userStateObserver.next(this.userState);
    }

    isLoggedIn(): boolean {
        return this.userState !== UserState.empty();
    }
}

const userStore = UserStore.create();

export default userStore;
