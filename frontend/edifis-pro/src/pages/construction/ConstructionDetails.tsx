import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import constructionSiteService from "../../../services/constructionSiteService";

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
    return <p className="text-center text-gray-500">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!construction)
    return <p className="text-center text-gray-500">Chantier non trouvé</p>;

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
                onChange={(e) =>
                  setConstruction({ ...construction, name: e.target.value })
                }
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
              onChange={(e) =>
                setConstruction({ ...construction, adresse: e.target.value })
              }
              className="border border-gray-300 rounded p-1 w-full"
            />
          ) : (
            construction.adresse
          )}
        </p>

        <span
          className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${
            construction.state === "En cours"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {construction.state}
        </span>

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
