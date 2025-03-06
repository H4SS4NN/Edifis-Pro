import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import userService, { User } from "../../../services/userService";

import Loading from "../../components/loading/Loading";

// URL d'image par défaut
const DEFAULT_IMAGE = "https://www.capcampus.com/img/u/1/job-etudiant-batiment.jpg";

// Liste des compétences fixes basées sur la BDD
const ALL_SKILLS = [
    { id: 1, name: "Maçonnerie" },
    { id: 2, name: "Électricité" },
    { id: 3, name: "Plomberie" },
    { id: 4, name: "Charpenterie" },
    { id: 5, name: "Peinture en bâtiment" },
    { id: 6, name: "Revêtement de sol" },
    { id: 7, name: "Isolation thermique et acoustique" },
    { id: 8, name: "Menuiserie" },
    { id: 9, name: "Serrurerie" },
    { id: 10, name: "Climatisation et chauffage" },
    { id: 11, name: "Gestion de projet" },
    { id: 12, name: "Coordination des équipes" },
    { id: 13, name: "Lecture de plans" },
    { id: 14, name: "Sécurité sur chantier" },
];

export default function WorkerDetails() {
    const { id } = useParams<{ id: string }>();
    const [worker, setWorker] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorker = async () => {
            try {
                const data = await userService.getById(Number(id));
                setWorker(data);
            } catch (err) {
                setError("Erreur lors du chargement des détails de l'employé.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWorker();
    }, [id]);

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-[calc(100dvh-65px)] w-full p-8">
                <Loading />
            </div>
        );
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!worker)
        return <p className="text-center text-slate-500">Employé non trouvé</p>;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setWorker((prevWorker) =>
            prevWorker ? { ...prevWorker, [e.target.name]: e.target.value } : null
        );
    };
    const handleDelete = async () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
            try {
                await userService.delete(worker!.user_id);
                navigate("/worker");
            } catch (err) {
                console.error("Erreur lors de la suppression :", err);
            }
        }
    };
    const handleSkillChange = (skillId: number) => {
        if (!worker) return;

        const updatedSkills = worker.competences.some(
            (c) => c.competence_id === skillId
        )
            ? worker.competences.filter((c) => c.competence_id !== skillId)
            : [
                ...worker.competences,
                {
                    competence_id: skillId,
                    name: ALL_SKILLS.find((s) => s.id === skillId)?.name || "",
                },
            ];

        setWorker((prevWorker) =>
            prevWorker ? { ...prevWorker, competences: updatedSkills } : null
        );
    };

    const handleSave = async () => {
        try {
            await userService.update(worker!.id, worker!);
            setIsEditing(false);
        } catch (err) {
            console.error("Erreur lors de la sauvegarde :", err);
        }
    };

    return (
        <main className="min-h-[calc(100dvh-65px)] p-8 bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Détails de l'employé
                </h1>

                <div className="flex items-center mb-4">
                    <img
                        src={worker.profile_picture || DEFAULT_IMAGE}
                        alt={worker.firstname}
                        className="w-24 h-24 object-cover rounded-full mr-4"
                    />
                    <div>
                        {isEditing ? (
                            <input
                                type="text"
                                name="firstname"
                                value={worker.firstname}
                                onChange={handleChange}
                                className="text-xl font-semibold text-gray-900 mb-2 border-b border-gray-300"
                            />
                        ) : (
                            <h2 className="text-xl font-semibold text-gray-900">
                                {worker.firstname} {worker.lastname}
                            </h2>
                        )}
                    </div>
                </div>

                <p>
                    <strong>Email : </strong>
                    {isEditing ? (
                        <input
                            type="text"
                            name="email"
                            value={worker.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-1"
                        />
                    ) : (
                        worker.email
                    )}
                </p>

                <p>
                    <strong>Téléphone : </strong>
                    {isEditing ? (
                        <input
                            type="text"
                            name="numberphone"
                            value={worker.numberphone}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-1"
                        />
                    ) : (
                        worker.numberphone || "Non renseigné"
                    )}
                </p>

                <p>
                    <strong>Rôle : </strong>
                    {isEditing ? (
                        <select
                            name="role"
                            value={worker.role}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-1"
                        >
                            <option value="Worker">Ouvrier</option>
                            <option value="Manager">Chef de projet</option>
                        </select>
                    ) : worker.role === "Worker" ? (
                        "Ouvrier"
                    ) : (
                        "Chef de projet"
                    )}
                </p>

                <p>
                    <strong>Compétences :</strong>
                </p>
                {isEditing ? (
                    <div className="grid grid-cols-2 gap-2">
                        {ALL_SKILLS.map((skill) => (
                            <label key={skill.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={worker.competences.some(
                                        (c) => c.competence_id === skill.id
                                    )}
                                    onChange={() => handleSkillChange(skill.id)}
                                    className="mr-2"
                                />
                                {skill.name}
                            </label>
                        ))}
                    </div>
                ) : (
                    <p>
                        {worker.competences.length > 0
                            ? worker.competences.map((c) => c.name).join(", ")
                            : "Non spécifié"}
                    </p>
                )}

                <p>
                    <strong>Date de création :</strong> {worker.createdAt}
                </p>

                <div className="mt-6 flex justify-between">
                    <button
                        onClick={() => {
                            if (isEditing) handleSave();
                            setIsEditing(!isEditing);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        {isEditing ? "Enregistrer" : "Modifier"}
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </main>
    );
}
