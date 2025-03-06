import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import constructionSiteService from "../../../services/constructionSiteService";
import userService, { User } from "../../../services/userService";

export default function AddConstruction() {
  const navigate = useNavigate();
  const [managers, setManagers] = useState<User[]>([]);
  const [image, setImage] = useState<File | null>(null);

  // Correspond aux colonnes de la BDD : name, state, description, adresse, start_date, end_date
  // Le manager est transmis via managerId (qui correspond au chef_de_projet_id côté back)
  const [formData, setFormData] = useState({
    name: "",
    state: "En cours",
    description: "",
    adresse: "",
    managerId: "",
    start_date: "",
    end_date: "",
  });

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const managerIdNum = formData.managerId
        ? parseInt(formData.managerId, 10)
        : 0;

      await constructionSiteService.create(
        {
          name: formData.name,
          state: formData.state,
          description: formData.description,
          adresse: formData.adresse,
          managerId: managerIdNum,
          startDate: formData.start_date,
          endDate: formData.end_date,
          image_url: undefined,
        },
        image ?? undefined
      );

      console.log("Chantier ajouté avec succès");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de l'ajout du chantier :", error);
    }
  };

  return (
    <main className="min-h-[calc(100dvh-65px)] p-8 bg-gray-100 flex justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Ajouter un chantier</h1>
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
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          >
            <option value="En cours">En cours</option>
            <option value="Terminé">Terminé</option>
            <option value="Annulé">Annulé</option>
            <option value="Prevu">Prevu</option>
          </select>
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
            name="adresse"
            placeholder="Adresse"
            value={formData.adresse}
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
              <option key={manager.user_id} value={manager.user_id.toString()}>
                {manager.firstname} {manager.lastname}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="start_date"
              placeholder="Début"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            />
            <input
              type="date"
              name="end_date"
              placeholder="Fin"
              value={formData.end_date}
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
