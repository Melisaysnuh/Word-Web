export interface LoginDataI {
    email: string;
    password: string;
}

export interface RegisterDataI extends LoginDataI {
    firstName?: string;
}
export interface UserI extends RegisterDataI{
    _id: string;
    history?: unknown[];
}

