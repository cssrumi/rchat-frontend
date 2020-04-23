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

    const getActions = () => {
        const loginElement = (
            <form id="loginForm" onSubmit={onLoginFormSubmit}>
                <input
                    type="text"
                    id="loginInput"
                    name="loginInput"
                    placeholder="login..."
                    required
                />
                <input
                    type="password"
                    id="passwordInput"
                    name="passwordInput"
                    placeholder="password..."
                    required
                />
                <button type="submit" hidden/>
            </form>
        );
        const logoutElement = (
            <button className="button" onClick={onLogoutButtonSubmit}>Logout</button>
        );

        if (userState !== UserState.empty()) {
            return logoutElement;
        }

        return loginElement;
    }

    return (
        <div className="actions">
            {getActions()}
        </div>
    );
};

export default Actions;
