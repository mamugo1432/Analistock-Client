import {jwtDecode} from "jwt-decode";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType, JWTPayload, LoginCredentials, User } from "../types/authTypes";
import { loginUser, verifyToken } from "../services/auth-service";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = localStorage.getItem("token");
            
            if (!storedToken) {
                setIsInitialized(true);
                return;
            }

            try {
                await verifyToken();

                setToken(storedToken);
                const payload = jwtDecode<JWTPayload>(storedToken);
                setUser({
                    username: payload.sub,
                    email: payload.email,
                    role: payload.role,
                    sex:payload.sex
                });


            } catch (error) {
                console.warn("Sesión caducada");
                localStorage.removeItem("token");
                setUser(null);
                setToken(null);

            } finally {
                setIsInitialized(true);
            }


        }

        initializeAuth();
    }, []);

 const login = async (credentials: LoginCredentials) => {
        try {
            const token = await loginUser(credentials);
            localStorage.setItem("token", token.token);
           const payload = jwtDecode<JWTPayload>(token.token);
                setUser({
                    username: payload.sub,
                    email: payload.email,
                    role: payload.role,
                    sex:payload.sex
                });

            setToken(token.token);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        navigate("/");
    };
    return (
        <AuthContext.Provider value={{
            user, token,
            isAuthenticated: !!user, 
            isInitialized,
            login, logout
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