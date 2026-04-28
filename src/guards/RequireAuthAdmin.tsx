import { useEffect, type ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export function RequireAuthAdmin({children} : {children : ReactNode}){

    const {isAuthenticated, isInitialized, user, initializeAuth} = useAuth();
    const navigate = useNavigate();

useEffect(() => {
    console.log("hola");
    initializeAuth();
}, []);

    if (!isInitialized) return <div className="loading-screen">Cargando...</div>;

    if(!isAuthenticated || user?.role!="ADMIN"){
        navigate("/login?error=Sesion caducada");
        return;
    }

    return children;
}