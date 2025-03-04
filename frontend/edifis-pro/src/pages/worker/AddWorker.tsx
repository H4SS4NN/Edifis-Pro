import { useState } from "react";

export default function AddWorker() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        role: "Worker",
        competences: [],
    });

    const fakeCompetences = [
        { id: 1, name: "Meilleur" },
        { id: 2, name: "Sympa" },
        { id: 3, name: "Intelligent" },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCompetenceChange = (e) => {
        const value = parseInt(e.target.value);
        setFormData((prev) => ({
            ...prev,
            competences: prev.competences.includes(value)
                ? prev.competences.filter((id) => id !== value)
                : [...prev.competences, value],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Données soumises :", formData);
    };

    return (
        <main className="min-h-[calc(100dvh-65px)] md:p-8 p-4">
            <h1 className="text-4xl font-bold text-slate-950">Ajouter un employé</h1>
            <p className="text-sm text-slate-500 mb-4">Remplissez les informations ci-dessous</p>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
                <div>
                    <label className="block text-sm font-medium">Prénom</label>
                    <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Nom</label>
                    <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Rôle</label>
                    <select name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md">
                        <option value="Admin">Admin</option>
                        <option value="Worker">Worker</option>
                        <option value="Manager">Manager</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Compétences</label>
                    <div className="mt-1 flex flex-wrap gap-2">
                        {fakeCompetences.map((comp) => (
                            <label key={comp.id} className="flex items-center space-x-2">
                                <input type="checkbox" value={comp.id} checked={formData.competences.includes(comp.id)} onChange={handleCompetenceChange} />
                                <span>{comp.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Ajouter</button>
            </form>
        </main>
    );
}