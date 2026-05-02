import { useForm } from "react-hook-form";
import type { Advice, upsertAdviceBody } from "../../types/advicesType";
import { useAdvice } from "../../contexts/AdvicesContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  checkPrhase,
  getAdviceByIdService,
  getAuthorsSelectApi,
} from "../../services/advices-service";
import type { Author } from "../../types/authorsType";
import Swal from "sweetalert2";
export default function FormAdvices({ mode }: { mode: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<upsertAdviceBody>({ mode: "onTouched" });
  const [loadingAuthor, setLoadingAuthor] = useState<boolean>(mode != "create");
  const [loadingListAuthors, setLoadingListAuthors] = useState<boolean>(true);
  const [advice, setAdvice] = useState<Advice>({
    idAdvice: "",
    date: "",
    jobAuthor: "",
    nameAuthor: "",
    phrase: "",
    idAuthor: 0,
  });
  const { postAdvice, delAdvice, putAdvice } = useAdvice();
  const [listAuthors, setListAuthors] = useState<Author[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id && mode != "create") {
    alert("Se ha producido un error");
    navigate("/advices");
  }

  useEffect(() => {
    getAuthorsSelect();
    if (mode != "create") {
      getAdviceId(id!);
    } else {
      setLoadingAuthor(false);
    }
  });

  async function getAuthorsSelect() {
    try {
      const authors = await getAuthorsSelectApi();
      if (authors) setListAuthors(authors);
      setLoadingListAuthors(false);
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

  async function getAdviceId(id: string) {
    try {
      const advice = await getAdviceByIdService(id);
      if (advice) setAdvice(advice);
      setLoadingAuthor(false);
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

  async function submit(info: upsertAdviceBody) {
    try {
      if (mode == "create") {
        postAdvice(info);
        reset();
        Swal.fire({
          title: "Consejo creado con éxito",
          icon: "success",
          theme: "material-ui",
        });
        navigate("/advices");
      } else if (mode == "edit") {
        putAdvice(id!, info);
        reset();
        Swal.fire({
          title: "Consejo editado con éxito",
          icon: "success",
          theme: "material-ui",
        });
        navigate("/advices");
      } else {
        delAdvice(id!);
        Swal.fire({
          title: "Consejo eliminado con éxito",
          icon: "success",
          theme: "material-ui",
        });
        navigate("/advices");
      }
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

  if (loadingAuthor || loadingListAuthors)
    return <div className="loading-screen">Cargando...</div>;
  return (
    <>
      <div className="form-container d-flex justify-content-center align-items-center">
        <div className="form-card p-4">
          <h2 id="subtitle" className="mb-4 text-center homenaje-regular">
            {mode == "create"
              ? "Crear Consejo"
              : mode == "edit"
                ? "Editar consejo"
                : "Eliminar consejo"}
          </h2>

          <form action="" onSubmit={handleSubmit(submit)}>
            <div className="mb-3">
              <label className="d-block mb-2">
                <strong>
                  <i>Frase</i>
                </strong>
              </label>
              <textarea
                rows={3}
                className={`form-control ${errors.phrase ? "is-invalid" : ""}`}
                disabled={mode == "delete"}
                defaultValue={
                  mode == "edit" || mode == "delete" ? advice.phrase : ""
                }
                {...register("phrase", {
                  required: {
                    value: mode != "delete",
                    message: "La frase es obligatoria",
                  },
                  validate: async (value) => {
                    let response = null;
                    try {
                      response = await checkPrhase(value);
                      return (
                        !response.existsPrhase ||
                        "La frase ya existe en la base de datos"
                      );
                    } catch (e) {
                      if (e instanceof Error) alert(e.message);
                      return true;
                    }
                  },
                })}
              />
              {errors.phrase && (
                <div className="invalid-feedback">{errors.phrase.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="d-block mb-2">
                <strong>
                  <i>Fecha</i>
                </strong>
              </label>
              <input
                type="date"
                className={`form-control ${errors.date ? "is-invalid" : ""}`}
                disabled={mode == "delete"}
                defaultValue={
                  mode == "edit" || mode == "delete" ? advice.date : ""
                }
                {...register("date", {
                  required: {
                    value: mode != "delete",
                    message: "El fecha es obligatoria",
                  },
                  validate: (value) => {
                    const today = new Date();
                    const selectedDate = new Date(value);

                    // quitar horas para comparar solo fechas
                    today.setHours(0, 0, 0, 0);
                    selectedDate.setHours(0, 0, 0, 0);

                    return (
                      selectedDate <= today || "La fecha no puede ser futura"
                    );
                  },
                })}
              ></input>

              {errors.date && (
                <div className="invalid-feedback">{errors.date.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="d-block mb-2">
                <strong>
                  <i>Author</i>
                </strong>
              </label>

              <select
                className={`form-control ${errors.idAuthor ? "is-invalid" : ""}`}
                disabled={mode == "delete"}
                defaultValue={
                  mode == "edit" || mode == "delete" ? advice.idAuthor : ""
                }
                {...register("idAuthor", {
                  required: "El author es requerido",
                  valueAsNumber: true,
                })}
              >
                {listAuthors.map((author) => (
                  <option key={author.idAuthor} value={author.idAuthor}>
                    {author.fullName}
                  </option>
                ))}
              </select>

              {errors.idAuthor && (
                <div className="invalid-feedback">
                  {errors.idAuthor.message}
                </div>
              )}
            </div>

            <div className="text-end">
              <button
                disabled={isSubmitting}
                className={
                  mode == "create"
                    ? "btn btn-primary"
                    : mode == "edit"
                      ? "btn btn-warning"
                      : "btn btn-danger"
                }
              >
                {isSubmitting
                  ? "Cargando..."
                  : mode == "create"
                    ? "Crear"
                    : mode == "edit"
                      ? "Editar"
                      : "Eliminar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
