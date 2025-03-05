import apiService from "./apiService";
import { LoginData, AuthResponse, User } from "../model/Auth";


const authService = {
    login: async (data: LoginData): Promise<AuthResponse> => {
        return await apiService.post<AuthResponse>("/users/login", data);
    },
    getUserById: async (id: number): Promise<User> => {
        return await apiService.get<string>(`/users/${id}`);
    }
};

export default authService;