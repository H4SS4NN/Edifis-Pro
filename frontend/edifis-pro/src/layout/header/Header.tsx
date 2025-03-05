import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import authService from "../../../services/authService";

import logo from "../../assets/images/logo.svg";

interface User {
  firstname: string;
  lastname: string;
}

export default function Header() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      if (user?.userId) {
        try {
          const response = await authService.getUserById(user.userId);

          if (response.firstname && response.lastname) {
            setUserInfo(response);
          } else {
            console.error(
              "La réponse de l'API ne correspond pas au format attendu :",
              response
            );
          }
        } catch (err) {
          console.error(
            "Erreur lors de la récupération des informations utilisateur :",
            err
          );
        }
      }
    };

    fetchUserName();
  }, [user?.userId]);

  return (
    <header className="sticky top-0 flex justify-between items-center w-full h-16 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:pr-8 pr-4 z-20">
      <nav className="flex items-center space-x-4 h-full w-[250px] md:border-r md:border-slate-200 md:px-8 px-4">
        <Link
          to="/"
          className="flex items-center align-center space-x-1.5 text-lg text-slate-950 font-semibold uppercase transition-colors"
        >
          <img src={logo} alt="Edifis Pro" className="h-4 w-4" />
          Edifis <span className="font-light">Pro</span>
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        <Link
          to="/profile"
          className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-[20px] transition-all duration-300 ease-in-out hover:rounded-xl cursor-pointer"
        >
          <img
            className="aspect-square h-full w-full"
            src="https://github.com/shadcn.png"
            alt="photo de profil"
          />
        </Link>
        <span className="text-sm">
          {userInfo
            ? `${userInfo.firstname} ${userInfo.lastname}`
            : "Chargement..."}
        </span>
      </div>
    </header>
  );
}
