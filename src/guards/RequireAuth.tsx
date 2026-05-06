import { useEffect, type ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export function RequireAuth({children} : {children : ReactNode}){

    const {isAuthenticated, isInitialized, initializeAuth} = useAuth();

    
        useEffect(() => {
            initializeAuth();
        }, []);

    if (!isInitialized) return <div className="loading-screen">Cargando...</div>;

    if(!isAuthenticated){
        Swal.fire({
            title: 'Sesión caducada',
            icon: 'error',
            theme: 'material-ui'
        });
       return <Navigate to="/login" replace />;
    }

    return children;
}