import { useEffect, useState } from "react";
import "./Advices.css";
import type { Advice } from "../../types/advicesType";
import { useNavigate } from "react-router-dom";
import { getAllAdvices } from "../../services/advices-service";
import AdviceCard from "../../components/AdviceCard/AdviceCard";
import { useAuth } from "../../contexts/AuthContext";
import { Pagination } from "@mui/material";
export default function Advices(){
 const [advices, setAdvices] = useState<Advice[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(6);
  let totalElements=0;
  const [lastPage, setLastPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {isAuthenticated, user} = useAuth();

  useEffect(() => {
    async function fetchAdvices() {
      setLoading(true);
      try {
        const response = await getAllAdvices(pageNum, pageSize);
        setAdvices(response.content);
        totalElements = response.totalElements;

        //Math.ceil redondea hacia arriba haya el decimal que haya
        const lastPage = Math.ceil(totalElements / pageSize);
        setLastPage(lastPage);
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

    fetchAdvices();
  }, [pageNum, pageSize]);

  if (loading) return <div className="loading-screen">Cargando...</div>;

  return (
    <div className="container-fluid py-5 px-5">
<h2 id="subtitle" className="mb-4 text-center homenaje-regular">Consejos</h2>

{ isAuthenticated && user?.role == "ADMIN" &&
<div className="d-flex justify-content-center mb-4">
  <button className="btn btn-primary m-2" onClick={() => navigate("/advices/create")}>Añadir consejo</button>
</div>
}
      <div className="row g-4 d-flex justify-content-center">
        {advices.map(advice => (
         <AdviceCard  key={advice.idAdvice} advice={advice}/>
        ))}
      </div>

<div className="mt-2 d-flex align-items-center justify-content-center">
            <div className="pagination p-2 ">
              <Pagination  count={lastPage} page={pageNum} onChange={(_, value) => setPageNum(value)} variant="outlined" shape="rounded" color="primary"/>
            </div>
          </div>
    </div>
  );
}