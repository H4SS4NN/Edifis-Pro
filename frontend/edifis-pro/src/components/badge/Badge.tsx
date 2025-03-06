import { Check, Loader2, CalendarClock } from "lucide-react";

interface BadgeProps {
    status: "done" | "pending" | "upcoming";
}

export default function Badge({ status }: BadgeProps) {
    const statusConfig = {
        done: {
            text: "Terminée",
            icon: <Check size={12} />,
            colorClass: "text-green-900 bg-green-100",
        },
        pending: {
            text: "En cours",
            icon: <Loader2 size={12} className="animate-spin" />,
            colorClass: "text-yellow-900 bg-yellow-100",
        },
        upcoming: {
            text: "À venir",
            icon: <CalendarClock size={12} />,
            colorClass: "text-blue-900 bg-blue-100",
        },
    };

    const { text, icon, colorClass } = statusConfig[status];

    return (
        <span
            className={`inline-flex items-center gap-1.5 h-6 text-xs font-semibold whitespace-nowrap px-2 rounded-md border border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${colorClass}`}
        >
            {icon}
            {text}
        </span>
    );
}