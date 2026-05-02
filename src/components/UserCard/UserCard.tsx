import {  useNavigate } from "react-router-dom"
import type { User } from "../../types/usersTypes"
import "../AdviceCard/AdviceCard.css"
export default function UserCard({user}:{user:User}){

    const navigate = useNavigate();

    return(
             <div className="col-12 col-md-6 col-lg-4">
  <div className="custom-card p-3 d-flex flex-column justify-content-between h-100">

    <div>
      <h5 className="fw-bold mb-1">{user.username}</h5>
      <p className="text-muted small">{user.email}</p>
      <div className="d-flex gap-3 text-muted small">
        <span>{user.age} años</span>
        <span>•</span>
        <span>{user.sex === 'M' ? 'Masculino' : 'Femenino'}</span>
      </div>
    </div>

    <div className="d-flex justify-content-end gap-2 mt-3">
       <button className="btn btn-sm btn-success" onClick={() =>navigate("/users/details/"+user.idUser)}>Ver Más</button> 
    </div>

  </div>
</div>
    )
}