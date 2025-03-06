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

  // Mettre à jour un utilisateur
  update: async (id: number, data: Partial<User>): Promise<User> => {
    return await apiService.put<User>(`/users/${id}`, data);
  },

  // Récupérer tous les utilisateurs
  getAllUsers: async (): Promise<User[]> => {
    return await apiService.get<User[]>("/users/all");
  },

  // Récupérer tous les ouvriers
  getAllWorkers: async (): Promise<User[]> => {
    return await apiService.get<User[]>("/users/getallworkers");
  },

  // Récupérer un utilisateur par son ID
  getById: async (id: number): Promise<User> => {
    return await apiService.get<User>(`/users/${id}`);
  },

  delete: async (id: number): Promise<void> => {
    return await apiService.delete(`/users/${id}`);
  },
  uploadProfilePicture: async (
    file: File
  ): Promise<{ profile_picture: string }> => {
    const formData = new FormData();
    formData.append("image", file);

    return await apiService.postForm<{ profile_picture: string }>(
      "/users/upload-profile",
      formData
    );
  },
};

export default userService;
