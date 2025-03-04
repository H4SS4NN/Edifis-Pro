import { useState } from "react";
import { Link } from "react-router-dom";

interface Worker {
    name: string;
    skills: string;
    phone: string;
    email: string;
    status: "updated" | "pending";
}

const workers: Worker[] = [
    { name: "Jane Cooper", skills: "Assidu, meilleur", phone: "06 73 43 11 27", email: "jane@microsoft.com", status: "updated" },
    { name: "Floyd Miles", skills: "Sympa", phone: "07 77 45 53 23", email: "floyd@yahoo.com", status: "pending" },
    { name: "Ronald Richards", skills: "Pointilleux", phone: "06 00 89 28 38", email: "ronald@adobe.com", status: "pending" },
    { name: "Marvin McKinney", skills: "Sympa", phone: "07 67 87 23 41", email: "marvin@tesla.com", status: "updated" },
];

export default function Workers() {
    const [filter, setFilter] = useState("all");

    const filteredWorkers = workers.filter(worker => 
        filter === "all" || (filter === "updated" && worker.status === "updated") || (filter === "pending" && worker.status === "pending")
    );

    return (
        <main className="min-h-[calc(100dvh-65px)] md:p-8 p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-slate-950">Ouvriers</h1>
                <Link to="/AddWorker" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Ajouter</Link>
            </div>

            <div className="mb-4">
                <select 
                    className="border px-3 py-2 rounded-md" 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">Tous</option>
                    <option value="updated">Mis à jour</option>
                    <option value="pending">En attente</option>
                </select>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3">Nom</th>
                            <th className="p-3">Compétences</th>
                            <th className="p-3">Téléphone</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Mot de passe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWorkers.map((worker, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-3">{worker.name}</td>
                                <td className="p-3">{worker.skills}</td>
                                <td className="p-3">{worker.phone}</td>
                                <td className="p-3">{worker.email}</td>
                                <td className="p-3">
                                    <span 
                                        className={`px-3 py-1 rounded-md text-sm ${worker.status === "updated" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
                                    >
                                        {worker.status === "updated" ? "Mis à jour" : "En attente..."}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
