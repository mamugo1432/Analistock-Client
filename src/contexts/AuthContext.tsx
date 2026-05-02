import {jwtDecode} from "jwt-decode";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType, JWTPayload, LoginCredentials, UserLogged } from "../types/authTypes";
import { loginUser, verifyToken } from "../services/auth-service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserLogged | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

            const initializeAuth = async () => {
            const storedToken = localStorage.getItem("token");
            
            if (!storedToken) {
                setIsAuthenticated(false);
                setIsInitialized(true);
                return;
            }

            try {
                await verifyToken();
                setIsAuthenticated(true);
                setToken(storedToken);
                const payload = jwtDecode<JWTPayload>(storedToken);
                setUser({
                    username: payload.sub,
                    email: payload.email,
                    role: payload.role,
                    sex:payload.sex,
                    idUser: payload.idUser
                });


            } catch (error) {
                console.warn("Sesión caducada");
                localStorage.removeItem("token");
                setIsAuthenticated(false);
                setUser(null);
                setToken(null);

            } finally {
                setIsInitialized(true);
            }


        }

    useEffect(() => {
        initializeAuth();
    }, []);

 const login = async (credentials: LoginCredentials) => {
        try {
            const token = await loginUser(credentials);
            setIsAuthenticated(true);
            localStorage.setItem("token", token.token);
           const payload = jwtDecode<JWTPayload>(token.token);
                setUser({
                    username: payload.sub,
                    email: payload.email,
                    role: payload.role,
                    sex:payload.sex,
                    idUser:payload.idUser
                });

            setToken(token.token);
        } catch (error) {
            throw error;
        }
    };
    const logout = () => {
                Swal.fire({
                    title: 'Sesión cerrada con éxito',
                    icon: 'success',
                    theme: 'material-ui'
                });
        navigate("/login");
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("token");

    };
    return (
        <AuthContext.Provider value={{
            user, token,
            isAuthenticated, 
            isInitialized,
            login, logout,
            initializeAuth,
            setUser
        }}>
            {children} </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};