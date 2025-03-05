import apiService from "./apiService";

// Interface pour un utilisateur
export interface User {
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
  numberphone: string;
  profile_picture: string | null;
  role: "Worker" | "Manager";
  competences: string[];
}

// Service pour gérer les utilisateurs
const userService = {
  // Récupérer tous les managers
  getAllManagers: async (): Promise<User[]> => {
    return await apiService.get<User[]>("/users/all/manager");
  },

  // Récupérer tous les utilisateurs
  getAllUsers: async (): Promise<User[]> => {
    return await apiService.get<User[]>("/users/all");
  },

  // Récupérer un utilisateur par son ID
  getById: async (id: number): Promise<User> => {
    return await apiService.get<User>(`/users/${id}`);
  },
};

export default userService;
