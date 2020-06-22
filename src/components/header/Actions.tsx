import React, {FormEvent, useEffect, useState} from "react";
import {UserState} from "../../model/state";
import {userStore} from "../../store";

const Actions = () => {

    const [userState, setUserState] = useState<UserState>(UserState.empty);

    useEffect(() => {
        userStore.subscribe(setUserState);
        console.log("Actions rendered")
    }, []);

    const onLoginFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const loginInput = target.elements.namedItem("loginInput") as HTMLInputElement;
        const passwordInput = target.elements.namedItem("passwordInput") as HTMLInputElement;
        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();
        userStore.login(login, password);
        target.reset();
        console.log("LoginEventOccurred");
    }

    const onLogoutButtonSubmit = (event: FormEvent) => {
        event.preventDefault();
        userStore.logout();
        console.log("LogoutEventOccurred");
    }

    const loginElement = (
        <form id="loginForm" onSubmit={onLoginFormSubmit}>
            <input
                type="text"
                id="loginInput"
                name="loginInput"
                placeholder="Username"
                className="input"
                required
            />
            <input
                type="password"
                id="passwordInput"
                name="passwordInput"
                placeholder="Password"
                className="input"
                required
            />
            <button type="submit" className="button primary">Login</button>
        </form>
    );

    const logoutElement = (
        <button className="button primary" onClick={onLogoutButtonSubmit}>Logout</button>
    );

    return (
        <div className="actions">
            { userState !== UserState.empty() ? logoutElement : loginElement }
        </div>
    );
};

export default Actions;
