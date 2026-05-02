import { useEffect, type ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export function RequireAuthAdmin({children} : {children : ReactNode}){

    const {isAuthenticated, isInitialized, user, initializeAuth} = useAuth();

useEffect(() => {
    initializeAuth();
}, []);

    if (!isInitialized) return <div className="loading-screen">Cargando...</div>;

    if(!isAuthenticated || user?.role!="ADMIN"){
                Swal.fire({
                    title: 'Sesión cerrada con éxito',
                    icon: 'success',
                    theme: 'material-ui'
                });
        return <Navigate to="/login" replace />;
    }

    return children;
}