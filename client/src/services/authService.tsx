import { LoginDataI, RegisterDataI, UserI } from "../types/User";
import {jwtDecode, JwtPayload} from 'jwt-decode';

// todo move to env
const AUTH_URL = "http://localhost:3000/auth";

export interface AuthResponse {
  token?: string;
  message?: string;
  user?: UserI;
}

const fetchAPI = async (
  url: string,
  options: RequestInit
): Promise<AuthResponse> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorMessage = `Error: ${response.status} ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return response.json();
};


export const register = async (
  userData: RegisterDataI
): Promise<AuthResponse | undefined> => {
  try {
    const response = await fetchAPI(`${AUTH_URL}/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.token) {
      localStorage.setItem("token", response.token);
    }
    return response;
  } catch (error) {
    console.error("Auth service error on register: ", error);
    throw error;
  }
};

export const logout = (): void => {
  localStorage.removeItem("token");
};

export const login = async (
  userData: LoginDataI
): Promise<AuthResponse> => {
  try {
    const response = await fetchAPI(`${AUTH_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response && response.token) {
      localStorage.setItem("token", response.token);

    }
    return response
  } catch (error) {
    console.error("Service error logging in: ", error);
    throw error;
  }
};
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};


export const decodeToken = (token: string ): UserI | null => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token" + error);
    return null;
  }
}


export function getDecodedToken () {
  const token = getToken();
  return token ? decodeToken(token) : null;
}

export function isTokenExpired (decodedToken: string) {
  if (!decodedToken) return true;
}

