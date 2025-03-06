import { useAuth } from "../../context/AuthContext";

import TimelineChart from "../../components/timelineChart/TimelineChart";
import Badge from "../../components/badge/Badge";

interface Task {
    id: number;
    title: string;
    description: string;
    dateStart: string;
    dateEnd: string;
    status: "Prévu" | "En cours" | "Annulé" | "Terminée";
}

const tasks: Task[] = [
    {
        id: 1,
        title: "Installer les échafaudages",
        description: "Installer les échafaudages pour la construction de la maison",
        dateStart: "2025-10-10T03:00:00.000Z",
        dateEnd: "2025-10-15T12:00:00.000Z",
        status: "En cours"
    },
    {
        id: 2,
        title: "Coulage de la dalle",
        description: "Coulage de la dalle de la maison",
        dateStart: "2025-10-16T08:00:00.000Z",
        dateEnd: "2025-10-16T17:00:00.000Z",
        status: "Terminée"
    },
    {
        id: 3,
        title: "Pose des murs",
        description: "Pose des murs de la maison",
        dateStart: "2025-10-21T12:00:00.000Z",
        dateEnd: "2025-10-22T13:00:00.000Z",
        status: "Prévu"
    },
    {
        id: 4,
        title: "Pose de la charpente",
        description: "Pose de la charpente de la maison",
        dateStart: "2025-10-23T08:00:00.000Z",
        dateEnd: "2025-10-23T17:00:00.000Z",
        status: "Annulé",
    }
];

export default function Home() {
    const { user } = useAuth();
    return (
        <main className="grid xl:grid-cols-[7fr_3fr] grid-cols-1 gap-8 xl:max-h-[calc(100dvh-65px)] h-full bg-gray-100 md:p-8 p-4 overflow-hidden">
            <div className="flex flex-col min-h-0">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-slate-950">
                        Bienvenue, {user.firstname} {user.lastname}
                    </h1>
                    <p className="text-sm text-slate-500">
                        {user.role === "Admin"
                            ? "Administrateur"
                            : user.role === "Manager"
                                ? "Chef de projet"
                                : user.role === "worker"
                                    ? "Ouvrier"
                                    : "Rôle inconnu"}
                    </p>
                </div>
                <TimelineChart tasks={tasks} />
            </div>
            <div className="flex flex-col min-h-0 h-full overflow-y-auto space-y-4 scrollbar-thin">
                <h2 className="text-xl font-semibold text-slate-950">Vos missions</h2>
                {tasks.map((task) => (
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                        <div className="flex justify-between items-center flex-wrap mb-2">
                            <h3 className="font-semibold text-slate-900 mr-2">{task.title}</h3>
                            {task.status && <Badge status={task.status} />}
                        </div>
            
                        <p className="text-sm text-slate-700 mb-2">{task.description}</p>
            
                        <div className="my-2 border-b border-slate-200" />

                        {task.dateStart && task.dateEnd && (
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500">
                                    Début → {new Date(task.dateStart).toLocaleDateString()} - {new Date(task.dateStart).toLocaleTimeString()}
                                </span>
                                <span className="text-xs text-slate-500">
                                    Fin → {new Date(task.dateEnd).toLocaleDateString()} à {new Date(task.dateEnd).toLocaleTimeString()}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </main>
    );
}