import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { fetchFromBackend } from "../../services/httpFetch";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

type NoteFormProps = {
  title?: string;
  content?: string;
  noteId?: string | number;
};

const NoteForm: React.FC<NoteFormProps> = ({ title, content, noteId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const access_token = useSelector(
    (state: RootState) => state.auth.access_token
  );
  const [formData, setFormData] = useState({
    title: title || "",
    content: content || "",
  });

  const apiPath = noteId ? `/api/notes/${noteId}` : "/api/notes/";
  const method = noteId ? "PUT" : "POST";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const note = { ...formData };
      const response = await fetchFromBackend(
        apiPath,
        method,
        note,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
        undefined,
        dispatch
      );

      if (response.noteId) {
        await Swal.fire({
          title: "Bien!",
          text: "Se guardaron con exito los datos de la nota!",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        navigate("/note/" + response.noteId);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError("" + error);
      Swal.fire({
        title: "Error!",
        text:
          error instanceof Error
            ? error.message
            : String(error) ||
              "Se produjo un error inesperado. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Título de la nota"
              name="title"
              autoComplete="title"
              autoFocus
              value={formData.title}
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="content"
              label="Contenido de la nota"
              type="text"
              id="content"
              multiline
              rows={12}
              value={formData.content}
              onChange={handleChange}
              variant="standard"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              {isLoading ? "Cargando..." : "Guardar"}
            </Button>
          </Box>

          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </CardContent>
    </Card>
  );
};
export default NoteForm;
