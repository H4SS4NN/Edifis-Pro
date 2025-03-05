const API_BASE_URL = "http://localhost:5000/api";

const apiService = {
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Une erreur est survenue");
      }

      return await response.json();
    } catch (error: any) {
      throw error.message || "Erreur de connexion au serveur";
    }
  },
  get: async <T>(endpoint: string): Promise<T> => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Une erreur est survenue");
      }

      return await response.json();
    } catch (error: any) {
      throw error.message || "Erreur de connexion au serveur";
    }
  },
  put: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Une erreur est survenue");
      }

      return await response.json();
    } catch (error: any) {
      throw error.message || "Erreur de connexion au serveur";
    }
  },
  delete: async <T>(endpoint: string): Promise<T> => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Une erreur est survenue");
      }

      return await response.json();
    } catch (error: any) {
      throw error.message || "Erreur de connexion au serveur";
    }
  },
};

export default apiService;
