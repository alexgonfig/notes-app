import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Typography, Container } from "@mui/material";
import { Note, fetchNoteById } from "../services/notes";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import NoteDetails from "../components/notes/NoteDetails";
import { deleteNote } from "../services/notes";
import NoteNotFound from "../components/login/NoteNotFound";

const ViewNote: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | undefined>();
  const { noteId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const access_token = useSelector(
    (state: RootState) => state.auth.access_token
  );

  const controller = new AbortController();
  const { signal } = controller;

  const fetchNote = async () => {
    try {
      setIsLoading(true);
      const note = await fetchNoteById(access_token, noteId, signal, dispatch);
      setNote(note);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const isDeleted = await deleteNote(noteId, access_token, signal);
      if (isDeleted) {
        navigate("/");
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
    fetchNote();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {isLoading && !note && (
        <Typography variant="body1">Cargando datos de la nota...</Typography>
      )}

      {!note && <NoteNotFound />}
      {note && <NoteDetails {...note} onDeleteHandler={handleDelete} />}
    </Container>
  );
};

export default ViewNote;
