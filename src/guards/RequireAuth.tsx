import { useEffect, type ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export function RequireAuth({children} : {children : ReactNode}){

    const {isAuthenticated, isInitialized, initializeAuth} = useAuth();
   const navigate = useNavigate();
    
        useEffect(() => {
            initializeAuth();
        }, []);

    if (!isInitialized) return <div className="loading-screen">Cargando...</div>;

    if(!isAuthenticated){
         navigate("/login?error=Sesion caducada");
    }

    return children;
}