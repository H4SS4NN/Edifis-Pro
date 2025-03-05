import { useState } from "react";
import { useParams } from "react-router-dom";

interface Worker {
  name: string;
  skills: string[];
  phone: string;
  email: string;
  role: "Ouvrier" | "Chef de projet";
  image?: string;
  createdAt: string;
  updatedAt: string;
}

const workers: Worker[] = [
  { name: "Jane Cooper", skills: ["Assidu", "meilleur"], phone: "06 73 43 11 27", email: "jane@microsoft.com", role: "Ouvrier", image: "https://f.hellowork.com/obs-static-images/seo/ObsJob/ouvrier-voiries-et-reseaux-divers.jpg", createdAt: "2023-01-01", updatedAt: "2023-01-10" },
  { name: "Floyd Miles", skills: ["Sympa"], phone: "07 77 45 53 23", email: "floyd@yahoo.com", role: "Ouvrier", image: "https://www.capcampus.com/img/u/1/job-etudiant-batiment.jpg", createdAt: "2023-02-01", updatedAt: "2023-02-05" },
  { name: "Ronald Richards", skills: ["Pointilleux"], phone: "06 00 89 28 38", email: "ronald@adobe.com", role: "Chef de projet", image: "https://plus.unsplash.com/premium_photo-1664301171216-9e0e0cd8d103?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", createdAt: "2023-03-01", updatedAt: "2023-03-10" },
  { name: "Marvin McKinney", skills: ["Sympa"], phone: "07 67 87 23 41", email: "marvin@tesla.com", role: "Ouvrier", image: "https://www.meilleur-audio.fr/wp-content/uploads/2019/08/Ouvrier-et-audition.png", createdAt: "2023-04-01", updatedAt: "2023-04-10" },
];

export default function WorkerDetails() {
  const { name } = useParams<{ name: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [worker, setWorker] = useState<Worker | undefined>(workers.find(worker => worker.name === name));

  if (!worker) {
    return <p>Employé non trouvé</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setWorker({
      ...worker,
      [e.target.name]: e.target.value,
    });
  };

  const handleSkillChange = (skill: string) => {
    const updatedSkills = worker.skills.includes(skill)
      ? worker.skills.filter(s => s !== skill)
      : [...worker.skills, skill];
    setWorker({ ...worker, skills: updatedSkills });
  };

  return (
    <main className="p-8 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Détails de l'employé</h1>
        
        <div className="flex items-center mb-4">
          <img src={worker.image} alt={worker.name} className="w-24 h-24 object-cover rounded-full mr-4" />
          <div>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={worker.name}
                onChange={handleChange}
                className="text-xl font-semibold text-gray-900 mb-2 border-b border-gray-300"
              />
            ) : (
              <h2 className="text-xl font-semibold text-gray-900">{worker.name}</h2>
            )}
            <p className="text-sm text-gray-600">{worker.skills.join(", ")}</p>
          </div>
        </div>

        <p><strong>Email : </strong> {isEditing ? <input type="text" name="email" value={worker.email} onChange={handleChange} className="border border-gray-300 rounded p-1" /> : worker.email}</p>

        <p><strong>Compétences : </strong>
          {isEditing ? (
            <div className="flex gap-4">
              <label className="flex items-center">
                <input type="checkbox" checked={worker.skills.includes("Assidu")} onChange={() => handleSkillChange("Assidu")} className="mr-2" />
                Assidu
              </label>
              <label className="flex items-center">
                <input type="checkbox" checked={worker.skills.includes("meilleur")} onChange={() => handleSkillChange("meilleur")} className="mr-2" />
                meilleur
              </label>
              <label className="flex items-center">
                <input type="checkbox" checked={worker.skills.includes("Sympa")} onChange={() => handleSkillChange("Sympa")} className="mr-2" />
                Sympa
              </label>
            </div>
          ) : (
            worker.skills.join(", ")
          )}
        </p>

        <p><strong>Rôle : </strong> {isEditing ? (
            <select name="role" value={worker.role} onChange={handleChange} className="border border-gray-300 rounded p-1">
                <option value="Ouvrier">Ouvrier</option>
                <option value="Chef de projet">Chef de projet</option>
            </select>
            ) : (
            worker.role
        )}</p>

        <p><strong>Date de création : </strong> {worker.createdAt}</p>
        <p><strong>Date de mise à jour : </strong> {worker.updatedAt}</p>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isEditing ? "Enregistrer" : "Modifier"}
          </button>
        </div>
      </div>
    </main>
  );
}
