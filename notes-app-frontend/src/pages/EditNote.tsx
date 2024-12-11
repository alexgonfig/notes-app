import React, { useState, useEffect } from "react";
import { Typography, Container } from "@mui/material";
import { Note, fetchNoteById } from "../services/notes";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import NoteForm from "../components/notes/NoteForm";
import NoteNotFound from "../components/login/NoteNotFound";

const EditNote: React.FC = () => {
  const [note, setNote] = useState<Note | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { noteId } = useParams();
  const access_token = useSelector(
    (state: RootState) => state.auth.access_token
  );

  const controller = new AbortController();
  const { signal } = controller;

  const fetchNote = async () => {
    try {
      setIsLoading(true);
      const note = await fetchNoteById(access_token, noteId, signal);
      setNote(note);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert(error);
    }
  };

  useEffect(() => {
    fetchNote();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Editar Nota
      </Typography>
      {isLoading && !note && (
        <Typography variant="body1">Cargando datos de la nota...</Typography>
      )}

      {!note && <NoteNotFound />}
      {note && <NoteForm noteId={note.id} {...note} />}
    </Container>
  );
};

export default EditNote;
