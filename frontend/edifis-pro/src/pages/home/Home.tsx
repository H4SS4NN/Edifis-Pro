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
                    <div
                        key={task.id}
                        className="bg-white border border-slate-200 rounded-lg p-4"
                    >
                        <div className="flex justify-between items-center flex-wrap mb-2">
                            <h3 className="font-semibold mr-2">
                                {task.title}
                            </h3>
                            <Badge status={task.status} />
                        </div>
                        <p className="text-sm mb-2">{task.description}</p>
                        <span className="text-xs text-slate-500 leading-none">
                            Du {new Date(task.dateStart).toLocaleDateString()} au {new Date(task.dateEnd).toLocaleDateString()}
                        </span>
                    </div>
                ))}
            </div>
        </main>
    );
}
