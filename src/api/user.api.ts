import apiCall from "./api";
import {LoginRequest, LoginResponse, UserRegistrationRequest} from "../model/web";
import {UserModel} from "../model";


const USER_RESOURCE_URI = "/v1/user";
const LOGIN_URI = "/v1/login";
const LOGOUT_URI = "/v1/logout";

function login(request: LoginRequest, options: RequestInit = {}): Promise<LoginResponse> {
    const finalOptions: RequestInit = {
        ...options,
        method: "POST",
        body: JSON.stringify(request)
    }
    return apiCall(LOGIN_URI, options);
}

function logout(options: RequestInit = {}): Promise<void> {
    return apiCall(LOGOUT_URI, options);
}

function registerUser(request: UserRegistrationRequest, options: RequestInit = {}): Promise<void> {
    const finalOptions: RequestInit = {
        ...options,
        method: "POST",
        body: JSON.stringify(request)
    }
    return apiCall(USER_RESOURCE_URI, options);
}

function getUser(username: string, options: RequestInit = {}): Promise<UserModel> {
    return apiCall(`${USER_RESOURCE_URI}/${username}`, options);
}

function getAllUsers(options: RequestInit = {}): Promise<Array<UserModel>> {
    return apiCall(USER_RESOURCE_URI, options);
}

export {login, logout, registerUser};
