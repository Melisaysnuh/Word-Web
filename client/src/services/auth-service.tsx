import { LoginDataI, RegisterDataI, UserI } from "../types/User";
import { jwtDecode } from "jwt-decode";



// Move to environment variables
const apiUrl = import.meta.env.VITE_BACKEND_URL;

export interface AuthUserResponse {
  token?: string;
  message?: string;
  user?: UserI;
}

const fetchAPI = async (url: string, options: RequestInit): Promise<AuthUserResponse> => {
  const userResponse = await fetch(url, options);
  if (!userResponse.ok) {
    const errorMessage = `Error: ${userResponse.status} ${userResponse.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return userResponse.json();
};

// Store user and token in localStorage
const storeAuthData = (token: string, user: UserI) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

// Retrieve user from localStorage
export const getStoredUser = (): UserI | null => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

export const register = async (userData: RegisterDataI): Promise<AuthUserResponse | undefined> => {
  try {
    const userResponse = await fetchAPI(`${apiUrl}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (userResponse.token && userResponse.user) {
      storeAuthData(userResponse.token, userResponse.user);
    }
    return userResponse;
  } catch (error) {
    console.error("Auth service error on register: ", error);
    throw error;
  }
};

export const login = async (userData: LoginDataI): Promise<AuthUserResponse> => {
  try {
    const userResponse = await fetchAPI(`${apiUrl}auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (userResponse.token && userResponse.user) {
      storeAuthData(userResponse.token, userResponse.user);
    }
    return userResponse;
  } catch (error) {
    console.error("Service error logging in: ", error);
    throw error;
  }
};

export const logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};


export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const decodeToken = (token: string): UserI | null => {
  try {
    return jwtDecode<UserI>(token);
  } catch (error) {
    console.error("Invalid token: " + error);
    return null;
  }
};

export const getDecodedToken = (): UserI | null => {
  const token = getToken();
  return token ? decodeToken(token) : null;
};

export const isTokenExpired = (): boolean => {
  const decoded = getDecodedToken();

  if (!decoded || !decoded.exp) return true; // No valid token

  const currentTime = Math.floor(Date.now() / 1000);
  if (decoded.exp < currentTime) {
    logout(); // Remove expired token
    return true;
  }
  return false;
};

// Refresh user data and update local storage
export const refreshUserData = async (): Promise<void> => {
  const token = getToken();
  if (!token || isTokenExpired()) return;

  try {
    const response = await fetch(`${apiUrl}/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to refresh user data");

    const user: UserI = await response.json();
    storeAuthData(token, user); // Update local storage
  } catch (error) {
    console.error("Error refreshing user data:", error);
    logout();
  }
};
