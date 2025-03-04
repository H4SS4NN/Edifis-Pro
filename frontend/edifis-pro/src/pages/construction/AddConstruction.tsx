import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddConstruction() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        site: "",
        address: "",
        manager: "",
        status: "En cours",
        startDate: "",
        endDate: "",
        image: null
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "file" ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Chantier ajouté :", formData);
        navigate("/");
    };

    return (
        <main className="min-h-screen p-8 bg-gray-100 flex justify-center">
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Ajouter un chantier</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Nom du chantier" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded" required />
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-3 border rounded" required></textarea>
                    <input type="text" name="site" placeholder="Nom du site" value={formData.site} onChange={handleChange} className="w-full p-3 border rounded" required />
                    <input type="text" name="address" placeholder="Adresse" value={formData.address} onChange={handleChange} className="w-full p-3 border rounded" required />
                    
                    <select name="manager" value={formData.manager} onChange={handleChange} className="w-full p-3 border rounded" required>
                        <option value="">Sélectionner un chef de chantier</option>
                        <option value="Marc Dupont">Marc Dupont</option>
                        <option value="Sophie Lemoine">Sophie Lemoine</option>
                        <option value="Julien Morel">Julien Morel</option>
                    </select>
                    
                    <select name="status" value={formData.status} onChange={handleChange} className="w-full p-3 border rounded">
                        <option value="En cours">En cours</option>
                        <option value="Terminé">Terminé</option>
                        <option value="En retard">En retard</option>
                    </select>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-3 border rounded" required />
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-3 border rounded" required />
                    </div>
                    
                    <input type="file" name="image" onChange={handleChange} className="w-full p-3 border rounded" />
                    
                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition">Ajouter</button>
                </form>
            </div>
        </main>
    );
}