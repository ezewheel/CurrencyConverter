export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    name: string;
    password: string;
}

export interface DecodedToken {
    username: string;
    role: string;
}

export interface AuthResponse {
    message: string;
    data: string;
}