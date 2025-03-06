import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import LineChart from "../../components/lineChart/LineChart";
import userService from "../../../services/userService";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(
    user.profile_picture
      ? `http://localhost:5000/uploads/profile_pictures/${user.profile_picture}`
      : "https://i.pinimg.com/736x/ab/32/b1/ab32b1c5a8fabc0b9ae72250ce3c90c2.jpg"
  );

  // Gestion des changements des inputs texte
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Gestion du changement d'image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0])); // Affiche l'aperçu immédiatement
    }
  };

  // Envoi de l’image via userService
  const handleUploadImage = async () => {
    if (!selectedFile) return;

    try {
      const response = await userService.uploadProfilePicture(selectedFile);

      if (response.profile_picture) {
        const newProfilePic = `http://localhost:5000/uploads/profile_pictures/${response.profile_picture}`;

        // Met à jour l'affichage et le contexte utilisateur
        setPreviewImage(newProfilePic);
        updateUser({ ...user, profile_picture: response.profile_picture });
      }
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image :", error);
    }
  };

  return (
    <main className="min-h-[calc(100dvh-65px)] md:p-8 p-4">
      <div className="relative flex gap-8">
        {/* Image de profil */}
        <div className="flex h-48 w-48 overflow-hidden rounded-xl">
          <img
            className="object-cover h-full w-full"
            src={previewImage}
            alt="Photo de profil"
          />
        </div>

        <div>
          <h1 className="text-3xl font-medium">
            {isEditing ? (
              <input
                type="text"
                name="firstname"
                value={updatedUser.firstname}
                onChange={handleChange}
                className="border border-gray-300 rounded p-1"
              />
            ) : (
              user.firstname
            )}{" "}
            {isEditing ? (
              <input
                type="text"
                name="lastname"
                value={updatedUser.lastname}
                onChange={handleChange}
                className="border border-gray-300 rounded p-1"
              />
            ) : (
              user.lastname
            )}
          </h1>
          <p className="text-slate-500 text-base mb-5">
            {user.role === "Admin"
              ? "Admin"
              : user.role === "Worker"
              ? "Ouvrier"
              : user.role === "Manager"
              ? "Chef de projet"
              : user.role}
          </p>

          <h2>Informations</h2>
          <form className="flex gap-2">
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              readOnly={!isEditing}
              className="border border-gray-300 rounded p-1"
            />
            <input
              type="tel"
              name="numberphone"
              value={updatedUser.numberphone}
              onChange={handleChange}
              readOnly={!isEditing}
              className="border border-gray-300 rounded p-1"
            />
          </form>
        </div>

        <button
          className="absolute right-0 bg-slate-200 text-slate-950 hover:bg-slate-300 h-9 py-2 px-4 rounded"
          onClick={() =>
            isEditing ? updateUser(updatedUser) : setIsEditing(true)
          }
        >
          {isEditing ? "Sauvegarder" : "Modifier"}
        </button>
      </div>

      {/* Upload de l’image */}
      <div className="mt-4">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          onClick={handleUploadImage}
        >
          Mettre à jour la photo de profil
        </button>
      </div>

      <div className="h-96 w-full py-8">
        <LineChart />
      </div>
    </main>
  );
}
