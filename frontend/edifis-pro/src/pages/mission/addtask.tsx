import { useEffect, useState } from "react";
import taskService from "../../../services/taskService";
import userService from "../../../services/userService";
import constructionService from "../../../services/constructionSiteService"; // Service pour récupérer les chantiers
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function CreateTask() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("En attente");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedConstruction, setSelectedConstruction] = useState<
    number | null
  >(null);

  const [users, setUsers] = useState([]);
  const [constructions, setConstructions] = useState([]);
  const [minStartDate, setMinStartDate] = useState<string>("");
  const [maxEndDate, setMaxEndDate] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let data;
        if (user.role === "Admin") {
          data = await userService.getAllUsers(); // Récupère tous les utilisateurs sauf Admins
        } else if (user.role === "Manager") {
          data = await userService.getAllWorkers(); // Récupère uniquement les ouvriers
        } else {
          setError("Vous n'avez pas accès à cette ressource.");
          return;
        }

        setUsers(data);
      } catch (err) {
        setError("Erreur lors du chargement des utilisateurs.");
      }
    };

    const fetchConstructions = async () => {
      try {
        const data = await constructionService.getAll();
        setConstructions(data);
      } catch (err) {
        setError("Erreur lors du chargement des chantiers.");
      }
    };

    fetchUsers();
    fetchConstructions();
  }, [user]);
  // Fonction pour s'assurer que les dates respectent le format "YYYY-MM-DDTHH:MM"
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return `${dateString}T00:00`; // Ajoute "T00:00" par défaut si l'heure est absente
  };

  const handleConstructionChange = (e) => {
    const selectedId = Number(e.target.value);
    setSelectedConstruction(selectedId);

    const selectedConstructionData = constructions.find(
      (c) => c.construction_site_id === selectedId
    );

    if (selectedConstructionData) {
      // Appliquer la transformation pour que les dates respectent le format requis
      setMinStartDate(formatDateForInput(selectedConstructionData.start_date));
      setMaxEndDate(formatDateForInput(selectedConstructionData.end_date));

      // Réinitialiser les dates de la mission avec un format valide
      setStartDate(formatDateForInput(selectedConstructionData.start_date));
      setEndDate(formatDateForInput(selectedConstructionData.end_date));
    }
  };

  console.log("hello", startDate, endDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Vérifier qu'un chantier est sélectionné
    if (!selectedConstruction) {
      setError("Veuillez sélectionner un chantier.");
      setLoading(false);
      return;
    }

    // Vérification des dates
    if (startDate < minStartDate) {
      setError(`La date de début ne peut pas être avant ${minStartDate}`);
      setLoading(false);
      return;
    }
    if (endDate > maxEndDate) {
      setError(`La date de fin ne peut pas être après ${maxEndDate}`);
      setLoading(false);
      return;
    }
    if (startDate > endDate) {
      setError("La date de début doit être avant la date de fin.");
      setLoading(false);
      return;
    }

    try {
      const newTask = await taskService.create({
        name,
        description,
        status,
        start_date: startDate,
        end_date: endDate,
        construction_site_id: selectedConstruction,
      });

      if (selectedUsers.length > 0) {
        await taskService.assignUsers(newTask.task_id, selectedUsers);
      }

      navigate("/missions");
    } catch (err) {
      setError("Erreur lors de la création de la mission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Créer une Mission
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Nom de la mission :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Statut :</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="En attente">En attente</option>
            <option value="En cours">En cours</option>
            <option value="Terminée">Terminée</option>
          </select>
        </div>

        {/* 📌 Sélection du chantier */}
        <div className="mb-4">
          <label className="block text-gray-700">Chantier :</label>
          <select
            value={selectedConstruction || ""}
            onChange={handleConstructionChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Sélectionnez un chantier</option>
            {constructions.map((construction) => (
              <option
                key={construction.construction_site_id}
                value={construction.construction_site_id}
              >
                {construction.name} - {construction.adresse}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Date et heure de début :
          </label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            min={minStartDate}
            max={maxEndDate}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Date et heure de fin :</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            min={startDate}
            max={maxEndDate}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Assigner des utilisateurs :
          </label>
          <select
            multiple
            value={selectedUsers}
            onChange={(e) =>
              setSelectedUsers(
                Array.from(e.target.selectedOptions, (opt) => Number(opt.value))
              )
            }
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            {users.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.firstname} {user.lastname}
                {user.competences && user.competences.length > 0 && (
                  <> - {user.competences.map((c) => c.name).join(", ")}</>
                )}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Création..." : "Créer la mission"}
        </button>
      </form>
    </main>
  );
}
