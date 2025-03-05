import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import userService from '../../services/userService';

interface AuthContextType {
    isAuthenticated: boolean;
    user: any; // Typage à ajuster selon la structure de ton utilisateur
    login: (token: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null); // Utilisateur connecté
    const [tokenData, setTokenData] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode<any>(token);
                const expirationTime = decoded.exp * 1000; // Expiration en ms
                if (expirationTime > Date.now()) {
                    setIsAuthenticated(true);
                    setTokenData(decoded);
                }
            } catch (error) {
                setIsAuthenticated(false);
                setTokenData(null);
            }
        }
    }, []);

    const userData = async () => {
        if (!tokenData) return console.error("Token introuvable");

        try {
            const response = await userService.getById(tokenData.userId);
            if (response) {
                setUser(response);
            } else {
                console.error("La réponse de l'API ne correspond pas au format attendu :", response);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des informations utilisateur :", error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            userData();
        }
    }, [isAuthenticated]);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode<any>(token);
        setIsAuthenticated(true);
        setTokenData(decoded);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setTokenData(null);
        setUser(null); // Réinitialisation des données utilisateur lors de la déconnexion
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): AuthContextType => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };