import { useState } from "react";
import { Link } from "react-router-dom";

interface Worker {
    name: string;
    skills: string;
    phone: string;
    email: string;
    status: "updated" | "pending";
    image?: string;
}

const workers: Worker[] = [
    { name: "Jane Cooper", skills: "Assidu, meilleur", phone: "06 73 43 11 27", email: "jane@microsoft.com", status: "updated", image: "https://f.hellowork.com/obs-static-images/seo/ObsJob/ouvrier-voiries-et-reseaux-divers.jpg" },
    { name: "Floyd Miles", skills: "Sympa", phone: "07 77 45 53 23", email: "floyd@yahoo.com", status: "pending", image: "https://www.capcampus.com/img/u/1/job-etudiant-batiment.jpg" },
    { name: "Ronald Richards", skills: "Pointilleux", phone: "06 00 89 28 38", email: "ronald@adobe.com", status: "pending", image: "https://plus.unsplash.com/premium_photo-1664301171216-9e0e0cd8d103?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Marvin McKinney", skills: "Sympa", phone: "07 67 87 23 41", email: "marvin@tesla.com", status: "updated", image: "https://www.meilleur-audio.fr/wp-content/uploads/2019/08/Ouvrier-et-audition.png" },
];

export default function Workers() {
    const [filter, setFilter] = useState("all");

    const filteredWorkers = workers.filter(worker => 
        filter === "all" || (filter === "updated" && worker.status === "updated") || (filter === "pending" && worker.status === "pending")
    );

    return (
        <main className="min-h-screen p-8 bg-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-900">Employés</h1>
                <Link to="/AddWorker" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Ajouter</Link>
            </div>

            <div className="mb-4">
                <select 
                    className="border px-3 py-2 rounded-md" 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">Tous</option>
                    <option value="updated">Disponible</option>
                    <option value="pending">Occupé</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {filteredWorkers.map((worker, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center hover:scale-105">
                        <img 
                            src={worker.image} 
                            alt={worker.name} 
                            className="w-100% h-100% object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-lg font-semibold text-gray-900">{worker.name}</h2>
                        <p className="text-sm text-gray-600">{worker.skills}</p>
                        <p className="text-sm text-gray-500">{worker.phone}</p>
                        <p className="text-sm text-gray-500">{worker.email}</p>
                        <span className={`mt-2 px-3 py-1 rounded-md text-sm ${worker.status === "updated" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                            {worker.status === "updated" ? "Disponible" : "Occupé"}
                        </span>
                    </div>
                ))}
            </div>
        </main>
    );
}
