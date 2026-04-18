import type { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({children} : {children : ReactNode}){

    const {isAuthenticated, isInitialized} = useAuth();
    const location = useLocation();
    
    if (!isInitialized) return <div className="loading-screen">Cargando...</div>;

    if(!isAuthenticated){
         return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}