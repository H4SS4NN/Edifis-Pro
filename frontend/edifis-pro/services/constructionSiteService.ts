import apiService from "./apiService";

// Interface pour un chantier
export interface ConstructionSite {
    id: number;
    name: string;
    description: string;
    address: string;
    managerId: number;
    status: string;
    startDate: string;
    endDate: string;
    image_url?: string;
}

// Service pour gérer les chantiers
const constructionSiteService = {
    // Ajouter un chantier avec une image
    create: async (
        data: Omit<ConstructionSite, "id">,
        imageFile?: File
    ): Promise<ConstructionSite> => {
        const formData = new FormData();

        // ✅ Transformer correctement les valeurs AVANT de les ajouter à FormData
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, String(value)); // 🔥 Convertir toutes les valeurs en string
            }
        });

        // ✅ Ajouter l'image si elle existe
        if (imageFile) {
            formData.append("image", imageFile);
        }

        // 🚀 Log avant l’envoi au backend
        console.log("🔼 FormData envoyé :", Object.fromEntries(formData));

        return await apiService.post<ConstructionSite>(
            "/construction-sites",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    },

    // Mettre à jour un chantier (corrigé)
    update: async (
        id: number,
        data: Partial<ConstructionSite>
    ): Promise<ConstructionSite> => {
        return await apiService.put<ConstructionSite>(
            `/construction-sites/${id}`,
            data
        );
    },

    // Supprimer un chantier
    delete: async (id: number): Promise<void> => {
        return await apiService.delete<void>(`/construction-sites/${id}`);
    },

    // Récupérer tous les chantiers
    getAll: async (): Promise<ConstructionSite[]> => {
        return await apiService.get<ConstructionSite[]>("/construction-sites");
    },

    // Récupérer un chantier par ID
    getById: async (id: number): Promise<ConstructionSite> => {
        return await apiService.get<ConstructionSite>(`/construction-sites/${id}`);
    },
};

export default constructionSiteService;
