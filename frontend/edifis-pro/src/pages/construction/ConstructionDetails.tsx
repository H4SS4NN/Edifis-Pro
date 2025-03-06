import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import constructionSiteService from "../../../services/constructionSiteService";

import Loading from "../../components/loading/Loading";
import Badge from "../../components/badge/Badge";

export default function ConstructionDetails() {
    const { id } = useParams<{ id: string }>();
    const [construction, setConstruction] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConstruction = async () => {
            try {
                const data = await constructionSiteService.getById(Number(id));
                setConstruction(data);
            } catch (err) {
                setError("Erreur lors du chargement du chantier.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchConstruction();
    }, [id]);

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-[calc(100dvh-65px)] w-full p-8">
                <Loading />
            </div>
        );
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!construction)
        return <p className="text-center text-slate-500">Chantier non trouvé</p>;

    return (
        <main className="min-h-[calc(100dvh-65px)] p-8 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900 mr-2">
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={construction.name}
                                onChange={(e) =>
                                    setConstruction({ ...construction, name: e.target.value })
                                }
                                className="border border-gray-300 rounded p-1 w-full"
                            />
                        ) : (
                            construction.name
                        )}
                    </h1>
                    <Badge status={construction.state} />
                    <div className="ml-auto">
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-1 outline-offset-4 disabled:pointer-events-none disabled:opacity-50 bg-slate-200 text-slate-950 hover:bg-slate-300 h-9 py-2 pl-3.5 pr-4 cursor-pointer"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? "Enregistrer" : "Modifier"}
                        </button>
                    </div>
                </div>

                <p className="text-sm text-slate-500">
                    {isEditing ? (
                        <input
                            type="text"
                            name="adresse"
                            value={construction.adresse}
                            onChange={(e) =>
                                setConstruction({ ...construction, adresse: e.target.value })
                            }
                            className="border border-gray-300 rounded p-1 w-full"
                        />
                    ) : (
                        construction.adresse
                    )}
                </p>

                <p className="mt-4 text-gray-700">
                    {isEditing ? (
                        <textarea
                            name="description"
                            value={construction.description}
                            onChange={(e) =>
                                setConstruction({
                                    ...construction,
                                    description: e.target.value,
                                })
                            }
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    ) : (
                        construction.description
                    )}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <p>
                            <strong>Début :</strong>{" "}
                            {isEditing ? (
                                <input
                                    type="date"
                                    name="start_date"
                                    value={construction.start_date}
                                    onChange={(e) =>
                                        setConstruction({
                                            ...construction,
                                            start_date: e.target.value,
                                        })
                                    }
                                    className="border border-gray-300 rounded p-1"
                                />
                            ) : (
                                construction.start_date
                            )}
                        </p>
                        <p>
                            <strong>Fin :</strong>{" "}
                            {isEditing ? (
                                <input
                                    type="date"
                                    name="end_date"
                                    value={construction.end_date}
                                    onChange={(e) =>
                                        setConstruction({
                                            ...construction,
                                            end_date: e.target.value,
                                        })
                                    }
                                    className="border border-gray-300 rounded p-1"
                                />
                            ) : (
                                construction.end_date
                            )}
                        </p>
                        <p>
                            <strong>Horaires :</strong>{" "}
                            {isEditing ? (
                                <>
                                    <input
                                        type="time"
                                        name="open_time"
                                        value={construction.open_time}
                                        onChange={(e) =>
                                            setConstruction({
                                                ...construction,
                                                open_time: e.target.value,
                                            })
                                        }
                                        className="border border-gray-300 rounded p-1"
                                    />{" "}
                                    -{" "}
                                    <input
                                        type="time"
                                        name="end_time"
                                        value={construction.end_time}
                                        onChange={(e) =>
                                            setConstruction({
                                                ...construction,
                                                end_time: e.target.value,
                                            })
                                        }
                                        className="border border-gray-300 rounded p-1"
                                    />
                                </>
                            ) : (
                                `${construction.open_time} - ${construction.end_time}`
                            )}
                        </p>
                        <p>
                            <strong>Chef de projet :</strong>{" "}
                            {construction.chefDeProjet
                                ? `${construction.chefDeProjet.firstname} ${construction.chefDeProjet.lastname}`
                                : "Non spécifié"}
                        </p>
                        <p>
                            <strong>Email :</strong>{" "}
                            {construction.chefDeProjet?.email || "Non spécifié"}
                        </p>
                        <p>
                            <strong>Date de création :</strong>{" "}
                            {construction.date_creation || "Non spécifiée"}
                        </p>
                    </div>
                </div>

                <Link
                    to="/construction"
                    className="mt-6 inline-block text-blue-600 hover:underline"
                >
                    Retour à la liste
                </Link>
            </div>
        </main>
    );
}
