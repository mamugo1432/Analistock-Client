import { useEffect, useState } from "react";
import type { User } from "../../types/usersTypes";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/users-service";
import UserCard from "../../components/UserCard/UserCard";
import { Pagination } from "@mui/material";

export default function Users(){
    
   const [users, setUsers] = useState<User[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(6);
  const [lastPage, setLastPage] = useState(0);
  let totalElements=0;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


    useEffect(() => {
      async function fetchUsers() {
        setLoading(true);
        try {
          const response = await getAllUsers(pageNum, pageSize);
          setUsers(response.content);
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
  
      fetchUsers();
    }, [pageNum, pageSize]);
  
    if (loading) return <div className="loading-screen">Cargando...</div>;
    
    return (  
       <div className="container-fluid py-5 px-5">
        <div className="position-relative mb-4 d-flex align-items-center">
        <h2 id="subtitle"
        className="homenaje-regular m-0 position-absolute start-50 translate-middle-x">
          Usuarios
        </h2>
    
      </div>
              <div className="row g-4">
                {users.map(user => (
                 <UserCard key={user.idUser} user={user}/>
                ))}
              </div>
        
              <div className="mt-5 d-flex align-items-center justify-content-center">
                          <div className="pagination p-2 ">
                            <Pagination  count={lastPage} page={pageNum} onChange={(event, value) => setPageNum(value)} variant="outlined" shape="rounded" color="primary"/>
                          </div>
                        </div>
              </div>
            )
}