import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";

const StyledCell = styled(Paper)(({ theme, color }) => ({
  width: "50px",
  height: "50px",
  border: "1px solid #ccc",
  margin: "2px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.2rem",
  backgroundColor: color,
}));

const GridComponent: React.FC = () => {
  const [currentColor, setCurrentColor] = useState<string>("#ffffff");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentColor(generateRandomColor());
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const generateRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Grid container spacing={1}>
      {[...Array(4)].map((_, rowIndex) => (
        <Grid container item key={rowIndex} justifyContent="center">
          {[...Array(4)].map((__, columnIndex) => (
            <Grid item key={columnIndex}>
              <StyledCell elevation={3} color={currentColor}></StyledCell>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default GridComponent;
