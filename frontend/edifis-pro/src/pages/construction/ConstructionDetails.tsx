import { useState } from "react";
import { Link } from "react-router-dom";

export default function ConstructionDetails() {
    const [isEditing, setIsEditing] = useState(false);
    const [construction, setConstruction] = useState({
        name: "Chantier Tour Azure",
        state: "En cours",
        description: "Projet de construction d'une tour résidentielle moderne.",
        adresse: "12 rue des Bâtisseurs, Lyon",
        start_date: "2024-03-01",
        end_date: "2024-06-30",
        open_time: "08:00",
        end_time: "17:00",
        date_creation: "2024-02-15",
    });

    const availableWorkers = [
        { id: 1, name: "Marc Dupont", role: "Maçon" },
        { id: 2, name: "Sophie Lemoine", role: "Électricienne" },
        { id: 3, name: "Julien Morel", role: "Chef de chantier" },
        { id: 4, name: "Emma Durand", role: "Plombière" },
        { id: 5, name: "Paul Martin", role: "Peintre" }
    ];

    const [workers, setWorkers] = useState([
        { id: 1, name: "Marc Dupont", role: "Maçon" },
        { id: 2, name: "Sophie Lemoine", role: "Électricienne" },
        { id: 3, name: "Julien Morel", role: "Chef de chantier" },
    ]);
    
    const [hoveredWorker, setHoveredWorker] = useState(null);
    const [selectedWorkerId, setSelectedWorkerId] = useState("");

    const handleChange = (e) => {
        setConstruction({ ...construction, [e.target.name]: e.target.value });
    };

    const handleAddWorker = () => {
        if (selectedWorkerId) {
            const workerToAdd = availableWorkers.find(worker => worker.id === parseInt(selectedWorkerId));
            if (workerToAdd && !workers.some(worker => worker.id === workerToAdd.id)) {
                setWorkers([...workers, workerToAdd]);
                setSelectedWorkerId("");
            }
        }
    };

    const handleRemoveWorker = (id) => {
        setWorkers(workers.filter(worker => worker.id !== id));
    };

    return (
        <main className="min-h-screen p-6 bg-gray-100">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {isEditing ? (
                            <input 
                                type="text" 
                                name="name" 
                                value={construction.name} 
                                onChange={handleChange} 
                                className="border border-gray-300 rounded p-1 w-full"
                            />
                        ) : (
                            construction.name
                        )}
                    </h1>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        {isEditing ? "Enregistrer" : "Modifier"}
                    </button>
                </div>
                
                <p className="text-sm text-gray-500">
                    {isEditing ? (
                        <input 
                            type="text" 
                            name="adresse" 
                            value={construction.adresse} 
                            onChange={handleChange} 
                            className="border border-gray-300 rounded p-1 w-full"
                        />
                    ) : (
                        construction.adresse
                    )}
                </p>

                <span className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${construction.state === "En cours" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {construction.state}
                </span>

                <p className="mt-4 text-gray-700">
                    {isEditing ? (
                        <textarea 
                            name="description" 
                            value={construction.description} 
                            onChange={handleChange} 
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    ) : (
                        construction.description
                    )}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <p><strong>Début :</strong> {isEditing ? <input type="date" name="start_date" value={construction.start_date} onChange={handleChange} className="border border-gray-300 rounded p-1" /> : construction.start_date}</p>
                        <p><strong>Fin :</strong> {isEditing ? <input type="date" name="end_date" value={construction.end_date} onChange={handleChange} className="border border-gray-300 rounded p-1" /> : construction.end_date}</p>
                        <p><strong>Horaires :</strong> {isEditing ? <><input type="time" name="open_time" value={construction.open_time} onChange={handleChange} className="border border-gray-300 rounded p-1" /> - <input type="time" name="end_time" value={construction.end_time} onChange={handleChange} className="border border-gray-300 rounded p-1" /></> : `${construction.open_time} - ${construction.end_time}`}</p>
                        <p><strong>Date de création :</strong> {construction.date_creation}</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Liste des ouvriers</h3>
                        <ul>
                            {workers.map(worker => (
                                <li 
                                    key={worker.id} 
                                    className="p-2 border-b cursor-pointer flex justify-between items-center hover:bg-gray-100"
                                    onMouseEnter={() => setHoveredWorker(worker.id)}
                                    onMouseLeave={() => setHoveredWorker(null)}
                                >
                                    <span>
                                        <span className="font-medium">{worker.name}</span> - {worker.role}
                                    </span>
                                    {isEditing && <button onClick={() => handleRemoveWorker(worker.id)} className="text-red-500 text-xs">❌</button>}
                                </li>
                            ))}
                        </ul>
                        {isEditing && (
                            <div className="mt-4">
                                <select 
                                    value={selectedWorkerId} 
                                    onChange={(e) => setSelectedWorkerId(e.target.value)}
                                    className="border border-gray-300 rounded p-1 mr-2"
                                >
                                    <option value="">Sélectionner un ouvrier</option>
                                    {availableWorkers.map(worker => (
                                        <option key={worker.id} value={worker.id}>{worker.name} - {worker.role}</option>
                                    ))}
                                </select>
                                <button onClick={handleAddWorker} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Ajouter</button>
                            </div>
                        )}
                    </div>
                </div>
                <Link to="/construction" className="mt-6 inline-block text-blue-600 hover:underline">Retour à la liste</Link>
            </div>
        </main>
    );
}
