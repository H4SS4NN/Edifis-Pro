import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import taskService, { Task } from "../../../services/taskService";
import userService, { User } from "../../../services/userService";
import constructionService, { ConstructionSite } from "../../../services/constructionSiteService";

// Petite fonction utilitaire pour transformer une date ISO en format "YYYY-MM-DDTHH:MM"
function toDateTimeLocal(isoString?: string): string {
  if (!isoString) return "";
  const date = new Date(isoString);
  // .slice(0,16) pour avoir "YYYY-MM-DDTHH:MM"
  return date.toISOString().slice(0, 16);
}

export default function EditTask() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("En attente");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedConstruction, setSelectedConstruction] = useState<number | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [constructions, setConstructions] = useState<ConstructionSite[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task: Task = await taskService.getById(Number(id));
        setName(task.name || "");
        setDescription(task.description || "");
        setStatus(task.status || "En attente");
        
        // Conversion de la date ISO (ex: "2025-03-19T16:18:15.000Z") vers "YYYY-MM-DDTHH:MM"
        setStartDate(toDateTimeLocal(task.start_date));
        setEndDate(toDateTimeLocal(task.end_date));

        setSelectedConstruction(task.construction_site_id || null);
        setSelectedUsers(task.users.map((u) => u.user_id));
      } catch {
        setError("Erreur lors du chargement de la mission.");
      }
    };

    const fetchUsersAndConstructions = async () => {
      try {
        const [usersData, constructionsData] = await Promise.all([
          userService.getAllUsers(),
          constructionService.getAll(),
        ]);
        setUsers(usersData);
        setConstructions(constructionsData);
      } catch {
        setError("Erreur lors du chargement des données.");
      }
    };

    fetchTask();
    fetchUsersAndConstructions();
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!selectedConstruction) {
        setError("Veuillez sélectionner un chantier.");
        setLoading(false);
        return;
      }

      await taskService.update(Number(id), {
        name,
        description,
        status,
        start_date: startDate,
        end_date: endDate,
        construction_site_id: selectedConstruction,
      });

      if (selectedUsers.length > 0) {
        await taskService.assignUsers(Number(id), selectedUsers);
      }

      navigate("/missions");
    } catch {
      setError("Erreur lors de la mise à jour de la mission.");
    } finally {
      setLoading(false);
    }
  };

  const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, (opt) => Number(opt.value));
    setSelectedUsers(values);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Modifier la Mission</h1>
      {error && <p className="text-red-500">{error}</p>}
      
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Nom :</label>
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
          />
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

        <div className="mb-4">
          <label className="block text-gray-700">Chantier :</label>
          <select
            value={selectedConstruction || ""}
            onChange={(e) => setSelectedConstruction(Number(e.target.value))}
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

        {/* Remplacement de type="date" par type="datetime-local" */}
        <div className="mb-4">
          <label className="block text-gray-700">Date et heure de début :</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
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
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Assigner des utilisateurs :</label>
          <select 
            multiple 
            value={selectedUsers}
            onChange={handleUserChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            {users.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.firstname} {user.lastname}
                {user.competences && user.competences.length > 0 && (
                  <> - {user.competences.map(c => c.name).join(", ")}</>
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
          {loading ? "Mise à jour..." : "Modifier la mission"}
        </button>
      </form>
    </main>
  );
}
