import React from "react";
import { Note } from "../../services/notes";
import {
  Typography,
  Grid2,
  Card,
  CardContent,
  CardActions,
  Chip,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface NoteDetailsProps extends Note{
  onDeleteHandler: ()=>void;
}

const NoteDetails: React.FC<NoteDetailsProps> = ({
  id,
  title,
  content,
  created_at,
  updated_at,
  onDeleteHandler,
}) => {  

  return (
    <Card>
      <CardContent>
        <Grid2 container sx={{ mb: 3 }}>
          <Grid2 size={{ xs: 6, lg: 8 }}>
            <Typography variant="h4" component="h2">
              {title}
            </Typography>
          </Grid2>
          <Grid2 size="auto" sx={{ ml: "auto" }}>
            <CardActions>
              <Link to={`/editNote/${id}`}>
                <EditIcon color="primary" />
              </Link>
              <DeleteIcon onClick={onDeleteHandler} color="error" />
            </CardActions>
          </Grid2>
        </Grid2>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, whiteSpace: "pre-wrap" }}
        >
          {content}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label={"Creado el: " + new Date(created_at).toLocaleString()} />
          <Chip
            label={"Actualizado el: " + new Date(updated_at).toLocaleString()}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NoteDetails;
