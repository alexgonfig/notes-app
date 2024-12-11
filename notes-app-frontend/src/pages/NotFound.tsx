import React from "react";
import { Button, Container, Typography, Card } from "@mui/material";
import { Error as ErrorIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          textAlign: "center",
          mt:3
        }}
      >
        <ErrorIcon sx={{ fontSize: 100, color: "error.main", mb: 4 }} />
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Página No Encontrada
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          ¡Ups! La página que estás buscando no existe. Es posible que haya sido
          movida o eliminada.
        </Typography>
        <Link to="/">
          <Button variant="contained" color="primary">
            Volver al Inicio
          </Button>
        </Link>
      </Card>
    </Container>
  );
};

export default NotFound;
