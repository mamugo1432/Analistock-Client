import {  Popover, Typography } from "@mui/material";
import { useState } from "react";
import "../StockCard/StockCard.css";
import "./MaterialUI.css"

export default function ColorLegend() {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
      setAnchorEl(null);
  };

  const open = anchorEl ? true : false;
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <div
      className="legendColor"
        aria-describedby={id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="legend-text-full">Indicador de riesgo</span>
        <span className="legend-text-short">Riesgo</span>
      </div>
      <Popover
      sx={{ pointerEvents: "none" }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onMouseLeave={handleMouseLeave}
      >
        <Typography sx={{ p: 2 }}>
            <p>El indicador de riesgo se indica con colores de la siguiente forma:</p>
            <ul>
                <li><i className="text-white risk-extreme">Negro</i>: Riesgo extremo</li>
                <li><i className="text-white risk-too-high">Rojo oscuro</i>: Riesgo muy alto</li>
                <li><i className="text-white risk-high">Rojo</i>: Riesgo alto</li>
                <li><i className=" text-white risk-medium">Amarillo</i>: Riesgo normal</li>
                <li><i className="text-white risk-low">Azul Oscuro</i>: Riesgo bajo</li>
                <li><i className="text-white risk-too-low">Azul</i>: Riesgo muy bajo</li>
            </ul>

        </Typography>
      </Popover>
    </div>
  );
}