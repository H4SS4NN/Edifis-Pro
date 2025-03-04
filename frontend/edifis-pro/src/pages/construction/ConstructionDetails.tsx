import { useState } from "react";
import { Link } from "react-router-dom";

export default function ConstructionDetails() {
    // données temp pour test l'affichage
    const construction = {
        name: "Chantier Tour Azure",
        state: "En cours",
        description: "Projet de construction d'une tour résidentielle moderne.",
        adresse: "12 rue des Bâtisseurs, Lyon",
        start_date: "2024-03-01",
        end_date: "2024-06-30",
        open_time: "08:00",
        end_time: "17:00",
        date_creation: "2024-02-15",
    };

    const workers = [
        { id: 1, name: "Marc Dupont", role: "Maçon" },
        { id: 2, name: "Sophie Lemoine", role: "Électricienne" },
        { id: 3, name: "Julien Morel", role: "Chef de chantier" },
    ];

    const [hoveredWorker, setHoveredWorker] = useState(null);

    return (
        <main className="min-h-screen p-6 bg-gray-100">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-900">{construction.name}</h1>
                <p className="text-sm text-gray-500">{construction.adresse}</p>
                <span className={
                    `inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${
                        construction.state === "En cours" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`
                }>
                    {construction.state}
                </span>

                <p className="mt-4 text-gray-700">{construction.description}</p>

                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <p><strong>Début :</strong> {construction.start_date}</p>
                        <p><strong>Fin :</strong> {construction.end_date}</p>
                        <p><strong>Horaires :</strong> {construction.open_time} - {construction.end_time}</p>
                        <p><strong>Date de création :</strong> {construction.date_creation}</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Liste des ouvriers</h3>
                        <ul>
                            {workers.map(worker => (
                                <li 
                                    key={worker.id} 
                                    className="p-2 border-b cursor-pointer hover:bg-gray-100"
                                    onMouseEnter={() => setHoveredWorker(worker.id)}
                                    onMouseLeave={() => setHoveredWorker(null)}
                                >
                                    <span className="font-medium">{worker.name}</span> - {worker.role}
                                    {hoveredWorker === worker.id && (
                                        <span className="ml-2 text-xs text-gray-500">(Disponible)</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Link to="/construction" className="mt-6 inline-block text-blue-600 hover:underline">Retour à la liste</Link>
            </div>
        </main>
    );
}
