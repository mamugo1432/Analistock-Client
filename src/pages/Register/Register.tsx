import { useForm } from "react-hook-form";
import type { RegisterData, RegisterInputs } from "../../types/authTypes";
import "./Register.css";
import { checkEmail, obtainValidUsername, registerUser } from "../../services/auth-service";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import RegisterModal from "../../components/MaterialUI/RegisterModal";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const {register,handleSubmit, reset, watch, trigger, formState : {errors, isSubmitting }} = useForm<RegisterInputs>({mode:"onTouched"});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const password = watch("password");
  const {login} = useAuth();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

useEffect(()=>{
  setOpenModal(true);
}, [])

  const onSubmit =  async (data : RegisterInputs) => {
    try{
    const username = await obtainValidUsername(data.fullName);
    if(username) setUsername(username)
    const registerData : RegisterData = {...data, username};
    await registerUser(registerData); 
    login({username, password : data.password});
// comentado para la prueba    setOpenModal(true);
    }catch(error){
       if(error instanceof Error){
                navigate('/error', { 
                state: { 
                    message: error.message
                } 
            });
            }
    }
  }

  return (
    <>
      <div className="register-container d-flex justify-content-center align-items-center">
        <div className="register-card p-4">
          <h2 id="login-title" className="text-center mb-4 homenaje-regular">
            REGISTER
          </h2>

          <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label><strong><i>Full Name</i></strong></label>
            <input  type="text" autoComplete="name" 
              className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
          {...register("fullName", {
            required: "El nombre completo es obligatorio",
            minLength: { value: 3, message: "Mínimo 3 caracteres" }
          })} />
          {errors.fullName && (
          <p className="text-danger">{errors.fullName.message}</p> 
            )}
          </div>

          <div className="mb-3">
            <label><strong><i>Email</i></strong></label>
            <input  type="email" autoComplete="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email", {
            required: "El email es obligatorio",
            pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email no válido"},
            validate : async (value) => {
              let response = null;
              try{
                response = await checkEmail(value);
                return !response.existsEmail || "El correo ya existe en la base de datos"
              }catch(e){
                if(e instanceof Error) alert(e.message);
                return true;
              }

            }
          })}
            />
          {errors.email && (
          <p className="text-danger">{errors.email.message}</p> 
            )}
          </div>


          <div className="mb-3 row align-items-center">
            <label className="col-auto col-form-label"><strong><i>Age</i></strong></label>
            <div className="col-3">
              <input  type="number"
              className={`form-control ${errors.age ? "is-invalid" : ""}`}
               {...register("age", {
            required: "La edad es obligatoria",
            valueAsNumber:true,
            min : {value:18, message:"La edad del usuario debe ser mayor de 18 años"},
            max : {value: 100, message: "La edad del usuario debe ser como máximo 100 años"}
          })}              
              />
          
            </div>
            {errors.age && (
          <p className="text-danger">{errors.age.message}</p> 
            )}

            <label className="col-auto col-form-label ms-3"><strong><i>Sex</i></strong></label>
            <div className="col-auto d-flex gap-3 align-items-center">
              <div className="form-check mb-0">
                <input  type="radio" id="sexM" value="M"
                 className={`form-check-input ${errors.sex ? "is-invalid" : ""}`}
                {...register("sex", {
                required: "Selecciona un sexo"
      })}
                />
                <label className="form-check-label" htmlFor="sexH">
                  M
                </label>
              </div>
              <div className="form-check mb-0">
                <input type="radio" id="sexF" value="F"
                className={`form-check-input ${errors.sex ? "is-invalid" : ""}`}
                {...register("sex", {
                required: "Selecciona un sexo"
      })}
                />
                <label className="form-check-label" htmlFor="sexF">
                  F
                </label>
              </div>
            </div>
          </div>
          {errors.sex && (
          <p className="text-danger">{errors.sex.message}</p> 
            )}

          <div className="mb-3">
            <label><strong><i>Password</i></strong></label>
            <input  type="password" 
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {value : 5, message:"La contraseña debe tener como mínimo 5 caracteres"},
                onChange : () =>{
                   if (watch("repeatPassword")) trigger("repeatPassword");
                }
      })}/>

      {errors.password && (
          <p className="text-danger">{errors.password.message}</p> 
            )}
          </div>

          <div className="mb-3">
            <label><strong><i>Repeat Password</i></strong></label>
            <input type="password" 
             className={`form-control ${errors.repeatPassword ? "is-invalid" : ""}`}
              {...register("repeatPassword", {
                required: "La contraseña repetida es obligatoria",
                minLength: {value : 5, message:"La contraseña repetida debe tener como mínimo 5 caracteres"},
                validate : value =>
                  value === password || "Las contraseñas deben ser iguales"
      })}
            />
                  {errors.repeatPassword && (
          <p className="text-danger">{errors.repeatPassword.message}</p> 
            )}
          </div>

          <div className="text-end">
            <button className="btn btn-success" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Cargando..." : "Register"}
              </button>
          </div>
          </form>
        </div>
      </div>
<RegisterModal open={openModal} setOpen={setOpenModal} username={username}/>
    </>
  );
}
