import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid2,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import Swal from "sweetalert2";
import { Add as AddIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import NoteCard from "../components/notes/NoteCard";
import { Note, fetchUserNotes, deleteNote } from "../services/notes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const access_token = useSelector(
    (state: RootState) => state.auth.access_token
  );

  const controller = new AbortController();
  const { signal } = controller;

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const notes = await fetchUserNotes(access_token, signal, dispatch);
      setNotes(notes);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
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

  const handleDelete = async (noteId: string | number) => {
    try {
      const isDeleted = await deleteNote(noteId, access_token, signal, dispatch);
      if (isDeleted) {
        await fetchNotes();
      }
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    fetchNotes();
    return () => {
      controller.abort();
    };
  }, []);

  const FallbackNotesDashboardMessage: React.FC = () => {
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
              Aún no tienes notas creadas
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Usa el botón de crear para comenzar a añadir tus notas
            </Typography>
            <Link to="/createNote">
              <Button color="primary" variant="contained" aria-label="add">
                <AddIcon /> Crear notas
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Grid2>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Mis Notas
      </Typography>
      {isLoading && (
        <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
          Cargando Notas del usuario...
        </Typography>
      )}
      {!isLoading && notes.length === 0 && <FallbackNotesDashboardMessage />}
      <Grid2 container spacing={2}>
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            {...note}
            onDeleteHandler={() => {
              handleDelete(note.id);
            }}
          />
        ))}
      </Grid2>
    </Container>
  );
};

export default Dashboard;
