import React, { useState, useEffect } from "react";
import { Typography, Container, Grid2 } from "@mui/material";
import { Note, fetchNoteById } from "../services/notes";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import NoteForm from "../components/notes/NoteForm";

const EditNote: React.FC = () => {
  const [note, setNote] = useState<Note | undefined>();
  const { noteId } = useParams();
  const access_token = useSelector(
    (state: RootState) => state.auth.access_token
  );

  const controller = new AbortController();
  const { signal } = controller;

  const fetchNote = async () => {
    try {
      const note = await fetchNoteById(access_token, noteId, signal);
      setNote(note);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  useEffect(() => {
    fetchNote();

    return () => {
      controller.abort();
    };
  }, [noteId, access_token]);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Editar Nota
      </Typography>
      {!note && (
        <Typography variant="body1">Cargando datos de la nota...</Typography>
      )}
      {note && <NoteForm noteId={note.id} {...note} />}
    </Container>
  );
};

export default EditNote;
