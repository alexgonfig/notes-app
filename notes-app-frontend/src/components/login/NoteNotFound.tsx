import {
  Typography,
  Grid2,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const NoteNotFound: React.FC = () => {
  return (
    <Grid2>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CardContent sx={{ textAlign: "center", my: "auto" }}>
          <Typography variant="h5" sx={{ mt: 3 }}>
            Nota no encontrada
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            No se encontraron datos asociados a la nota seleccionada, vuelva al
            inicio con el siguiente botón
          </Typography>
          <Link to="/">
            <Button color="primary" variant="contained" aria-label="add">
              <HomeIcon sx={{mr:2}} /> Ir al inicio
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Grid2>
  );
};

export default NoteNotFound;
