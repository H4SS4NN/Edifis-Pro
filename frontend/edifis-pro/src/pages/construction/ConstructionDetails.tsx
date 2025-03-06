import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import constructionSiteService from "../../../services/constructionSiteService";
import userService from "../../../services/userService";
import Loading from "../../components/loading/Loading";
import Badge from "../../components/badge/Badge";

interface ConstructionSite {
  construction_site_id: number;
  name: string;
  description: string;
  adresse: string;
  start_date: string;
  end_date: string;
  open_time: string;
  end_time: string;
  chef_de_projet_id?: number;
  chefDeProjet?: {
    user_id: number;
    firstname: string;
    lastname: string;
    email: string;
  };
  createdAt?: string;  // Utilisé pour la date de création
  updatedAt?: string;
  state?: string;
}

function sanitizeInput(field: string, value: string): string {
  if (field === "description") {
    return value.replace(/[<>]/g, "");
  }
  if (field === "name") {
    return value.replace(/[^a-zA-Z0-9\s\-_]/g, "");
  }
  if (field === "adresse") {
    return value.replace(/[^a-zA-Z0-9\s,\-_]/g, "");
  }
  return value;
}

export default function ConstructionDetails() {
  const { id } = useParams<{ id: string }>();
  const [construction, setConstruction] = useState<ConstructionSite | null>(null);
  const [initialConstruction, setInitialConstruction] = useState<ConstructionSite | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [managers, setManagers] = useState<
    Array<{
      user_id: number;
      firstname: string;
      lastname: string;
      email: string;
    }>
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await constructionSiteService.getById(Number(id));
        setConstruction(data);
        setInitialConstruction(data);

        const users = await userService.getAllUsers();
        const onlyManagers = users.filter((u: any) => u.role === "Manager");
        setManagers(onlyManagers);
      } catch (err) {
        setError("Erreur lors du chargement du chantier ou des managers.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleCancel = () => {
    setConstruction(initialConstruction);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!construction) return;
    setLoading(true);
    try {
      await constructionSiteService.update(construction.construction_site_id, {
        name: construction.name,
        description: construction.description,
        adresse: construction.adresse,
        start_date: construction.start_date,
        end_date: construction.end_date,
        open_time: construction.open_time,
        end_time: construction.end_time,
        chef_de_projet_id: construction.chefDeProjet?.user_id || null,
      });
      const updated = await constructionSiteService.getById(construction.construction_site_id);
      setConstruction(updated);
      setInitialConstruction(updated);
      setIsEditing(false);
    } catch (err) {
      setError("Erreur lors de la mise à jour du chantier.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    if (!construction) return;
    setConstruction((prev) =>
      prev ? { ...prev, [field]: sanitizeInput(field, value) } : null
    );
  };

  const handleChefChange = (managerId: string) => {
    if (!construction) return;
    const mgr = managers.find((m) => m.user_id === Number(managerId));
    setConstruction({
      ...construction,
      chefDeProjet: mgr
        ? {
            user_id: mgr.user_id,
            firstname: mgr.firstname,
            lastname: mgr.lastname,
            email: mgr.email,
          }
        : undefined,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100dvh-65px)] w-full p-8">
        <Loading />
      </div>
    );
  }
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!construction) return <p className="text-center text-slate-500">Chantier non trouvé</p>;

  return (
    <main className="min-h-[calc(100dvh-65px)] p-8 bg-gray-100">
      <div className="flex flex-col gap-4 bg-white p-8 rounded-lg border border-slate-200">
        <div className="flex justify-between items-center">
          <Link
            to="/construction"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-1 outline-offset-4 disabled:pointer-events-none disabled:opacity-50 bg-slate-200 text-slate-950 hover:bg-slate-300 h-9 px-4 py-2 block text-center"
          >
            Retour à la liste
          </Link>

          <div className="flex space-x-2">
            {isEditing && (
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-1 outline-offset-4 disabled:pointer-events-none disabled:opacity-50 bg-red-200 text-red-950 hover:bg-red-300 h-9 px-4 py-2 block text-center cursor-pointer"
                onClick={handleCancel}
              >
                Annuler
              </button>
            )}
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-1 outline-offset-4 disabled:pointer-events-none disabled:opacity-50 bg-slate-200 text-slate-950 hover:bg-slate-300 h-9 px-4 py-2 block text-center cursor-pointer"
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? "Enregistrer" : "Modifier"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={construction.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Nom du chantier"
                  className="flex w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-zinc-950 transition-colors"
                />
              ) : (
                construction.name
              )}
            </h1>
            {construction.state && <Badge status={construction.state} />}
          </div>

          <p className="text-gray-700">
            {isEditing ? (
              <textarea
                name="description"
                value={construction.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Description"
                className="flex h-36 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm text-zinc-950 transition-colors"
              />
            ) : (
              construction.description
            )}
          </p>

          <p className="text-sm text-slate-500">
            {isEditing ? (
              <input
                type="text"
                name="adresse"
                value={construction.adresse}
                onChange={(e) => handleChange("adresse", e.target.value)}
                placeholder="Adresse"
                className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm text-zinc-950 transition-colors"
              />
            ) : (
              construction.adresse
            )}
          </p>

          <p>
            <strong>Début :</strong>{" "}
            {isEditing ? (
              <input
                type="date"
                name="start_date"
                value={construction.start_date || ""}
                onChange={(e) =>
                  setConstruction({ ...construction, start_date: e.target.value })
                }
                className="flex rounded-md border border-slate-200 bg-transparent px-3 py-1 text-zinc-950"
              />
            ) : (
              construction.start_date
            )}
          </p>

          <p>
            <strong>Fin</strong>{" "}
            {isEditing ? (
              <input
                type="date"
                name="end_date"
                value={construction.end_date || ""}
                onChange={(e) =>
                  setConstruction({ ...construction, end_date: e.target.value })
                }
                className="flex rounded-md border border-slate-200 bg-transparent px-3 py-1 text-zinc-950"
              />
            ) : (
              construction.end_date
            )}
          </p>

          <p className="flex items-center gap-2">
            <strong>Horaires</strong>{" "}
            {isEditing ? (
              <>
                <input
                  type="time"
                  name="open_time"
                  value={construction.open_time || ""}
                  onChange={(e) =>
                    setConstruction({ ...construction, open_time: e.target.value })
                  }
                  className="flex rounded-md border border-slate-200 bg-transparent px-3 py-1 text-zinc-950"
                />{" "}
                -{" "}
                <input
                  type="time"
                  name="end_time"
                  value={construction.end_time || ""}
                  onChange={(e) =>
                    setConstruction({ ...construction, end_time: e.target.value })
                  }
                  className="flex rounded-md border border-slate-200 bg-transparent px-3 py-1 text-zinc-950"
                />
              </>
            ) : (
              `${construction.open_time} - ${construction.end_time}`
            )}
          </p>

          <p>
            <strong>Chef de projet :</strong>{" "}
            {isEditing ? (
              <select
                value={construction.chefDeProjet?.user_id || ""}
                onChange={(e) => handleChefChange(e.target.value)}
                className="rounded-md border border-slate-200 bg-transparent px-3 py-1 text-zinc-950"
              >
                <option value="">Aucun</option>
                {managers.map((mgr) => (
                  <option key={mgr.user_id} value={mgr.user_id}>
                    {mgr.firstname} {mgr.lastname}
                  </option>
                ))}
              </select>
            ) : construction.chefDeProjet ? (
              `${construction.chefDeProjet.firstname} ${construction.chefDeProjet.lastname}`
            ) : (
              "Non spécifié"
            )}
          </p>

          <p>
            <strong>Email :</strong>{" "}
            {construction.chefDeProjet?.email || "Non spécifié"}
          </p>

          <p>
            <strong>Date de création :</strong>{" "}
            {construction.createdAt || "Non spécifiée"}
          </p>
        </div>
      </div>
    </main>
  );
}
