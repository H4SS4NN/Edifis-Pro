import apiService from "./apiService";

// Définition de l'interface pour un chantier
export interface ConstructionSite {
    id: number;
    name: string;
    description: string;
    site: string;
    address: string;
    manager: string;
    status: string;
    startDate: string;
    endDate: string;
    image: string;
}

const constructionSiteService = {
    // Récupérer tous les chantiers
    getAll: async (): Promise<ConstructionSite[]> => {
        return await apiService.get<ConstructionSite[]>("/construction-sites");
    },

    // Récupérer un chantier par ID
    getById: async (id: number): Promise<ConstructionSite> => {
        return await apiService.get<ConstructionSite>(`/construction-sites/${id}`);
    },

    // Ajouter un chantier
    create: async (data: Omit<ConstructionSite, "id">): Promise<ConstructionSite> => {
        return await apiService.post<ConstructionSite>("/construction-sites", data);
    },

    // Mettre à jour un chantier     
    update: async (id: number, data: Partial<ConstructionSite>): Promise<ConstructionSite> => {
        return await apiService.put<ConstructionSite>(`/construction-sites/${id}`, data);
    },

    // Supprimer un chantier
    delete: async (id: number): Promise<{ message: string }> => {
        return await apiService.delete<{ message: string }>(`/construction-sites/${id}`);
    },
};

export default constructionSiteService;
