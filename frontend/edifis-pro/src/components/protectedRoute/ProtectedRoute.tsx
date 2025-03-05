import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!isAuthenticated) {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 50);
            
            return () => clearTimeout(timer);
        } else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
