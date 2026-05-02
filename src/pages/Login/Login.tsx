import { Form, useForm } from "react-hook-form";
import "./Login.css";
import type { LoginCredentials } from "../../types/authTypes";
import { loginUser } from "../../services/auth-service";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AlertSuccess from "../../components/AlertSuccess/AlertSuccess";
export default function Login(){

  const {register,handleSubmit, reset, formState : {errors, isSubmitting }} = useForm<LoginCredentials>();
  const {login} = useAuth();
  const navigate = useNavigate();
  const url = new URLSearchParams(window.location.search);
  const notAuthenticatedError = url.toString().includes("error");
  const closedSession = url.toString().includes("logout");
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const onSubmit = async (info : LoginCredentials) => {
    try{
    await login(info);
    setInvalidCredentials(false);
    reset();
    navigate("/stocks");
    }catch(error){
      setInvalidCredentials(true);
      reset();
    }

  }

    return (
        <>

        <div className="login-container d-flex flex-column justify-content-center align-items-center">
                                {closedSession && <AlertSuccess message={"Sesión cerrada con éxito"}/>}
  <div className="login-card p-4">
    <h2 id="login-title" className="text-center mb-4 homenaje-regular">LOGIN</h2>

    { notAuthenticatedError && <div className=" d-flex alert alert-danger justify-content-center align-items-center">Debes loguearte para continuar</div>}
    { invalidCredentials && <div className=" d-flex alert alert-danger justify-content-center align-items-center">Credenciales Inválidas</div>}
    <form action="" onSubmit={handleSubmit(onSubmit)}>

       {errors.username && errors.username.message=="Credenciales Incorrectas" && (
          <div className="alert alert-danger text-center">{errors.username.message}</div>
        )}

    <div className="mb-3">
      <label><strong><i>Username or Email</i></strong></label>
      <input type="text"
      className={`form-control ${errors.username ? "is-invalid" : ""}`}
          {...register("username", {
            required: "El username es obligatorio",
            minLength: { value: 3, message: "Mínimo 3 caracteres" }
          })} 
      />
       {errors.username && errors.username.message!="Credenciales Incorrectas" && (
          <div className="invalid-feedback">{errors.username.message}</div>
        )}
    </div>

    <div className="mb-3">
      <label><strong><i>Password</i></strong></label>
      <input  type="password" 
      className={`form-control ${errors.password ? "is-invalid" : ""}`}
          {...register("password", {
            required: "El password es obligatorio",
            minLength: { value: 5, message: "Mínimo 5 caracteres" }
          })}
      />

       {errors.password && errors.password.message!="Credenciales Incorrectas" && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      
      <small>No tengo una cuenta, <a href="/register">Registrarse</a></small>
      
    </div>
    

    <div className="text-end">
      <button type="submit" className="btn btn-success" disabled={isSubmitting}>
        {isSubmitting ? "Cargando..." : "Login"}
      </button>
    </div>
    </form>
  </div>
</div>
        </>
    );
}