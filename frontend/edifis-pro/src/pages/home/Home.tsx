import LineChart from "../../components/lineChart/LineChart";

import { useAuth } from "../../context/AuthContext";

interface Task {
  id: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd?: string;
  status: "todo" | "done";
}
// Chantier BTP ouvrier
const tasks: Task[] = [
  {
    id: 1,
    title: "Installer les échafaudages",
    description: "Installer les échafaudages pour la construction de la maison",
    dateStart: "2022-10-10",
    dateEnd: "2022-10-15",
    status: "todo",
  },
  {
    id: 2,
    title: "Coulage de la dalle",
    description: "Coulage de la dalle de la maison",
    dateStart: "2022-10-16",
    dateEnd: "2022-10-20",
    status: "todo",
  },
  {
    id: 3,
    title: "Pose des murs",
    description: "Pose des murs de la maison",
    dateStart: "2022-10-21",
    dateEnd: "2022-10-25",
    status: "done",
  },
  {
    id: 4,
    title: "Pose des fenêtres",
    description: "Pose des fenêtres de la maison",
    dateStart: "2022-10-26",
    dateEnd: "2022-10-30",
    status: "done",
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
          <LineChart />
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
