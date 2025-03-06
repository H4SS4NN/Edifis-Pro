import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import taskService, { Task } from "../../../services/taskService";
import { useAuth } from "../../context/AuthContext";

export default function Missions() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let data;
        if (user.role === "Admin") {
          data = await taskService.getAll();
        } else {
          data = await taskService.getByUserId(user.user_id);
        }

        setTasks(data);
        setFilteredTasks(data);
      } catch (err) {
        setError("Erreur lors du chargement des missions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  useEffect(() => {
    const results = tasks.filter(
      (task) =>
        task.name.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTasks(results);
  }, [search, tasks]);

  if (loading)
    return <p className="text-center text-gray-500">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">Missions</h1>
        {(user.role === "Admin" || user.role === "Manager") && (
          <Link
            to="/addamission"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm"
          >
            Ajouter une mission
          </Link>
        )}
      </div>

      {tasks.length === 0 && (
        <p className="text-center text-gray-500">Aucune mission trouvée.</p>
      )}

      <input
        type="text"
        placeholder="Rechercher une mission..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-2 w-full border border-gray-300 rounded-lg shadow-sm"
      />

      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">
            Aucune mission correspondante.
          </p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.task_id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 relative"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {task.name}
              </h2>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-sm text-gray-600 mt-2"></p>
              <p className="text-sm text-gray-600">
                <strong>📅 Début :</strong>{" "}
                {task.start_date
                  ? new Date(task.start_date).toLocaleString()
                  : "Non défini"}
              </p>
              <p className="text-sm text-gray-600"></p>
              <strong>⏳ Fin :</strong>{" "}
              {task.end_date
                ? new Date(task.end_date).toLocaleString()
                : "Non défini"}
              <p
                className={`text-sm font-bold mt-2 ${
                  task.status === "En cours"
                    ? "text-yellow-600"
                    : task.status === "Terminée"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <strong>Status :</strong> {task.status}
              </p>
              {/* Affichage des utilisateurs assignés */}
              <div className="mt-4">
                <strong className="text-gray-800">👥 Assigné à :</strong>
                {task.users.length === 0 ? (
                  <p className="text-gray-600">Aucun assigné</p>
                ) : task.users.length === 1 ? (
                  <p className="text-gray-800">
                    {task.users[0].firstname} {task.users[0].lastname}
                  </p>
                ) : (
                  <ul className="text-gray-800">
                    {task.users.map((user) => (
                      <li key={user.user_id}>
                        - {user.firstname} {user.lastname}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Bouton Modifier */}
              {(user.role === "Admin" || user.role === "Manager") && (
                <Link
                  to={`/editmission/${task.task_id}`}
                  className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                >
                  Modifier
                </Link>
              )}
              {/* Bouton Supprimer */}
              {(user.role === "Admin" || user.role === "Manager") && (
                <button
                  onClick={async () => {
                    if (
                      window.confirm("Êtes-vous sûr de vouloir supprimer ?")
                    ) {
                      try {
                        await taskService.delete(task.task_id);
                        setTasks((prev) =>
                          prev.filter((t) => t.task_id !== task.task_id)
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    }
                  }}
                  className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                >
                  Supprimer
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
}
