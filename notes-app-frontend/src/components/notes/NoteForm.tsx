import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { fetchFromBackend } from "../../services/httpFetch";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";

type Note = {
  title?: string;
  content?: string;
};

const NoteForm: React.FC<Note> = ({ title, content }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Note>({
    title: title || "",
    content: content || "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {};

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
              label="Titulo de la nota"
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
              rows={6}
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
        </Box>
      </CardContent>
    </Card>
  );
};
export default NoteForm;
