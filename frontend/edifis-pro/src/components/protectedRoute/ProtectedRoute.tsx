import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

import Loading from "../loading/Loading";

interface ProtectedRouteProps {
    requiredRole?: string; // Rôle optionnel à vérifier
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Loading />
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Vérification du rôle si nécessaire
    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/" replace />; // Redirige vers l'accueil si l'utilisateur n'a pas le bon rôle
    }

  return <Outlet />;
};

export default ProtectedRoute;