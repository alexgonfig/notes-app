import React from "react";
import { Typography, Container } from "@mui/material";
import NoteForm from "../components/notes/NoteForm";

const CreateNote: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Crear Nota
      </Typography>
      <NoteForm />
    </Container>
  );
};

export default CreateNote;
