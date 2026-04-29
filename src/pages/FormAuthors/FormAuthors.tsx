import { useForm } from "react-hook-form";
import type { LoginCredentials } from "../../types/authTypes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Author, upsertAuthorsBody } from "../../types/authorsType";
import { getAuthorByIdService } from "../../services/authors-service";
import "./FormAuthors.css";
import { useAuthor } from "../../contexts/AuthorsContext";

export default function FormAuthors({mode}:{mode:string}){

    const {register,handleSubmit, setError, reset, formState : {errors, isSubmitting }} = useForm<upsertAuthorsBody>({mode:"onTouched"});
    const {postAuthor, delAuthor, putAuthor} = useAuthor();
    const [loading, setLoading] = useState<boolean>(mode!="create");
    const {id} = useParams();
    const navigate = useNavigate();

    if (!id && mode!= "create"){
        alert("Se ha producido un error");
        navigate("/authors");
    } 
         
    const [author, setAuthor] = useState<Author>({
        idAuthor:"", fullName:"", job:""
         });

        if(mode != "create"){
            useEffect(()=>{
                getAuthorId(id!);
         });
        } else{
            useEffect(() =>{
                setLoading(false);
            })
        }
             
    async function getAuthorId(id:string){
        try{
           const  author = await getAuthorByIdService(id);
            if(author) setAuthor(author);
            setLoading(false);
        }catch(error){
             if(error instanceof Error){
                navigate('/error', { 
                state: { 
                    message: error.message
                } 
            });
            };
        }

    }

    async function submit(info:upsertAuthorsBody){
        try{

            if(mode=="create"){
                postAuthor(info);
                reset();
                navigate("/authors");
            }

            else if(mode == "edit"){
                putAuthor(id!, info);
                reset();
                navigate("/authors");
            }

            else{
                delAuthor(id!);
                navigate("/authors");
            }
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

      if (loading) return <div className="loading-screen">Cargando...</div>;
    return(
        <>
        
    <div className="form-container d-flex justify-content-center align-items-center">
  <div className="form-card p-4">
    <h2 id="subtitle" className="mb-4 text-center homenaje-regular">
      {mode == "create" ? "Crear Autor" : mode=="edit" ? "Editar autor" : "Eliminar autor"}
    </h2>
    
    <form action="" onSubmit={handleSubmit(submit)}>
      <div className="mb-3">
        <label className="d-block mb-2"><strong><i>Nombre Completo</i></strong></label>
        <input 
          type="text" 
          className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
          disabled={mode=="delete"} 
          defaultValue={mode=="edit" || mode=="delete" ? author.fullName : ""}
          {...register("fullName", {
            required:{ value : mode!="delete", message: "El nombre completo es obligatorio"}
          })} 
        />
               {errors.fullName && (
          <div className="invalid-feedback">{errors.fullName.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="d-block mb-2"><strong><i>Puesto Trabajo Actual</i></strong></label>
        <textarea 
          className={`form-control ${errors.job ? "is-invalid" : ""}`}
          rows={4}
          disabled={mode=="delete"} 
          defaultValue={mode=="edit" || mode=="delete" ? author.job : ""}
            {...register("job", {
            required:{ value : mode!="delete", message: "El puesto de trabajo es obligatorio"}
          })} 
        ></textarea>

               {errors.job && (
          <div className="invalid-feedback">{errors.job.message}</div>
        )}
      </div>

      <div className="text-end">
        <button disabled={isSubmitting} className={mode == "create" ? "btn btn-primary" : mode=="edit" ? "btn btn-warning" : "btn btn-danger"}>
          {isSubmitting ? "Cargando..." : (mode == "create" ? "Crear" : mode=="edit" ? "Editar" : "Eliminar")}
        </button>
      </div>
    </form>
  </div>
</div>
</>
    )};