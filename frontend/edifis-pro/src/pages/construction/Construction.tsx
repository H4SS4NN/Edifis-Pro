import { Link } from "react-router-dom";

export default function Home() {
    const projects = [
        {
            name: "Excavation et pose des fondations",
            description: "Creuser et préparer le terrain pour couler les fondations en béton.",
            site: "Chantier Tour Azure",
            address: "12 rue des Bâtisseurs, Lyon",
            manager: "Jean Dupont",
            status: "En cours",
            startDate: "2024-03-01",
            endDate: "2024-06-30",
            image: "https://batiadvisor.fr/wp-content/uploads/2020/07/imprevus-chantier.jpg"
        },
        {
            name: "Assemblage et installation de la charpente",
            description: "Monter et fixer la charpente en bois ou en métal selon le plan.",
            site: "Projet Éco-Village",
            address: "45 avenue des Artisans, Marseille",
            manager: "Pierre Morel",
            status: "En cours",
            startDate: "2024-02-20",
            endDate: "2024-05-15",
            image: "https://img.centrefrance.com/1Mox6-5o3cmt7N89GZvF7bzCWG35KxepDkzzyhX5ZqQ/rs:fit:657:438:1:0/bG9jYWw6Ly8vMDAvMDAvMDcvMzIvMTUvMjAwMDAwNzMyMTUzNQ.webp"
        },
        {
            name: "Peinture intérieure des appartements",
            description: "Appliquer une première couche d’enduit, puis peindre les murs.",
            site: "Résidence Soleil",
            address: "78 boulevard du BTP, Toulouse",
            manager: "Sophie Lambert",
            status: "En retard",
            startDate: "2024-01-10",
            endDate: "2024-03-15",
            image: "https://media.lesechos.com/api/v1/images/view/60128e7ad286c235d16c6ee6/1280x720/061364255283-web-tete.jpg"
        },
    ];

    return (
        <main className="min-h-screen p-8 bg-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-900">Chantiers</h1>
                <Link to="/AddConstruction" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Ajouter</Link>
            </div>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                {projects.map((project, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                        <img className="w-full h-48 object-cover" src={project.image} alt={project.name} />
                        <div className="p-5">
                            <h5 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h5>
                            <p className="text-gray-700 mb-3">{project.description}</p>
                            <p className="text-sm text-gray-600"><strong>📍 Site :</strong> {project.site}</p>
                            <p className="text-sm text-gray-600"><strong>🏠 Adresse :</strong> {project.address}</p>
                            <p className="text-sm text-gray-600"><strong>👷 Chef de chantier :</strong> {project.manager}</p>
                            <p className="text-sm text-gray-600"><strong>🚩 Status :</strong> <span className={project.status === "En retard" ? "text-red-500 font-bold" : "text-green-600 font-bold"}>{project.status}</span></p>
                            <p className="text-sm text-gray-600"><strong>📅 Début :</strong> {project.startDate}</p>
                            <p className="text-sm text-gray-600 mb-4"><strong>⏳ Fin :</strong> {project.endDate}</p>
                            <Link to="/ConstructionDetails" className="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 mt-auto transition">
                                Voir plus
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
