import { Tooltip } from "@mui/material";
import infoIcon from "../../assets/info-svgrepo-com.svg"
export default function InfoIndicator({message}:{message:string}){
return(     
<Tooltip
      placement="bottom-start"
      arrow
      title={
            <p>{message}</p>
        
      }
    >
        <div className="info-icon">
            <img src={infoIcon} alt="Icono de información"/>
            </div>
    </Tooltip>)
}