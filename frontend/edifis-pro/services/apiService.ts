
const API_BASE_URL = "http://localhost:5000/api";

const apiService = {
    post: async <T>(endpoint: string, data: any): Promise<T> => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
};

export default apiService;
