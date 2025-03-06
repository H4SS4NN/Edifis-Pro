import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import constructionSiteService, {
    ConstructionSite,
} from "../../../services/constructionSiteService";

import Loading from "../../components/loading/Loading";

export default function Home() {
    const [projects, setProjects] = useState<ConstructionSite[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchConstructionSites = async () => {
            try {
                const data = await constructionSiteService.getAll();

                console.log("Data:", data);
                const formattedData = data.map((site) => ({
                    id: site.construction_site_id,
                    name: site.name,
                    description: site.description,
                    site: site.adresse,
                    address: site.adresse,
                    manager: site.chefDeProjet ? site.chefDeProjet.firstname : "Inconnu",
                    status: site.state,
                    startDate: site.start_date,
                    endDate: site.end_date,
                    image:
                        site.image_url ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSANsddCLc_2TYdgSqBQVFNutn0FvR6qB7BQg&s", // Image par défaut
                }));

                setProjects(formattedData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchConstructionSites();
    }, []);

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-[calc(100dvh-65px)] w-full p-8">
                <Loading />
            </div>
        );
    if (error)
        return <p className="text-center text-red-500">Erreur : {error}</p>;

    return (
        <main className="min-h-[calc(100dvh-65px)] p-8 bg-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-900">Chantiers</h1>
                <Link
                    to="/AddConstruction"
                    className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Ajouter
                </Link>
            </div>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
                    >
                        <img
                            className="w-full h-48 object-cover"
                            src={project.image}
                            alt={project.name}
                        />
                        <div className="p-5">
                            <h5 className="text-2xl font-bold text-gray-900 mb-2">
                                {project.name}
                            </h5>
                            <p className="text-gray-700 mb-3">{project.description}</p>
                            <p className="text-sm text-gray-600">
                                <strong>🏠 Adresse :</strong> {project.address}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>👷 Chef de chantier :</strong> {project.manager}
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>🚩 Status :</strong>{" "}
                                <span
                                    className={
                                        project.status === "En retard"
                                            ? "text-red-500 font-bold"
                                            : "text-green-600 font-bold"
                                    }
                                >
                                    {project.status}
                                </span>
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>📅 Début :</strong> {project.startDate}
                            </p>
                            <p className="text-sm text-gray-600 mb-4">
                                <strong>⏳ Fin :</strong> {project.endDate}
                            </p>
                            <Link
                                to={`/ConstructionDetails/${project.id}`}
                                className="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 mt-auto transition"
                            >
                                Voir plus
                                <svg
                                    className="w-4 h-4 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
