import React, { useState, useEffect } from "react";
import { Typography, Container, Grid2 } from "@mui/material";
import NoteCard from "../components/notes/NoteCard";
import { Note, fetchUserNotes } from "../services/notes";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const access_token = useSelector(
    (state: RootState) => state.auth.access_token
  );

  const controller = new AbortController();
  const { signal } = controller;

  const fetchNotes = async () => {
    try {
      const notes = await fetchUserNotes(access_token, signal);
      setNotes(notes);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  useEffect(() => {
    fetchNotes();
    return () => {
      controller.abort();
    };
  }, [access_token]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Mis Notas
      </Typography>
      <Grid2 container spacing={2}>
        {notes.map((note) => (
          <NoteCard key={note.id} {...note} />
        ))}
      </Grid2>
    </Container>
  );
};

export default Dashboard;
