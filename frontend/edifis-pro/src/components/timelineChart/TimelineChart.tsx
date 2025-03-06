import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Task {
    id: number;
    title: string;
    description: string;
    dateStart: string;
    dateEnd: string;
    status: string;
}

interface TaskData {
    date: string;
    startHour: number;
    endHour: number;
    title: string;
    dateStart: string;
    dateEnd: string;
    status: string;
}

const generateTaskData = (tasks: Task[]): TaskData[] => {
    const result: TaskData[] = [];
    tasks.forEach(task => {
        const startDate = new Date(task.dateStart);
        const endDate = new Date(task.dateEnd);
        
        for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
            result.push({
                date: day.toISOString().split('T')[0], // Date au format YYYY-MM-DD
                startHour: startDate.getUTCHours(),
                endHour: endDate.getUTCHours(),
                title: task.title,
                dateStart: task.dateStart,
                dateEnd: task.dateEnd,
                status: task.status
            });
        }
    });
    return result;
};

const tasks: Task[] = [
    {
        id: 1,
        title: "Installer les échafaudages",
        description: "Installer les échafaudages pour la construction de la maison",
        dateStart: "2025-10-10T03:00:00.000Z",
        dateEnd: "2025-10-15T12:00:00.000Z",
        status: "upcoming"
    },
    {
        id: 2,
        title: "Coulage de la dalle",
        description: "Coulage de la dalle de la maison",
        dateStart: "2025-10-16T08:00:00.000Z",
        dateEnd: "2025-10-16T17:00:00.000Z",
        status: "pending"
    },
    {
        id: 3,
        title: "Pose des murs",
        description: "Pose des murs de la maison",
        dateStart: "2025-10-21T12:00:00.000Z",
        dateEnd: "2025-10-22T13:00:00.000Z",
        status: "done"
    }
];

const data: TaskData[] = generateTaskData(tasks);

interface CustomTooltipProps {
    active: boolean;
    payload: { payload: TaskData }[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const { title, dateStart, dateEnd, status } = payload[0].payload; 
        return (
            <div className="custom-tooltip bg-white p-3 rounded-md border border-slate-200 shadow-md">
                <p className="text-slate-950 text-sm font-bold">{title}</p>
                <p className="text-slate-950 text-xs">{`Date de début: ${new Date(dateStart).toLocaleString()}`}</p>
                <p className="text-slate-950 text-xs">{`Date de fin: ${new Date(dateEnd).toLocaleString()}`}</p>
                <p className="text-slate-950 text-xs">{`Statut: ${status}`}</p>
            </div>
        );
    }
    return null;
};

export default function TimelineChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#dddddd" />
                <XAxis dataKey="date" stroke="#333" />  {/* Changer la couleur des axes */}
                <YAxis tickFormatter={(value) => `${value}:00`} stroke="#333" />
                <Tooltip content={<CustomTooltip />} />

                <Bar dataKey="startHour" stackId="a" fill="transparent" />
                <Bar dataKey="endHour" stackId="a" fill="#fd8d3c" />
            </BarChart>
        </ResponsiveContainer>
    );
}
