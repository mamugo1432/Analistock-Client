import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import { getAllAuthors } from "../../services/authors-service";
import type { Author } from "../../types/authorsType";
import CardAuthor from "../../components/CardAuthor/CardAuthor";
import "./Authors.css"
import { useNavigate } from "react-router-dom";


export default function Authors(){
  const [authors, setAuthors] = useState<Author[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(8);
  let totalElements=0;
  const [isLastPage, setIsLastPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAuthors() {
      setLoading(true);
      try {
        const response = await getAllAuthors(pageNum, pageSize);
        setAuthors(response.content);
        totalElements = response.totalElements

        //Math.ceil redondea hacia arriba haya el decimal que haya
        const lastPage = Math.ceil(totalElements / pageSize);
        setIsLastPage(pageNum >= lastPage);
      } catch (error) {
         if(error instanceof Error){
                navigate('/error', { 
                state: { 
                    message: error.message
                } 
            });
            }
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, [pageNum, pageSize]);

  if (loading) return <div className="loading-screen">Cargando...</div>;

  return (
    <div className="container-fluid py-5 px-5">
<h2 id="subtitle" className="mb-4 text-center homenaje-regular">Autores</h2>

<div className="d-flex justify-content-center mb-4">
  <button className="btn btn-primary" onClick={() => navigate("/authors/create")}>Añadir Autor</button>
</div>

      <div className="row g-4">
        {authors.map(author => (
         <CardAuthor  key={author.idAuthor} author={author}/>
        ))}
      </div>

      <div className="mt-5">
        <Pagination 
          currentPage={pageNum}
          isLastPage={isLastPage}
          onPageChange={setPageNum}
        />
      </div>
    </div>
  );
}