import axios, { AxiosResponse } from "axios";
import { LoginDataI, RegisterDataI, UserI } from "../types/User";



// i could not get env to work - have it here
// Base URL for the backend API
const AUTH_URL = "https://glowpath-a7681fe09c29.herokuapp.com" + '/auth';
// Get the stored token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export interface AuthResponse {
  token?: string;
  message?: string;
  user?: UserI;
}


export const register = async (userData: RegisterDataI
): Promise<AxiosResponse<AuthResponse> | undefined> => {
  try {
    const response = await axios.post<AuthResponse>(`${AUTH_URL}/register`, userData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response && response.data.token) {
      localStorage.setItem("token", response.data.token);

      }

      return response



  }
  catch (error) {
    console.log('auth service error on register: ', error)
    throw error;
  }
}


export const login = async (userData: LoginDataI,
): Promise<AxiosResponse<AuthResponse>> => {
  try {
    const response = await axios.post<AuthResponse>(`${AUTH_URL}/login`, userData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      }
    });
    return response

  }
    catch (error) {
      console.log('service error logging in: ', error)
    throw error
  }
};

export const editProfile = async (
  userEdit: {
    [key in keyof typeof FormData]?: string;
  } & { _id: string },
  handleLogin: (token: string, userData: UserI) => void
): Promise<AxiosResponse<AuthResponse> | undefined> => {
  try {
    const token = getToken();

    console.log('sending to edit: ', userEdit);

    const response = await axios.post<AuthResponse>(`${AUTH_URL}/edit`, userEdit, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    if (response.data.token && response.data.user) {
      handleLogin(response.data.token, response.data.user);
    }
    return response;
  } catch (error) {
    console.log('error loading profile', error);
    throw error;
  }
};



