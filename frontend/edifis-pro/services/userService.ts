import apiService from "./apiService";

// Interface pour un utilisateur
export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

// Service pour gérer les utilisateurs
const userService = {
  // Récupérer tous les managers
  getAllManagers: async (): Promise<User[]> => {
    return await apiService.get<User[]>("/users/all/manager");
  },
};

export default userService;
