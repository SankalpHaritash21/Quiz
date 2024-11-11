import axios from "axios";

const API_URL = "https://soft-hoops-agree.loca.lt/api/auth";

export interface AuthResponse {
  token: string;
}

export const register = (username: string, email: string, password: string) =>
  axios.post(`${API_URL}/register`, { username, email, password });

export const login = (email: string, password: string) =>
  axios.post<AuthResponse>(`${API_URL}/login`, { email, password });
