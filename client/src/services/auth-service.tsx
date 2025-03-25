import { LoginDataI, RegisterDataI, UserI } from "../types/User";
import {jwtDecode} from 'jwt-decode';



// todo move to env
const AUTH_URL = "http://localhost:3000/auth";

export interface AuthuserResponse {
  token?: string;
  message?: string;
  user?: UserI;
}

const fetchAPI = async (
  url: string,
  options: RequestInit
): Promise<AuthuserResponse> => {
  const userResponse = await fetch(url, options);
  if (!userResponse.ok) {
    const errorMessage = `Error: ${userResponse.status} ${userResponse.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return userResponse.json();
};


export const register = async (
  userData: RegisterDataI
): Promise<AuthuserResponse | undefined> => {
  try {
    const userResponse = await fetchAPI(`${AUTH_URL}/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (userResponse.token) {
      localStorage.setItem("token", userResponse.token);
    }
    return userResponse;
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
): Promise<AuthuserResponse> => {
  try {
    const userResponse = await fetchAPI(`${AUTH_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (userResponse && userResponse.token) {
      localStorage.setItem("token", userResponse.token);

    }



    return userResponse
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

    return jwtDecode<UserI>(token);
  } catch (error) {
    console.error("Invalid token" + error);
    return null;
  }
}


export function getDecodedToken () {
  const token = localStorage.getItem('token');
  if (token) {
    console.log('token exists')
    try {
      return decodeToken(token);
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }
  return null;
}

export function isTokenExpired () {
  return (getDecodedToken())
}


