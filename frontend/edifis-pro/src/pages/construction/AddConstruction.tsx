import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import constructionSiteService from "../../../services/constructionSiteService";
import userService, { User } from "../../../services/userService";

export default function AddConstruction() {
    const navigate = useNavigate();
    const [managers, setManagers] = useState<User[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        address: "",
        managerId: "",
        status: "En cours",
        startDate: "",
        endDate: "",
    });
    const [image, setImage] = useState<File | null>(null);
    // Charger la liste des managers au chargement de la page
    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const managersData = await userService.getAllManagers();
                setManagers(managersData);
            } catch (error) {
                console.error("Erreur lors de la récupération des managers :", error);
            }
        };
        fetchManagers();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      ) => {
        let { name, value } = e.target;
      
        // Filtre du nom du chantier (autorise lettres, chiffres, espaces, tiret, underscore)
        if (name === "name") {
          value = value.replace(/[^a-zA-Z0-9\s\-_]/g, "");
        }
      
        // Filtre de la description (retire < et >)
        if (name === "description") {
          value = value.replace(/[<>]/g, "");
        }
      
        // Ex. Filtre de l'email
        if (name === "email") {
          value = value.replace(/[^a-zA-Z0-9_\-@.]/g, "");
        }
      
        // Filtre de l'adresse (lettres, chiffres, espaces, virgule)
        if (name === "address") {
          value = value.replace(/[^a-zA-Z0-9\s,]/g, "");
        }
      
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      
      
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        // Filtrage des extensions acceptées
        const allowedExtensions = ["jpg", "jpeg", "png"];
        const extension = file.name.split(".").pop()?.toLowerCase();
    
        if (extension && allowedExtensions.includes(extension)) {
          setImage(file);
        } else {
          alert("Extension non autorisée. Veuillez sélectionner un fichier JPG, JPEG, ou PNG.");
        }
      }
    };
      
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formattedData = {
            ...formData,
            managerId: formData.managerId ? parseInt(formData.managerId, 10) : null,
        };

        const formDataToSend = new FormData();
        Object.entries(formattedData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formDataToSend.append(key, String(value));
            }
        });

        if (image) {
            formDataToSend.append("image", image);
        }
        try {
            await constructionSiteService.create(formDataToSend);
            console.log(" Chantier ajouté avec succès");
            navigate("/");
        } catch (error) {
            console.error("Erreur lors de l'ajout du chantier :", error);
        }
    };

    return (
        <main className="min-h-[calc(100dvh-65px)] p-8 bg-gray-100 flex justify-center">
            <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Ajouter un chantier
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nom du chantier"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                        required
                    ></textarea>
                    <input
                        type="text"
                        name="address"
                        placeholder="Adresse"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                        required
                    />

                    <select
                        name="managerId"
                        value={formData.managerId}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                        required
                    >
                        <option value="">Sélectionner un chef de chantier</option>
                        {managers.map((manager) => (
                            <option key={manager.id} value={manager.id}>
                                {" "}
                                {/* ✅ Assurer que c'est bien l'ID */}
                                {manager.firstname} {manager.lastname}
                            </option>
                        ))}
                    </select>

                    <select
                        name="state"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                    >
                        <option value="En cours">En cours</option>
                        <option value="Terminé">Terminé</option>
                        <option value="En retard">En retard</option>
                    </select>

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full p-3 border rounded"
                            required
                        />
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="w-full p-3 border rounded"
                            required
                        />
                    </div>

                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        className="w-full p-3 border rounded"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
                    >
                        Ajouter
                    </button>
                </form>
            </div>
        </main>
    );
}
