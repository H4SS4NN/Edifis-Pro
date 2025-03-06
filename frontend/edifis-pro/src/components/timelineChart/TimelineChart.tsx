import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
        
        for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
            result.push({
                date: day.toISOString().split('T')[0], // Format YYYY-MM-DD
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

interface TimelineChartProps {
    tasks: Task[];
}

export default function TimelineChart({ tasks }: TimelineChartProps) {
    const data = generateTaskData(tasks);

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
                <XAxis dataKey="date" stroke="#333" />
                <YAxis tickFormatter={(value) => `${value}:00`} stroke="#333" />
                <Tooltip content={<CustomTooltip />} />

                <Bar dataKey="startHour" stackId="a" fill="transparent" />
                <Bar dataKey="endHour" stackId="a" fill="#fd8d3c" />
            </BarChart>
        </ResponsiveContainer>
    );
}