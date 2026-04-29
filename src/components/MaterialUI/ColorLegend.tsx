import {  Box, List, ListItem, ListItemIcon, ListItemText, Popover, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import "../StockCard/StockCard.css";
import "./MaterialUI.css"

export default function ColorLegend() {
  
    const items = [
    { label: "Negro", desc: "Riesgo extremo", className: "risk-extreme" },
    { label: "Rojo oscuro", desc: "Riesgo muy alto", className: "risk-too-high" },
    { label: "Rojo", desc: "Riesgo alto", className: "risk-high" },
    { label: "Amarillo", desc: "Riesgo normal", className: "risk-medium" },
    { label: "Azul oscuro", desc: "Riesgo bajo", className: "risk-low" },
    { label: "Azul", desc: "Riesgo muy bajo", className: "risk-too-low" },
  ];

  return (

     <Tooltip
      placement="bottom-start"
      arrow
      title={
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            El indicador de riesgo se indica con colores:
          </Typography>

          <List dense disablePadding>
            {items.map((item) => (
              <ListItem key={item.label} disableGutters>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: "3px",
                    }}
                    className={item.className}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`${item.label}: ${item.desc}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      }
    >
      <div className="legendColor">
        <span className="legend-text-full">Indicador de riesgo</span>
        <span className="legend-text-short">Riesgo</span>
      </div>
    </Tooltip>
  )

     
  ;
}