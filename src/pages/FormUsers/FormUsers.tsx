import type { User } from "../../types/usersTypes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsersByIdService } from "../../services/users-service";
import { useUsers } from "../../contexts/UsersContext";
import "../Register/Register.css";
import "./FormUser.css";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { checkEmail, checkUsername } from "../../services/auth-service";
import Swal from "sweetalert2";

export default function FormUsers({ mode }: { mode: string }) {
  const [userPage, setUserPage] = useState<User>({
    age: 0,
    email: "",
    fullName: "",
    sex: "",
    username: "",
    idUser: 0,
  });
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { delUser, isSubmittingDelete, putUser } = useUsers();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<User>({ mode: "onTouched" });
  useEffect(() => {
    async function getUserById() {
      setLoading(true);
      try {
        const userService = await getUsersByIdService(id!);
        if (userService) setUserPage(userService);
        reset(userPage);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          navigate("/error", {
            state: {
              message: error.message,
            },
          });
        }
      }
    }

    if (user?.role != "ADMIN" && user?.idUser.toString() != id!) {
      navigate("/error", {
        state: {
          message: "No tienes permisos para acceder a esta información",
        },
      });
    }

    getUserById();
  }, [id]);

  useEffect(() => {
    reset(userPage);
  }, [userPage]);

  async function submit(info: User) {
    try {
      putUser(id!, info);
      Swal.fire({
        title: "Usuario editado con éxito",
        icon: "success",
        theme: "material-ui",
      });
      navigate(-1);
    } catch (error) {
      if (error instanceof Error) {
        navigate("/error", {
          state: {
            message: error.message,
          },
        });
      }
    }
  }
  if (loading) return <div className="loading-screen">Cargando...</div>;
  return (
    <>
      <div className="register-container d-flex justify-content-center align-items-center">
        <div className="register-card p-4">
 <div className="d-flex align-items-center mb-4 position-relative">
  <button
    className="btn btn-sm backForm"
    onClick={() => navigate(-1)}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
      <path fill="currentColor" d="m9.55 12l7.35 7.35q.375.375.363.875t-.388.875t-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675t-.15-.75t.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388t.375.875t-.375.875z"/>
    </svg>
  </button>
          <h2 className="text-center homenaje-regular position-absolute start-50 translate-middle-x w-75">
            {mode === "see"
              ? "Información del usuario"
              : mode === "delete"
                ? "Dar de baja usuario"
                : "Editar información usuario"}
          </h2>
          </div>

          <form>
            <div className="mb-3">
              <label className="form-label">
                <strong>
                  <i>Username</i>
                </strong>
              </label>
              <input
                type="text"
                autoComplete="username"
                disabled={mode === "delete"}
                readOnly={mode === "see"}
                defaultValue={userPage.username}
                className={
                  errors.username ? "form-control is-invalid" : "form-control"
                }
                {...register("username", {
                  required: "El username es obligatorio",
                  minLength: {
                    value: 3,
                    message: "Mínimo 3 caracteres",
                  },
                  validate: async (value) => {
                    try {
                      if (user?.username == value) return true;
                      if (user?.role == "ADMIN" && userPage.username == value)
                        return true;
                      const response = await checkUsername(value);
                      return (
                        !response.existsUsername ||
                        "El username ya existe en la base de datos"
                      );
                    } catch (e) {
                      if (e instanceof Error) alert(e.message);
                      return true;
                    }
                  },
                })}
              />
              {errors.username && (
                <div className="invalid-feedback">
                  {errors.username.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>
                  <i>Nombre completo</i>
                </strong>
              </label>
              <input
                type="text"
                autoComplete="name"
                disabled={mode === "delete"}
                readOnly={mode === "see"}
                defaultValue={userPage.fullName}
                className={
                  errors.fullName ? "form-control is-invalid" : "form-control"
                }
                {...register("fullName", {
                  required: "El fullName es obligatorio",
                  minLength: {
                    value: 3,
                    message: "Mínimo 3 caracteres",
                  },
                })}
              />
              {errors.fullName && (
                <div className="invalid-feedback">
                  {errors.fullName.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>
                  <i>Email</i>
                </strong>
              </label>
              <input
                type="email"
                autoComplete="email"
                disabled={mode === "delete"}
                readOnly={mode === "see"}
                defaultValue={userPage.email}
                className={
                  errors.email ? "form-control is-invalid" : "form-control"
                }
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email no válido",
                  },
                  validate: async (value) => {
                    try {
                      if (user?.email == value) return true;
                      if (user?.role == "ADMIN" && userPage.email == value)
                        return true;
                      const response = await checkEmail(value);
                      return (
                        !response.existsEmail ||
                        "El correo ya existe en la base de datos"
                      );
                    } catch (e) {
                      if (e instanceof Error) alert(e.message);
                      return true;
                    }
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            <div className="mb-3 row align-items-center">
              <label className="col-auto col-form-label">
                <strong>
                  <i>Edad</i>
                </strong>
              </label>
              <div className="col-3">
                <input
                  type="number"
                  disabled={mode === "delete"}
                  readOnly={mode === "see"}
                  defaultValue={userPage.age}
                  className={
                    errors.age ? "form-control is-invalid" : "form-control"
                  }
                  {...register("age", {
                    required: "La edad es obligatoria",
                    valueAsNumber: true,
                    min: {
                      value: 18,
                      message: "La edad del usuario debe ser mayor de 18 años",
                    },
                    max: {
                      value: 100,
                      message:
                        "La edad del usuario debe ser como máximo 100 años",
                    },
                  })}
                />
                {errors.age && (
                  <div className="invalid-feedback">{errors.age.message}</div>
                )}
              </div>

              <label className="col-auto col-form-label ms-3">
                <strong>
                  <i>Sexo</i>
                </strong>
              </label>
              <div className="col-auto d-flex gap-3 align-items-center">
                <div className="form-check mb-0">
                  <input
                    type="radio"
                    id="sexM"
                    defaultValue="M"
                    disabled={mode === "delete" || mode === "see"}
                    className={
                      errors.sex
                        ? "form-check-input is-invalid"
                        : "form-check-input"
                    }
                    {...register("sex", {
                      required: "El sexo es obligatorio",
                    })}
                  />
                  <label className="form-check-label" htmlFor="sexM">
                    M
                  </label>
                </div>
                <div className="form-check mb-0">
                  <input
                    type="radio"
                    id="sexF"
                    defaultValue="F"
                    disabled={mode === "delete" || mode === "see"}
                    className={
                      errors.sex
                        ? "form-check-input is-invalid"
                        : "form-check-input"
                    }
                    {...register("sex", {
                      required: "El sexo es obligatorio",
                    })}
                  />
                  <label className="form-check-label" htmlFor="sexF">
                    F
                  </label>
                </div>
              </div>
            </div>
            {errors.sex && (
              <div className="invalid-feedback">{errors.sex.message}</div>
            )}
            {mode === "delete" && (
              <div className="text-end">
                <button
                  className="btn btn-danger"
                  disabled={isSubmittingDelete}
                  type="button"
                  onClick={() => delUser(id!)}
                >
                  {isSubmittingDelete ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            )}

            <div className="text-end">
              {mode === "see" && (
                <>
                  <button
                    className="btn btn-warning"
                    type="button"
                    onClick={() => navigate("/users/edit/" + id!)}
                  >
                    {user?.idUser == userPage.idUser
                      ? "Editar mi información"
                      : "Editar información del usuario"}
                  </button>

                  <button
                    className="btn btn-danger m-2"
                    type="button"
                    onClick={() => navigate("/users/delete/" + id!)}
                  >
                    {user?.idUser == userPage.idUser
                      ? "Darme de baja"
                      : "Dar de baja al usuario"}
                  </button>
                </>
              )}

              {mode === "edit" && (
                <button
                  className="btn btn-warning"
                  disabled={isSubmitting}
                  type="button"
                  onClick={handleSubmit(submit)}
                >
                  {isSubmitting ? "Guardando..." : "Editar"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
