import { useAuth } from "../../context/AuthContext";

import Badge from "../../components/badge/Badge";
import TimelineChart from "../../components/timelineChart/TimelineChart";

interface Task {
  id: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  status: "done" | "pending" | "upcoming";
}
// Chantier BTP ouvrier
const tasks: Task[] = [
  {
    id: 1,
    title: "Installer les échafaudages",
    description: "Installer les échafaudages pour la construction de la maison",
    dateStart: "2025-10-10T08:00:00.000Z",
    dateEnd: "2025-10-15T17:00:00.000Z",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Coulage de la dalle",
    description: "Coulage de la dalle de la maison",
    dateStart: "2025-10-16T08:00:00.000Z",
    dateEnd: "2025-10-20T17:00:00.000Z",
    status: "pending",
  },
  {
    id: 3,
    title: "Pose des murs",
    description: "Pose des murs de la maison",
    dateStart: "2025-10-21T08:00:00.000Z",
    dateEnd: "2025-10-25T17:00:00.000Z",
    status: "done",
  },
  {
    id: 4,
    title: "Pose des fenêtres",
    description: "Pose des fenêtres de la maison",
    dateStart: "2025-10-26T08:00:00.000Z",
    dateEnd: "2025-10-30T17:00:00.000Z",
    status: "done",
  },
  {
    id: 5,
    title: "Pose des tuiles",
    description: "Pose des tuiles de la maison",
    dateStart: "2025-11-01T08:00:00.000Z",
    dateEnd: "2025-11-05T17:00:00.000Z",
    status: "pending",
  },
  {
    id: 6,
    title: "Pose des portes",
    description: "Pose des portes de la maison",
    dateStart: "2025-11-06T08:00:00.000Z",
    dateEnd: "2025-11-10T17:00:00.000Z",
    status: "pending",
  },
  {
    id: 7,
    title: "Finitions",
    description: "Finitions de la maison",
    dateStart: "2025-11-11T08:00:00.000Z",
    dateEnd: "2025-11-15T17:00:00.000Z",
    status: "pending",
  },
  {
    id: 8,
    title: "Nettoyage",
    description: "Nettoyage du chantier",
    dateStart: "2025-11-16T08:00:00.000Z",
    dateEnd: "2025-11-20T17:00:00.000Z",
    status: "pending",
  },
  {
    id: 9,
    title: "Livraison",
    description: "Livraison de la maison",
    dateStart: "2025-11-21T08:00:00.000Z",
    dateEnd: "2025-11-25T17:00:00.000Z",
    status: "pending",
  },
  {
    id: 10,
    title: "Fin",
    description: "Fin du chantier",
    dateStart: "2025-11-26T08:00:00.000Z",
    dateEnd: "2025-11-30T17:00:00.000Z",
    status: "pending",
  },
];

export default function Home() {
  const { user } = useAuth();
  return (
    <main className="min-h-[calc(100dvh-65px)] bg-gray-100 md:p-8 p-4">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-950">
          Bienvenue, {user.firstname} {user.lastname}
        </h1>
        <h2 className="text-2xl font-semibold text-slate-950">
          {user.role === "Admin"
            ? "Administrateur"
            : user.role === "Manager"
            ? "Chef de projet"
            : "Ouvrier"}
        </h2>
        <p className="text-sm text-slate-500">
          Voici un aperçu de votre tableau de bord
        </p>
      </div>
      <div className="grid grid-cols-[7fr_3fr] gap-4">
        <div className="h-full w-full">
          <TimelineChart tasks={tasks} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-950 mb-2">
            Vos missions
          </h2>
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white border border-slate-200 rounded-lg p-4 mb-4"
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">
                  {task.title}
                  <span
                    className={`${
                      task.status === "done"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-orange-800"
                    } inline-flex items-center gap-1.5 h-6 text-xs text-emerald-400 bg-emerald-950 hover:bg-primary/80 font-semibold px-2 rounded-md border border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ml-2`}
                  >
                    {task.status === "done" ? "Terminée" : "En cours"}
                  </span>
                </h3>
                <span className="text-xs text-slate-500">
                  {task.dateStart} - {task.dateEnd}
                </span>
              </div>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
